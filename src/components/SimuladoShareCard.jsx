import { forwardRef } from 'react';
import './SimuladoShareCard.css';

const SimuladoShareCard = forwardRef(function SimuladoShareCard(
  { simulado, resultado, ranking, redacaoTotal, bgImage, textColor = 'light' },
  ref
) {
  const pct = resultado.total_questoes > 0
    ? Math.round((resultado.acertos / resultado.total_questoes) * 100)
    : 0;

  const dataFormatada = new Date()
    .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    .toLowerCase();

  const topPct = ranking?.total
    ? Math.max(1, Math.round((ranking.posicao / ranking.total) * 100))
    : null;

  return (
    <div
      ref={ref}
      className={`share-card${bgImage ? ' has-bg' : ''}${textColor === 'dark' ? ' text-dark' : ''}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {/* Overlay escuro pra legibilidade do texto */}
      <div className="share-overlay" />

      <div className="share-content">
        {/* Sticker top — estilo location pill do Strava */}
        <div className="share-top">
          <div className="share-sticker">
            <span className="share-sticker-dot">●</span>
            <span>{dataFormatada}</span>
          </div>
        </div>

        {/* Stats centralizados */}
        <div className="share-stats">
          <div className="share-simulado-name">
            {simulado?.titulo || 'Simulado'}
          </div>

          <div className="share-stat share-stat-hero">
            <span className="share-stat-label">Aproveitamento</span>
            <span className="share-stat-value">{pct}%</span>
          </div>

          <div className="share-stat">
            <span className="share-stat-label">Acertos</span>
            <span className="share-stat-value">
              {resultado.acertos} <span className="share-stat-unit">/ {resultado.total_questoes}</span>
            </span>
          </div>

          {ranking && (
            <div className="share-stat">
              <span className="share-stat-label">Posição</span>
              <span className="share-stat-value">
                #{ranking.posicao} <span className="share-stat-unit">/ {ranking.total}</span>
              </span>
              {topPct && <span className="share-stat-sub">Top {topPct}%</span>}
            </div>
          )}

          {redacaoTotal != null && (
            <div className="share-stat">
              <span className="share-stat-label">Redação</span>
              <span className="share-stat-value">
                {redacaoTotal} <span className="share-stat-unit">/ 1000</span>
              </span>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="share-brand-bar">
          <img src="/logohorizontal.png" alt="VesTibular" className="share-brand-wordmark" />
          <span className="share-brand-url">vestibular.app</span>
        </div>
      </div>
    </div>
  );
});

export default SimuladoShareCard;
