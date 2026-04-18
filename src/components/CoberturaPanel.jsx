import { useMemo } from 'react';
import { calcularCobertura } from '../utils/classificadorTopicos';

const META_POR_TOPICO = 30;

export default function CoberturaPanel({ questoes, onClose, onPraticar, onReclassificar }) {
  const { cobertura, geraisPorMateria } = useMemo(
    () => calcularCobertura(questoes),
    [questoes]
  );

  const resumo = useMemo(() => {
    let totalTopicos = 0;
    let topicosCompletos = 0;
    let topicosVazios = 0;
    Object.values(cobertura).forEach(subjTopicos => {
      Object.values(subjTopicos).forEach(n => {
        totalTopicos++;
        if (n >= META_POR_TOPICO) topicosCompletos++;
        if (n === 0) topicosVazios++;
      });
    });
    const totalGerais = Object.values(geraisPorMateria).reduce((a, b) => a + b, 0);
    return { totalTopicos, topicosCompletos, topicosVazios, totalGerais };
  }, [cobertura, geraisPorMateria]);

  return (
    <div className="polo-overlay" onClick={onClose}>
      <div className="cobertura-modal" onClick={e => e.stopPropagation()}>
        <div className="polo-header">
          <div>
            <p className="polo-eyebrow">Cobertura do banco</p>
            <h2>Questões por tópico</h2>
          </div>
          <button className="polo-close" onClick={onClose}>✕</button>
        </div>

        <div className="cobertura-resumo">
          <div className="resumo-stat">
            <span className="resumo-num">{questoes.length}</span>
            <span className="resumo-label">questões totais</span>
          </div>
          <div className="resumo-stat">
            <span className="resumo-num">{resumo.topicosCompletos}/{resumo.totalTopicos}</span>
            <span className="resumo-label">tópicos com 30+ questões</span>
          </div>
          <div className="resumo-stat resumo-alerta">
            <span className="resumo-num">{resumo.topicosVazios}</span>
            <span className="resumo-label">tópicos vazios</span>
          </div>
          {resumo.totalGerais > 0 && (
            <div className="resumo-stat">
              <span className="resumo-num">{resumo.totalGerais}</span>
              <span className="resumo-label">sem tópico classificado</span>
            </div>
          )}
        </div>

        <div className="cobertura-actions-row">
          <p className="polo-desc" style={{ margin: 0, flex: 1 }}>
            Meta: <strong>{META_POR_TOPICO}+ questões por tópico</strong>.
            Clique em qualquer tópico para filtrar o banco por ele.
          </p>
          {onReclassificar && resumo.totalGerais > 0 && (
            <button className="btn-primario" onClick={onReclassificar}>
              🔄 Reclassificar ({resumo.totalGerais})
            </button>
          )}
        </div>

        <div className="cobertura-lista">
          {Object.entries(cobertura).map(([subj, topicos]) => {
            const gerais = geraisPorMateria[subj] || 0;
            return (
              <div key={subj} className="cobertura-materia">
                <h3>
                  {subj}
                  {gerais > 0 && (
                    <span className="materia-gerais">· {gerais} sem tópico</span>
                  )}
                </h3>
                <div className="cobertura-topicos">
                  {Object.entries(topicos).map(([topico, count]) => {
                    const nivel = count >= META_POR_TOPICO ? 'ok' : count >= 10 ? 'medio' : 'baixo';
                    return (
                      <button
                        key={topico}
                        className={`cobertura-chip nivel-${nivel}`}
                        onClick={() => onPraticar && onPraticar(subj, topico)}
                        title={`Ver questões de ${topico}`}
                      >
                        <span className="chip-topico">{topico}</span>
                        <span className="chip-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
