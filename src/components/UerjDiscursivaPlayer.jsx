import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import './UerjDiscursivaPlayer.css';

const DISCIPLINA_LABELS = {
  biologia: 'Biologia',
  fisica: 'Física',
  geografia: 'Geografia',
  historia: 'História',
  lingua_portuguesa: 'Língua Portuguesa',
  lingua_estrangeira: 'Língua Estrangeira',
  matematica: 'Matemática',
  quimica: 'Química',
};

const DURACAO_PADRAO_SEGUNDOS = 5 * 60 * 60; // 5h, como a prova real

const fmtTempo = (s) => {
  const sign = s < 0 ? '-' : '';
  const abs = Math.abs(s);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const sec = abs % 60;
  return `${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

export default function UerjDiscursivaPlayer({ provaId, disciplinas, onSubmetido, onCancelar }) {
  const [loading, setLoading]   = useState(true);
  const [prova, setProva]       = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [redacao, setRedacao]   = useState(null);

  const [respostas, setRespostas]               = useState({});       // { questao_id: texto }
  const [respostaRedacao, setRespostaRedacao]   = useState('');
  const [abaAtual, setAbaAtual]                 = useState('q-0');    // 'q-0' | 'q-1' | ... | 'redacao'
  const [restante, setRestante]                 = useState(DURACAO_PADRAO_SEGUNDOS);
  const [pausado, setPausado]                   = useState(false);
  const [confirmandoFinalizar, setConfirmando]  = useState(false);
  const [submetendo, setSubmetendo]             = useState(false);

  const storageKey = useMemo(
    () => `uerj_discursiva_progresso_${provaId}_${(disciplinas || []).slice().sort().join('-')}`,
    [provaId, disciplinas]
  );

  // ── Carrega prova + questoes (filtradas pelas 2 disciplinas) + redacao
  useEffect(() => {
    (async () => {
      setLoading(true);
      const [{ data: p }, { data: qs }, { data: r }] = await Promise.all([
        supabase.from('uerj_discursivas').select('*').eq('id', provaId).single(),
        supabase
          .from('uerj_discursiva_questoes')
          .select('*')
          .eq('prova_id', provaId)
          .in('disciplina', disciplinas)
          .order('disciplina')
          .order('ordem'),
        supabase.from('uerj_discursiva_redacao').select('*').eq('prova_id', provaId).maybeSingle(),
      ]);
      setProva(p);
      setQuestoes(qs || []);
      setRedacao(r);

      // restaura progresso salvo
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.respostas)        setRespostas(parsed.respostas);
          if (parsed.respostaRedacao)  setRespostaRedacao(parsed.respostaRedacao);
          if (typeof parsed.restante === 'number') setRestante(parsed.restante);
        } catch { /* ignore */ }
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provaId]);

  // ── Timer (decrementa 1 vez por segundo, exceto pausado)
  useEffect(() => {
    if (loading || pausado || submetendo) return;
    const id = setInterval(() => setRestante((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [loading, pausado, submetendo]);

  // ── Auto-save com debounce (1.2s)
  const saveTimeoutRef = useRef(null);
  useEffect(() => {
    if (loading) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ respostas, respostaRedacao, restante })
      );
    }, 1200);
    return () => clearTimeout(saveTimeoutRef.current);
  }, [respostas, respostaRedacao, restante, loading, storageKey]);

  // ── Pergunta antes de fechar a aba
  useEffect(() => {
    const handler = (e) => {
      if (submetendo) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [submetendo]);

  // ── Agrupa questoes por disciplina pra mostrar nas tabs
  const questoesAgrupadas = useMemo(() => {
    const grupos = {};
    disciplinas?.forEach((d) => { grupos[d] = []; });
    questoes.forEach((q) => {
      if (!grupos[q.disciplina]) grupos[q.disciplina] = [];
      grupos[q.disciplina].push(q);
    });
    return grupos;
  }, [questoes, disciplinas]);

  const setResposta = (questaoId, texto) => {
    setRespostas((r) => ({ ...r, [questaoId]: texto }));
  };

  const finalizar = async () => {
    setSubmetendo(true);
    setConfirmando(false);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // monta respostas no formato final (sem nota ainda — IA preenche depois)
      const respostasPayload = {};
      questoes.forEach((q) => {
        respostasPayload[q.id] = {
          resposta: respostas[q.id] || '',
          nota: null,
          feedback: null,
          pontos_positivos: null,
          pontos_faltantes: null,
        };
      });

      const { data: resultado, error } = await supabase
        .from('uerj_discursiva_resultados')
        .insert({
          user_id: user.id,
          prova_id: provaId,
          disciplinas: disciplinas,
          finalizado_em: new Date().toISOString(),
          respostas: respostasPayload,
          redacao_resposta: redacao ? respostaRedacao : null,
        })
        .select()
        .single();

      if (error) throw error;

      // limpa progresso salvo
      localStorage.removeItem(storageKey);

      onSubmetido?.(resultado.id);
    } catch (e) {
      console.error('finalizar:', e);
      alert('Erro ao finalizar prova: ' + (e.message || JSON.stringify(e)));
      setSubmetendo(false);
    }
  };

  // ── Auto-submit quando timer zera (depois de finalizar pra não usar antes de declarar)
  useEffect(() => {
    if (restante <= 0 && !submetendo && !loading) {
      finalizar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restante]);

  // ── Aba atual: 'q-{idx}' | 'redacao'
  const abaQuestao = abaAtual.startsWith('q-')
    ? questoes[parseInt(abaAtual.slice(2), 10)]
    : null;

  if (loading) {
    return <div className="udp-loading">Carregando prova…</div>;
  }

  if (!prova || questoes.length === 0) {
    return (
      <div className="udp-loading">
        <p>Prova não encontrada ou sem questões.</p>
        <button onClick={onCancelar} className="udp-btn-ghost">Voltar</button>
      </div>
    );
  }

  const tempoNegativo = restante < 0;

  return (
    <div className="udp">
      {/* ── Topbar fixo: timer + ações ──────────────────────────────── */}
      <header className="udp-topbar">
        <div className="udp-topbar-info">
          <span className="udp-topbar-eyebrow">UERJ · Exame Discursivo</span>
          <strong className="udp-topbar-title">{prova.titulo}</strong>
        </div>
        <div className="udp-topbar-actions">
          <div className={`udp-timer ${tempoNegativo ? 'is-over' : ''} ${restante < 600 ? 'is-warning' : ''}`}>
            <span className="udp-timer-label">Tempo</span>
            <span className="udp-timer-value">{fmtTempo(restante)}</span>
          </div>
          <button
            type="button"
            className="udp-btn-ghost"
            onClick={() => setPausado((p) => !p)}
            disabled={submetendo}
          >
            {pausado ? '▶ Retomar' : '⏸ Pausar'}
          </button>
          <button
            type="button"
            className="udp-btn-danger"
            onClick={() => setConfirmando(true)}
            disabled={submetendo}
          >
            Finalizar prova
          </button>
        </div>
      </header>

      {/* ── Tabs (uma por questao + redacao) ────────────────────────── */}
      <nav className="udp-tabs" aria-label="Navegação entre questões">
        {disciplinas.map((d) => (
          <div key={d} className="udp-tab-grupo">
            <span className="udp-tab-grupo-label">{DISCIPLINA_LABELS[d] || d}</span>
            <div className="udp-tab-grupo-items">
              {(questoesAgrupadas[d] || []).map((q) => {
                const idx = questoes.findIndex((x) => x.id === q.id);
                const respondida = !!(respostas[q.id] || '').trim();
                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`udp-tab ${abaAtual === `q-${idx}` ? 'is-active' : ''} ${respondida ? 'is-done' : ''}`}
                    onClick={() => setAbaAtual(`q-${idx}`)}
                  >
                    Q{q.ordem}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {redacao && (
          <div className="udp-tab-grupo">
            <span className="udp-tab-grupo-label">Redação</span>
            <div className="udp-tab-grupo-items">
              <button
                type="button"
                className={`udp-tab udp-tab-redacao ${abaAtual === 'redacao' ? 'is-active' : ''} ${respostaRedacao.trim() ? 'is-done' : ''}`}
                onClick={() => setAbaAtual('redacao')}
              >
                ✍️
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Conteúdo ────────────────────────────────────────────────── */}
      <main className="udp-main">
        {abaQuestao && (
          <article className="udp-questao">
            <div className="udp-questao-header">
              <span className="udp-questao-eyebrow">
                {DISCIPLINA_LABELS[abaQuestao.disciplina] || abaQuestao.disciplina} · Questão {abaQuestao.ordem}
              </span>
            </div>
            <div className="udp-questao-enunciado">
              {abaQuestao.enunciado.split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {abaQuestao.imagens?.map((url, i) => (
                <img key={i} src={url} alt={`figura ${i + 1}`} className="udp-questao-img" />
              ))}
            </div>
            <label className="udp-resposta-label">Sua resposta</label>
            <textarea
              className="udp-resposta"
              value={respostas[abaQuestao.id] || ''}
              onChange={(e) => setResposta(abaQuestao.id, e.target.value)}
              placeholder="Escreva sua resposta aqui. Use quebras de linha pra separar itens (a, b, c) e cálculos."
              rows={14}
            />
            <div className="udp-resposta-meta">
              <span>{(respostas[abaQuestao.id] || '').length} caracteres</span>
            </div>
          </article>
        )}

        {abaAtual === 'redacao' && redacao && (
          <article className="udp-questao">
            <div className="udp-questao-header">
              <span className="udp-questao-eyebrow">Redação</span>
              <h2 className="udp-redacao-tema">{redacao.tema}</h2>
            </div>
            {redacao.textos_motivadores && (
              <div className="udp-questao-enunciado">
                <strong className="udp-mini-label">Textos motivadores</strong>
                {redacao.textos_motivadores.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            {redacao.comando && (
              <div className="udp-comando">
                <strong className="udp-mini-label">Comando</strong>
                <p>{redacao.comando}</p>
              </div>
            )}
            <label className="udp-resposta-label">Sua redação</label>
            <textarea
              className="udp-resposta udp-resposta-redacao"
              value={respostaRedacao}
              onChange={(e) => setRespostaRedacao(e.target.value)}
              placeholder="Escreva sua redação aqui. Norma padrão, texto dissertativo-argumentativo, com proposta de intervenção."
              rows={22}
            />
            <div className="udp-resposta-meta">
              <span>{respostaRedacao.length} caracteres</span>
              <span>{respostaRedacao.trim().split(/\s+/).filter(Boolean).length} palavras</span>
            </div>
          </article>
        )}
      </main>

      {/* ── Modal de confirmação ────────────────────────────────────── */}
      {confirmandoFinalizar && (
        <div className="udp-modal-overlay" onClick={() => setConfirmando(false)}>
          <div className="udp-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Finalizar prova?</h2>
            <p>
              Depois de enviar, você verá a correção da IA. Não dá pra editar respostas depois.
            </p>
            <p className="udp-modal-status">
              <strong>
                {questoes.filter((q) => (respostas[q.id] || '').trim()).length}/{questoes.length}
              </strong> questões respondidas
              {redacao && <> · redação {respostaRedacao.trim() ? '✓' : '✗'}</>}
            </p>
            <div className="udp-modal-actions">
              <button className="udp-btn-ghost" onClick={() => setConfirmando(false)}>Continuar prova</button>
              <button className="udp-btn-primary" onClick={finalizar}>Enviar pra correção</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Pausa overlay ───────────────────────────────────────────── */}
      {pausado && !submetendo && (
        <div className="udp-paused" onClick={() => setPausado(false)}>
          <div className="udp-paused-card">
            <strong>Prova pausada</strong>
            <p>Clique pra retomar.</p>
          </div>
        </div>
      )}

      {submetendo && (
        <div className="udp-paused">
          <div className="udp-paused-card">
            <strong>Enviando…</strong>
            <p>Salvando suas respostas. A IA vai corrigir em seguida.</p>
          </div>
        </div>
      )}
    </div>
  );
}
