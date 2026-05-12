import React, { useState, useMemo } from 'react';
import './CourseSelectionScreen.css';

const courseData = {
  "Biomédico": [
    "Ciências Biológicas",
    "Ciências Biológicas - Zona Oeste",
    "Ciências Biológicas (ênfase Biotecnologia e Produção) - Zona Oeste",
    "Ciências Biológicas (ênfase Gestão Ambiental) - Zona Oeste",
    "Enfermagem",
    "Farmácia - Zona Oeste",
    "Fisioterapia",
    "Medicina",
    "Medicina - Cabo Frio",
    "Nutrição",
    "Odontologia"
  ],
  "Ciências Sociais": [
    "Administração",
    "Arqueologia",
    "Ciências Contábeis",
    "Ciências Econômicas",
    "Ciências Sociais",
    "Direito",
    "Filosofia",
    "História",
    "Relações Internacionais",
    "Serviço Social"
  ],
  "Educação e Humanidades": [
    "Artes Visuais",
    "Ciências Biológicas - São Gonçalo",
    "Cinema e Audiovisual (licenciatura) - Duque de Caxias",
    "Educação Física",
    "Geografia (licenciatura) - Duque de Caxias",
    "Geografia",
    "História - São Gonçalo",
    "História da Arte",
    "Jornalismo",
    "Letras",
    "Letras (licenciatura) - São Gonçalo",
    "Matemática (licenciatura) - Duque de Caxias",
    "Matemática (licenciatura) - São Gonçalo",
    "Pedagogia - Duque de Caxias",
    "Pedagogia",
    "Pedagogia - São Gonçalo",
    "Psicologia",
    "Relações Públicas"
  ],
  "Tecnologia e Ciências": [
    "Arquitetura",
    "Ciências Ambientais",
    "Ciências Atuariais",
    "Ciência da Computação",
    "Ciência da Computação - Zona Oeste",
    "Design",
    "Engenharia Ambiental e Sanitária",
    "Engenharia Cartográfica",
    "Engenharia Civil",
    "Engenharia de Computação - Nova Friburgo",
    "Engenharia de Energias Renováveis",
    "Engenharia de Materiais - Zona Oeste",
    "Engenharia de Produção - Resende",
    "Engenharia de Produção",
    "Engenharia de Produção - Zona Oeste",
    "Engenharia Elétrica",
    "Engenharia Mecânica - Nova Friburgo",
    "Engenharia Mecânica - Resende",
    "Engenharia Mecânica",
    "Engenharia Metalúrgica - Zona Oeste",
    "Engenharia Química - Resende",
    "Engenharia Química",
    "Estatística",
    "Física",
    "Geografia",
    "Geografia - Cabo Frio",
    "Geologia",
    "Matemática",
    "Oceanografia",
    "Química",
    "Tecnologia em Análise e Desenvolvimento de Sistemas - Zona Oeste",
    "Tecnologia em Construção Naval - Zona Oeste",
    "Turismo"
  ]
};

const categoryIcons = {
  "Biomédico": "🩺",
  "Ciências Sociais": "⚖️",
  "Educação e Humanidades": "📚",
  "Tecnologia e Ciências": "💻"
};

const categoryThemes = {
  "Biomédico": "pink",
  "Ciências Sociais": "yellow",
  "Educação e Humanidades": "violet",
  "Tecnologia e Ciências": "blue"
};

function parseCourse(fullName) {
  const variantMatch = fullName.match(/\s*\(([^)]+)\)/);
  const variant = variantMatch ? variantMatch[1] : null;
  const withoutVariant = fullName.replace(/\s*\([^)]+\)/, '');
  const parts = withoutVariant.split(/\s+-\s+/);
  const base = parts[0].trim();
  const polo = parts[1] ? parts[1].trim() : 'Maracanã';
  return { base, variant, polo, fullName };
}

function groupCourses(list) {
  const groups = {};
  list.forEach(name => {
    const parsed = parseCourse(name);
    if (!groups[parsed.base]) groups[parsed.base] = { base: parsed.base, options: [] };
    groups[parsed.base].options.push(parsed);
  });
  return Object.values(groups);
}

const CourseSelectionScreen = ({ onSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupAberto, setGroupAberto] = useState(null);

  const groupedByCategory = useMemo(() => {
    const result = {};
    Object.keys(courseData).forEach(cat => {
      result[cat] = groupCourses(courseData[cat]);
    });
    return result;
  }, []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return groupedByCategory;
    const term = searchTerm.toLowerCase();
    const filtered = {};
    Object.keys(groupedByCategory).forEach(cat => {
      const matches = groupedByCategory[cat].filter(g =>
        g.base.toLowerCase().includes(term) ||
        g.options.some(o =>
          o.polo.toLowerCase().includes(term) ||
          (o.variant && o.variant.toLowerCase().includes(term))
        )
      );
      if (matches.length > 0) filtered[cat] = matches;
    });
    return filtered;
  }, [searchTerm, groupedByCategory]);

  const totalResults = Object.values(filteredData).reduce((sum, arr) => sum + arr.length, 0);

  function handleGroupClick(group) {
    if (group.options.length === 1) {
      onSelect(group.options[0].fullName);
    } else {
      setGroupAberto(group);
    }
  }

  function handlePoloSelect(option) {
    onSelect(option.fullName);
    setGroupAberto(null);
  }

  return (
    <div className="dc-course">
      <span className="dc-course-blob dc-course-blob-pink" aria-hidden="true" />
      <span className="dc-course-blob dc-course-blob-yellow" aria-hidden="true" />

      <div className="dc-course-content">
        <button className="dc-course-back" onClick={onBack}>
          ← Voltar para escolha de foco
        </button>

        <header className="dc-course-header">
          <div className="dc-course-tag">
            <span className="dc-course-tag-dot" />
            Passo 2 — seu curso
          </div>
          <h1>
            Qual curso você pretende <span className="dc-hl-pink">cursar</span>?
          </h1>
          <p>A UERJ oferece 80 cursos de graduação em 35 unidades acadêmicas.</p>
        </header>

        <div className="dc-course-search">
          <span className="dc-course-search-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Procure por curso ou campus (ex: Medicina, Zona Oeste...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <span className="dc-course-search-count">
              {totalResults} resultado{totalResults !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="dc-course-sections">
          {Object.keys(filteredData).map(category => (
            <section
              key={category}
              className={`dc-course-section dc-theme-${categoryThemes[category]}`}
            >
              <h2 className="dc-course-cat">
                <span className="dc-course-cat-icon">{categoryIcons[category]}</span>
                <span className="dc-course-cat-name">{category.toUpperCase()}</span>
                <span className="dc-course-cat-count">{filteredData[category].length} cursos</span>
              </h2>
              <div className="dc-course-grid">
                {filteredData[category].map(group => (
                  <button
                    key={group.base}
                    className="dc-course-card"
                    onClick={() => handleGroupClick(group)}
                  >
                    <div className="dc-course-card-info">
                      <h3>{group.base}</h3>
                      {group.options.length > 1 && (
                        <span className="dc-course-polo-pill">
                          {group.options.length} opções de polo/ênfase
                        </span>
                      )}
                    </div>
                    <span className="dc-course-arrow">→</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        {Object.keys(filteredData).length === 0 && (
          <div className="dc-course-empty">
            <div className="dc-course-empty-icon">🔎</div>
            <h3>Nada encontrado</h3>
            <p>Não achamos cursos com "<strong>{searchTerm}</strong>". Tenta uma busca diferente.</p>
          </div>
        )}
      </div>

      {groupAberto && (
        <div className="dc-polo-overlay" onClick={() => setGroupAberto(null)}>
          <div className="dc-polo-modal" onClick={e => e.stopPropagation()}>
            <div className="dc-polo-modal-head">
              <div>
                <p className="dc-polo-modal-eyebrow">Escolha o polo</p>
                <h2>{groupAberto.base}</h2>
              </div>
              <button className="dc-polo-modal-close" onClick={() => setGroupAberto(null)} aria-label="Fechar">
                ✕
              </button>
            </div>
            <p className="dc-polo-modal-desc">
              Este curso está disponível em {groupAberto.options.length} polos ou variantes.
              Selecione a opção que você deseja cursar:
            </p>
            <div className="dc-polo-list">
              {groupAberto.options.map(option => (
                <button
                  key={option.fullName}
                  className="dc-polo-option"
                  onClick={() => handlePoloSelect(option)}
                >
                  <div className="dc-polo-option-info">
                    <h3>
                      <span className="dc-polo-pin">📍</span>
                      {option.polo}
                    </h3>
                    {option.variant && (
                      <span className="dc-polo-variant">Ênfase: {option.variant}</span>
                    )}
                  </div>
                  <span className="dc-polo-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSelectionScreen;
