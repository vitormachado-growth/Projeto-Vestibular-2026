import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import './UerjDiscursivaResultado.css';

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

const corrigirQuestao = async (questao, resposta) => {
  const { data, error } = await supabase.functions.invoke('correct-discursive', {
    body: {
      mode: 'questao',
      disciplina: questao.disciplina,
      enunciado: questao.enunciado,
      padraoResposta: questao.padrao_resposta,
      respostaAluno: resposta || '',
    },
  });
  if (error) throw error;
  if (data?.erro) throw new Error(data.erro);
  return data.correcao;
};

const corrigirRedacao = async (redacao, resposta) => {
  const { data, error } = await supabase.functions.invoke('correct-discursive', {
    body: {
      mode: 'redacao',
      tema: redacao.tema,
      comando: redacao.comando || null,
      padraoResposta: redacao.padrao_resposta || null,
      respostaAluno: resposta || '',
    },
  });
  if (error) throw error;
  if (data?.erro) throw new Error(data.erro);
  return data.correcao;
};

export default function UerjDiscursivaResultado({ resultadoId, onVoltar }) {
  const [loading, setLoading]     = useState(true);
  const [resultado, setResultado] = useState(null);
  const [prova, setProva]         = useState(null);
  const [questoes, setQuestoes]   = useState([]);
  const [redacao, setRedacao]     = useState(null);
  const [corrigindo, setCorrigindo] = useState(new Set());
  const [erros, setErros]         = useState({});

  // ── Carrega dados iniciais
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: res, error } = await supabase
        .from('uerj_discursiva_resultados')
        .select('*')
        .eq('id', resultadoId)
        .single();
      if (error || !res) {
        console.error(error);
        setLoading(false);
        return;
      }
      setResultado(res);

      const [{ data: p }, { data: qs }, { data: r }] = await Promise.all([
        supabase.from('uerj_discursivas').select('*').eq('id', res.prova_id).single(),
        supabase
          .from('uerj_discursiva_questoes')
          .select('*')
          .eq('prova_id', res.prova_id)
          .in('disciplina', res.disciplinas)
          .order('disciplina').order('ordem'),
        supabase.from('uerj_discursiva_redacao').select('*').eq('prova_id', res.prova_id).maybeSingle(),
      ]);
      setProva(p);
      setQuestoes(qs || []);
      setRedacao(r);
      setLoading(false);
    })();
  }, [resultadoId]);

  // ── Dispara correção pra cada item ainda sem nota
  useEffect(() => {
    if (loading || !resultado) return;

    questoes.forEach((q) => {
      const r = resultado.respostas?.[q.id];
      if (!r || r.nota != null) return;       // ja corrigido
      if (corrigindo.has(q.id)) return;       // ja em andamento
      if (erros[q.id]) return;                // ja falhou, nao tenta de novo
      setCorrigindo((s) => new Set(s).add(q.id));
      corrigirQuestao(q, r.resposta)
        .then(async (correcao) => {
          const novaResposta = { ...r, ...correcao };
          const novasRespostas = { ...resultado.respostas, [q.id]: novaResposta };
          await supabase
            .from('uerj_discursiva_resultados')
            .update({ respostas: novasRespostas })
            .eq('id', resultadoId);
          setResultado((cur) => ({ ...cur, respostas: novasRespostas }));
        })
        .catch((e) => {
          console.error('correcao questao:', e);
          setErros((er) => ({ ...er, [q.id]: e.message || 'Erro na IA' }));
        })
        .finally(() => {
          setCorrigindo((s) => { const n = new Set(s); n.delete(q.id); return n; });
        });
    });

    // Redação
    if (
      redacao &&
      resultado.redacao_resposta != null &&
      resultado.redacao_nota == null &&
      !corrigindo.has('redacao') &&
      !erros.redacao
    ) {
      setCorrigindo((s) => new Set(s).add('redacao'));
      corrigirRedacao(redacao, resultado.redacao_resposta)
        .then(async (correcao) => {
          const update = {
            redacao_nota: correcao.nota,
            redacao_feedback: JSON.stringify(correcao),
            redacao_corrigida_em: new Date().toISOString(),
          };
          await supabase
            .from('uerj_discursiva_resultados')
            .update(update)
            .eq('id', resultadoId);
          setResultado((cur) => ({ ...cur, ...update }));
        })
        .catch((e) => {
          console.error('correcao redacao:', e);
          setErros((er) => ({ ...er, redacao: e.message || 'Erro na IA' }));
        })
        .finally(() => {
          setCorrigindo((s) => { const n = new Set(s); n.delete('redacao'); return n; });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, resultado, questoes, redacao]);

  // ── Computa nota total (média simples das notas disponíveis)
  const notaTotal = useMemo(() => {
    if (!resultado) return null;
    const notas = [];
    questoes.forEach((q) => {
      const n = resultado.respostas?.[q.id]?.nota;
      if (typeof n === 'number') notas.push(n);
    });
    if (typeof resultado.redacao_nota === 'number') notas.push(resultado.redacao_nota);
    if (notas.length === 0) return null;
    return (notas.reduce((s, n) => s + n, 0) / notas.length).toFixed(1);
  }, [resultado, questoes]);

  const totalItens = questoes.length + (redacao ? 1 : 0);
  const corrigidosCount =
    questoes.filter((q) => typeof resultado?.respostas?.[q.id]?.nota === 'number').length +
    (typeof resultado?.redacao_nota === 'number' ? 1 : 0);

  if (loading) return <div className="udr-loading">Carregando resultado…</div>;
  if (!resultado || !prova) {
    return (
      <div className="udr-loading">
        <p>Resultado não encontrado.</p>
        <button onClick={onVoltar} className="udr-btn-ghost">Voltar</button>
      </div>
    );
  }

  const redacaoFeedback = (() => {
    try { return resultado.redacao_feedback ? JSON.parse(resultado.redacao_feedback) : null; }
    catch { return null; }
  })();

  return (
    <div className="udr">
      {/* ── Header com resumo ───────────────────────────────────────── */}
      <header className="udr-header">
        <div>
          <span className="udr-eyebrow">UERJ · Exame Discursivo</span>
          <h1>{prova.titulo}</h1>
          <p className="udr-meta">
            {resultado.disciplinas.map((d) => DISCIPLINA_LABELS[d] || d).join(' + ')}
            {redacao ? ' + Redação' : ''}
          </p>
        </div>
        <div className="udr-nota-box">
          {notaTotal != null ? (
            <>
              <span className="udr-nota-label">Nota média</span>
              <strong className="udr-nota-value">{notaTotal}</strong>
              <span className="udr-nota-sub">{corrigidosCount}/{totalItens} corrigidos</span>
            </>
          ) : (
            <>
              <span className="udr-nota-label">Corrigindo…</span>
              <span className="udr-nota-sub">{corrigidosCount}/{totalItens}</span>
            </>
          )}
        </div>
      </header>

      {/* ── Questões ────────────────────────────────────────────────── */}
      {questoes.map((q) => {
        const r = resultado.respostas?.[q.id];
        const emCorrecao = corrigindo.has(q.id);
        const erro = erros[q.id];
        return (
          <article key={q.id} className="udr-card">
            <header className="udr-card-header">
              <span className="udr-card-eyebrow">
                {DISCIPLINA_LABELS[q.disciplina] || q.disciplina} · Questão {q.ordem}
              </span>
              {typeof r?.nota === 'number' && (
                <span className="udr-card-nota">{r.nota}<small>/10</small></span>
              )}
            </header>

            <div className="udr-section">
              <strong className="udr-section-label">Enunciado</strong>
              <div className="udr-section-text">
                {q.enunciado.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className="udr-grid-2">
              <div className="udr-section">
                <strong className="udr-section-label">Sua resposta</strong>
                <div className="udr-section-text udr-aluno">
                  {(r?.resposta || '').split('\n').map((p, i) => <p key={i}>{p || ' '}</p>) ||
                    <p className="udr-vazio">(em branco)</p>}
                </div>
              </div>
              <div className="udr-section">
                <strong className="udr-section-label">Padrão de resposta</strong>
                <div className="udr-section-text udr-padrao">
                  {q.padrao_resposta.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            <div className="udr-ia">
              <strong className="udr-section-label">Avaliação da IA</strong>
              {emCorrecao && <p className="udr-corrigindo">Corrigindo…</p>}
              {erro && <p className="udr-erro">{erro}</p>}
              {r?.feedback && (
                <>
                  <p className="udr-feedback">{r.feedback}</p>
                  {(r.pontos_positivos?.length || 0) > 0 && (
                    <div className="udr-pontos">
                      <strong>✓ Pontos positivos</strong>
                      <ul>{r.pontos_positivos.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                  )}
                  {(r.pontos_faltantes?.length || 0) > 0 && (
                    <div className="udr-pontos udr-pontos-faltantes">
                      <strong>✗ O que faltou</strong>
                      <ul>{r.pontos_faltantes.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </article>
        );
      })}

      {/* ── Redação ─────────────────────────────────────────────────── */}
      {redacao && resultado.redacao_resposta != null && (
        <article className="udr-card">
          <header className="udr-card-header">
            <span className="udr-card-eyebrow">Redação</span>
            {typeof resultado.redacao_nota === 'number' && (
              <span className="udr-card-nota">{resultado.redacao_nota}<small>/10</small></span>
            )}
          </header>

          <div className="udr-section">
            <strong className="udr-section-label">Tema</strong>
            <div className="udr-section-text"><p>{redacao.tema}</p></div>
          </div>

          <div className="udr-section">
            <strong className="udr-section-label">Sua redação</strong>
            <div className="udr-section-text udr-aluno">
              {resultado.redacao_resposta.split('\n').map((p, i) => <p key={i}>{p || ' '}</p>)}
            </div>
          </div>

          <div className="udr-ia">
            <strong className="udr-section-label">Avaliação da IA</strong>
            {corrigindo.has('redacao') && <p className="udr-corrigindo">Corrigindo…</p>}
            {erros.redacao && <p className="udr-erro">{erros.redacao}</p>}
            {redacaoFeedback && (
              <>
                <p className="udr-feedback">{redacaoFeedback.feedback}</p>
                {redacaoFeedback.criterios && (
                  <div className="udr-criterios">
                    {Object.entries(redacaoFeedback.criterios).map(([k, v]) => (
                      <div key={k} className="udr-criterio">
                        <span>{k.replaceAll('_', ' ')}</span>
                        <strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </article>
      )}

      <div className="udr-actions">
        <button className="udr-btn-ghost" onClick={onVoltar}>← Voltar pras provas</button>
      </div>
    </div>
  );
}
