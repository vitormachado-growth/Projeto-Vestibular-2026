import { forwardRef } from 'react';
import './SimuladoShareCard.css';

const AREA_LABELS = {
  humanas: 'Humanas',
  linguagens: 'Linguagens',
  matematica: 'Matemática',
  naturezas: 'Naturezas',
};

const SimuladoShareCard = forwardRef(function SimuladoShareCard(
  { simulado, resultado, areas, ranking, userName, redacaoTotal },
  ref
) {
  const pct = resultado.total_questoes > 0
    ? Math.round((resultado.acertos / resultado.total_questoes) * 100)
    : 0;

  const dataFormatada = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const performanceLabel =
    pct >= 80 ? 'Mandou bem!' :
    pct >= 60 ? 'Tá no caminho!' :
    pct >= 40 ? 'Bora estudar!' :
    'Vamos com tudo!';

  const topPct = ranking?.total
    ? Math.max(1, Math.round((ranking.posicao / ranking.total) * 100))
    : null;

  return (
    <div ref={ref} className="share-card">
      {/* Blobs decorativos */}
      <span className="share-blob share-blob-1" />
      <span className="share-blob share-blob-2" />
      <span className="share-blob share-blob-3" />

      {/* Header */}
      <header className="share-header">
        <div className="share-brand">
          <span className="share-brand-mark">V</span>es<span className="share-brand-mark">T</span>ibular
        </div>
        <span className="share-date">{dataFormatada}</span>
      </header>

      {/* Título */}
      <div className="share-title-block">
        <span className="share-eyebrow">Simulado concluído</span>
        <h1 className="share-simulado-name">{simulado?.titulo || 'Simulado'}</h1>
      </div>

      {/* Score gigante */}
      <div className="share-score">
        <div className="share-score-number">
          <span className="share-pct">{pct}</span>
          <span className="share-percent-sign">%</span>
        </div>
        <p className="share-score-label">{performanceLabel}</p>
        <p className="share-score-detail">
          <strong>{resultado.acertos}</strong> de {resultado.total_questoes} questões
        </p>
      </div>

      {/* Ranking */}
      {ranking && (
        <div className="share-ranking">
          <div className="share-ranking-pos">
            <span className="share-hash">#</span>
            <span className="share-pos-number">{ranking.posicao}</span>
          </div>
          <div className="share-ranking-info">
            <p>de <strong>{ranking.total}</strong> alunos</p>
            {topPct && <p className="share-top-tag">Top {topPct}%</p>}
          </div>
        </div>
      )}

      {/* Breakdown por área */}
      {areas && Object.keys(areas).length > 0 && (
        <div className="share-areas">
          {Object.entries(areas).map(([area, v]) => {
            const areaPct = v.total > 0 ? Math.round((v.acertos / v.total) * 100) : 0;
            return (
              <div key={area} className="share-area-row">
                <span className="share-area-label">{AREA_LABELS[area] || area}</span>
                <div className="share-area-bar">
                  <div className="share-area-fill" style={{ width: `${areaPct}%` }} />
                </div>
                <span className="share-area-pct">{areaPct}%</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Redação */}
      {redacaoTotal != null && (
        <div className="share-redacao">
          <span className="share-redacao-icon">✍️</span>
          <div>
            <span className="share-redacao-label">Redação</span>
            <strong>{redacaoTotal} / 1000</strong>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="share-footer">
        {userName && <p className="share-user">@{userName}</p>}
        <p className="share-cta">Faça você também → <strong>vestibular.app</strong></p>
      </footer>
    </div>
  );
});

export default SimuladoShareCard;
