import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted, onLogin, darkMode, onToggleDark }) => {
  return (
    <div className="landing-container">
      {/* ── Navigation ── */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <h2><span>V</span>es<span>T</span>ibular</h2>
        </div>
        <div className="nav-links">
          <a href="#features">Funcionalidades</a>
          <a href="#about">Sobre</a>
          <button 
            className="theme-toggle" 
            onClick={onToggleDark}
            title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="nav-login-btn" onClick={onLogin}>Entrar</button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Aprovado por centenas de estudantes</div>
          <h1>
            Sua jornada rumo à <span>Universidade</span> começa aqui.
          </h1>
          <p>
            Cronogramas inteligentes, banco de questões e acompanhamento de desempenho
            personalizado para o ENEM e UERJ 2026.
          </p>
          <div className="hero-actions">
            <button className="cta-primary" onClick={onGetStarted}>Começar Agora →</button>
            <button className="cta-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Ver Funcionalidades
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <strong>+50k</strong>
              <span>Questões</span>
            </div>
            <div className="stat-item">
              <strong>100%</strong>
              <span>Personalizado</span>
            </div>
            <div className="stat-item">
              <strong>Gratuito</strong>
              <span>Até a aprovação</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card main-card">
            <div className="card-header">
              <div className="header-dot"></div>
              <div className="header-dot"></div>
              <div className="header-dot"></div>
            </div>
            <div className="card-body">
              <div className="body-line"></div>
              <div className="body-line short"></div>
              <div className="body-grid">
                <div className="grid-box"></div>
                <div className="grid-box"></div>
                <div className="grid-box"></div>
              </div>
            </div>
          </div>
          <div className="visual-card floating-card">
            <div className="card-icon">⚡</div>
            <div className="card-text">
              <div className="line"></div>
              <div className="line short"></div>
            </div>
          </div>
          <div className="visual-blob"></div>
        </div>
      </header>

      {/* ── Features Section ── */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="subtitle">Por que escolher o VesTibular?</span>
          <h2>Tudo o que você precisa em um só lugar</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Cronograma Inteligente</h3>
            <p>Algoritmos que adaptam seu tempo de estudo baseado nas suas dificuldades e peso das matérias.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Análise de Desempenho</h3>
            <p>Gráficos detalhados que mostram sua evolução em cada disciplina e tópico específico.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Simulados Semanais</h3>
            <p>Treine com provas reais e cronometradas. Compare seu resultado com outros estudantes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">✒️</div>
            <h3>Oficina de Redação</h3>
            <p>Temas atuais e estrutura completa para você alcançar a nota máxima no ENEM e UERJ.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2><span>V</span>es<span>T</span>ibular</h2>
            <p>Transformando o estudo para o vestibular em uma jornada de sucesso.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Plataforma</h4>
              <a href="#">Simulados</a>
              <a href="#">Matérias</a>
              <a href="#">Redação</a>
            </div>
            <div className="link-group">
              <h4>Suporte</h4>
              <a href="#">FAQ</a>
              <a href="#">Contato</a>
              <a href="#">Termos</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 VesTibular Brasil. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
