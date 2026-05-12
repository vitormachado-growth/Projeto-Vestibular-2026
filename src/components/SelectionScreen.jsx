import React from 'react';
import './SelectionScreen.css';

const SelectionScreen = ({ onSelect, onLogout }) => {
  return (
    <div className="dc-selection">
      <span className="dc-sel-blob dc-sel-blob-pink" aria-hidden="true" />
      <span className="dc-sel-blob dc-sel-blob-yellow" aria-hidden="true" />

      {onLogout && (
        <button className="dc-sel-logout" onClick={onLogout}>
          Sair
        </button>
      )}

      <div className="dc-sel-content">
        <header className="dc-sel-header">
          <div className="dc-sel-tag">
            <span className="dc-sel-tag-dot" />
            Passo 1 — seu foco
          </div>
          <h1>
            Bem-vindo ao{' '}
            <span className="dc-brand-name">
              <span className="dc-brand-mark">V</span>es<span className="dc-brand-mark">T</span>ibular
            </span>
          </h1>
          <p>Qual será o seu foco de estudos?</p>
        </header>

        <div className="dc-sel-grid">
          <button className="dc-sel-card dc-sel-card-pink" onClick={() => onSelect('enem')}>
            <div className="dc-sel-card-icon">📚</div>
            <h3>Focar no ENEM</h3>
            <p>Preparação completa para as 4 áreas do conhecimento e redação.</p>
            <span className="dc-sel-card-cta">Escolher →</span>
          </button>

          <button className="dc-sel-card dc-sel-card-yellow" onClick={() => onSelect('uerj')}>
            <div className="dc-sel-card-icon">🎓</div>
            <h3>Focar na UERJ</h3>
            <p>Específico para o Exame de Qualificação e Discursivas da UERJ.</p>
            <span className="dc-sel-card-cta">Escolher →</span>
          </button>

          <button className="dc-sel-card dc-sel-card-violet" onClick={() => onSelect('ambos')}>
            <div className="dc-sel-card-badge">Recomendado</div>
            <div className="dc-sel-card-icon">⚡</div>
            <h3>Focar em Ambos</h3>
            <p>Estratégia equilibrada para conquistar as melhores vagas do Rio.</p>
            <span className="dc-sel-card-cta">Escolher →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
