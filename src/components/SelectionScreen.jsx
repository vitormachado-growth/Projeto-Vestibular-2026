import React from 'react';
import './SelectionScreen.css';

const SelectionScreen = ({ onSelect }) => {
  return (
    <div className="selection-container">
      <div className="selection-content">
        <header className="selection-header">
          <h1>Bem-vindo ao <span>V</span>es<span>T</span>ibular</h1>
          <p>Qual será seu foco de estudos hoje?</p>
        </header>
        
        <div className="selection-grid">
          <button className="selection-card enem" onClick={() => onSelect('enem')}>
            <div className="card-icon">📚</div>
            <h3>Focar no ENEM</h3>
            <p>Preparação completa para as 4 áreas do conhecimento e redação.</p>
          </button>
          
          <button className="selection-card uerj" onClick={() => onSelect('uerj')}>
            <div className="card-icon">🎓</div>
            <h3>Focar na UERJ</h3>
            <p>Específico para o Exame de Qualificação e Discursivas da UERJ.</p>
          </button>
          
          <button className="selection-card both" onClick={() => onSelect('ambos')}>
            <div className="card-icon">⚡</div>
            <h3>Focar em Ambos</h3>
            <p>Uma estratégia equilibrada para conquistar as melhores vagas do RJ.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;
