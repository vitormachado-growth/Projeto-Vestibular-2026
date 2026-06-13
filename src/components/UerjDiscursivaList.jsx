import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './UerjDiscursivaList.css';

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

export default function UerjDiscursivaList({ onComecarProva }) {
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provaAberta, setProvaAberta] = useState(null);
  const [escolha, setEscolha] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('uerj_discursivas')
        .select(`
          id, ano, titulo, data_aplicacao, ativa,
          uerj_discursiva_questoes (disciplina),
          uerj_discursiva_redacao (id, tema)
        `)
        .eq('ativa', true)
        .order('ano', { ascending: false });
      if (error) {
        console.error(error);
        setProvas([]);
      } else {
        const enriched = (data || []).map((p) => {
          const disciplinas = [...new Set((p.uerj_discursiva_questoes || []).map((q) => q.disciplina))];
          const totalPorDisciplina = (p.uerj_discursiva_questoes || []).reduce((acc, q) => {
            acc[q.disciplina] = (acc[q.disciplina] || 0) + 1;
            return acc;
          }, {});
          return {
            ...p,
            disciplinas,
            totalPorDisciplina,
            temRedacao: Array.isArray(p.uerj_discursiva_redacao) && p.uerj_discursiva_redacao.length > 0,
          };
        });
        setProvas(enriched);
      }
      setLoading(false);
    })();
  }, []);

  const abrir = (prova) => {
    setProvaAberta(prova);
    setEscolha([]);
  };

  const toggleDisciplina = (d) => {
    setEscolha((cur) => {
      if (cur.includes(d)) return cur.filter((x) => x !== d);
      if (cur.length >= 2) return cur;
      return [...cur, d];
    });
  };

  const comecar = () => {
    if (escolha.length !== 2 || !provaAberta) return;
    onComecarProva?.(provaAberta.id, escolha);
    setProvaAberta(null);
  };

  return (
    <div className="ud-list">
      <header className="ud-list-header">
        <span className="ud-list-eyebrow">UERJ · Exame Discursivo</span>
        <h1>Provas Discursivas</h1>
        <p>
          A segunda etapa da UERJ é composta por <strong>redação</strong> e
          questões dissertativas de <strong>duas disciplinas</strong> conforme o curso.
          Escolha um ano e treine como se fosse o dia da prova.
        </p>
      </header>

      {loading ? (
        <div className="ud-list-empty">Carregando provas…</div>
      ) : provas.length === 0 ? (
        <div className="ud-list-empty">
          Nenhuma prova cadastrada ainda. Volta logo — vamos subir as provas dos últimos anos.
        </div>
      ) : (
        <ul className="ud-list-grid">
          {provas.map((p) => (
            <li key={p.id} className="ud-card">
              <div className="ud-card-top">
                <span className="ud-card-ano">{p.ano}</span>
                {p.temRedacao && <span className="ud-card-tag">+ redação</span>}
              </div>
              <h2 className="ud-card-title">{p.titulo}</h2>
              <div className="ud-card-disc">
                <span className="ud-card-disc-label">Disciplinas disponíveis</span>
                <div className="ud-card-disc-pills">
                  {p.disciplinas.length === 0 ? (
                    <span className="ud-card-disc-empty">nenhuma questão cadastrada</span>
                  ) : (
                    p.disciplinas.map((d) => (
                      <span key={d} className="ud-card-pill">
                        {DISCIPLINA_LABELS[d] || d}
                        <small>{p.totalPorDisciplina[d]}q</small>
                      </span>
                    ))
                  )}
                </div>
              </div>
              <button
                className="ud-card-btn"
                onClick={() => abrir(p)}
                disabled={p.disciplinas.length < 2}
              >
                {p.disciplinas.length < 2 ? 'Precisa de 2+ disciplinas' : 'Escolher disciplinas →'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {provaAberta && (
        <div className="ud-modal-overlay" onClick={() => setProvaAberta(null)}>
          <div className="ud-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ud-modal-close" onClick={() => setProvaAberta(null)}>×</button>
            <span className="ud-modal-eyebrow">{provaAberta.titulo}</span>
            <h2>Escolha 2 disciplinas</h2>
            <p>Como no dia da prova, você responde a duas disciplinas. Selecione as suas:</p>
            <div className="ud-modal-disc-grid">
              {provaAberta.disciplinas.map((d) => {
                const ativo = escolha.includes(d);
                const cheio = !ativo && escolha.length >= 2;
                return (
                  <button
                    key={d}
                    className={`ud-modal-disc ${ativo ? 'is-active' : ''} ${cheio ? 'is-disabled' : ''}`}
                    onClick={() => toggleDisciplina(d)}
                    disabled={cheio}
                  >
                    <strong>{DISCIPLINA_LABELS[d] || d}</strong>
                    <small>{provaAberta.totalPorDisciplina[d]} questões</small>
                  </button>
                );
              })}
            </div>
            <button
              className="ud-modal-start"
              onClick={comecar}
              disabled={escolha.length !== 2}
            >
              {escolha.length === 0 && 'Escolha 2 disciplinas'}
              {escolha.length === 1 && 'Falta 1 disciplina'}
              {escolha.length === 2 && 'Começar prova →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
