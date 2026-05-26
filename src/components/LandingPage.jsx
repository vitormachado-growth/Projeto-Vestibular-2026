import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted, onLogin, darkMode, onToggleDark }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="dc-landing">
      {/* ── Navigation ── */}
      <nav className={`dc-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="dc-nav-inner">
          <button className="dc-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="dc-logo-mark">V</span>es<span className="dc-logo-mark">T</span>ibular
          </button>

          <div className="dc-nav-links">
            <a onClick={() => scrollTo('materias')}>Matérias</a>
            <a onClick={() => scrollTo('plataforma')}>Plataforma</a>
            <a onClick={() => scrollTo('como-funciona')}>Como funciona</a>
          </div>

          <div className="dc-nav-actions">
            <button
              className="dc-theme-toggle"
              onClick={onToggleDark}
              aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="dc-btn-ghost" onClick={onLogin}>Entrar</button>
            <button className="dc-btn-primary" onClick={onGetStarted}>
              Começar grátis
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="dc-hero">
        <span className="dc-blob dc-blob-pink" aria-hidden="true" />
        <span className="dc-blob dc-blob-yellow" aria-hidden="true" />
        <span className="dc-blob dc-blob-violet" aria-hidden="true" />

        <div className="dc-hero-inner">
          <div className="dc-hero-content">
            <div className="dc-pill">
              <span className="dc-pill-dot" />
              Preparação ENEM e UERJ 2026
            </div>

            <h1 className="dc-hero-title">
              Aprovação não é sorte.<br />
              É <span className="dc-brand-name">
                <span className="dc-brand-mark">V</span>es<span className="dc-brand-mark">T</span>ibular
              </span>.
            </h1>

            <p className="dc-hero-lead">
              Cronograma inteligente, milhares de questões, simulados e oficina de redação.
              Tudo personalizado pra você passar no <strong>ENEM</strong> e na <strong>UERJ</strong>.
            </p>

            <div className="dc-hero-cta">
              <button className="dc-btn-primary dc-btn-lg" onClick={onGetStarted}>
                Começar agora — é grátis
              </button>
              <button className="dc-btn-link" onClick={onLogin}>
                Já tenho conta →
              </button>
            </div>

            <div className="dc-hero-trust">
              <div className="dc-trust-item">
                <strong>+50k</strong>
                <span>questões</span>
              </div>
              <div className="dc-trust-divider" />
              <div className="dc-trust-item">
                <strong>100%</strong>
                <span>personalizado</span>
              </div>
              <div className="dc-trust-divider" />
              <div className="dc-trust-item">
                <strong>2026</strong>
                <span>edital atualizado</span>
              </div>
            </div>
          </div>

          <div className="dc-hero-visual" aria-hidden="true">
            <div className="dc-mock-wrap">
              <div className="dc-mock" style={{ animation: 'dc-mock-float 7s ease-in-out infinite' }}>
                <div className="dc-mock-top">
                  <span className="dc-mock-dot" />
                  <span className="dc-mock-dot" />
                  <span className="dc-mock-dot" />
                  <span className="dc-mock-title">Cronograma da semana</span>
                </div>
                <div className="dc-mock-body">
                  <div className="dc-mock-row">
                    <span className="dc-mock-tag dc-tag-pink">SEG</span>
                    <div className="dc-mock-bar dc-bar-pink"><span>Matemática</span><b>2h</b></div>
                  </div>
                  <div className="dc-mock-row">
                    <span className="dc-mock-tag dc-tag-yellow">TER</span>
                    <div className="dc-mock-bar dc-bar-yellow"><span>Português</span><b>1h30</b></div>
                  </div>
                  <div className="dc-mock-row">
                    <span className="dc-mock-tag dc-tag-violet">QUA</span>
                    <div className="dc-mock-bar dc-bar-violet"><span>Redação</span><b>1h</b></div>
                  </div>
                  <div className="dc-mock-row">
                    <span className="dc-mock-tag dc-tag-blue">QUI</span>
                    <div className="dc-mock-bar dc-bar-blue"><span>Biologia</span><b>1h30</b></div>
                  </div>
                </div>
              </div>

              <div className="dc-float dc-float-1" style={{ animation: 'dc-float-1 9s ease-in-out infinite' }}>
                <div className="dc-float-emoji">📊</div>
                <div>
                  <div className="dc-float-title">Desempenho</div>
                  <div className="dc-float-value">+18% essa semana</div>
                </div>
              </div>

              <div className="dc-float dc-float-2" style={{ animation: 'dc-float-2 11s ease-in-out infinite', animationDelay: '-4s' }}>
                <div className="dc-float-emoji">🔥</div>
                <div>
                  <div className="dc-float-title">Sequência</div>
                  <div className="dc-float-value">7 dias seguidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee de Aprovação ── */}
      <div className="dc-marquee" aria-hidden="true">
        <div className="dc-marquee-track">
          {Array.from({ length: 4 }).map((_, k) => (
            <div key={k} className="dc-marquee-set">
              <span>ENEM 2026 ★</span>
              <span>UERJ 2026 ★</span>
              <span>Medicina ★</span>
              <span>Engenharia ★</span>
              <span>Direito ★</span>
              <span>Aprovação ★</span>
              <span>Foco total ★</span>
              <span>Estudo inteligente ★</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Matérias ── */}
      <section id="materias" className="dc-section dc-materias">
        <div className="dc-section-head">
          <span className="dc-eyebrow">Matérias</span>
          <h2>Todo o conteúdo do edital, <span className="dc-hl-yellow">organizado pra você</span></h2>
          <p>Conteúdo dividido ponto a ponto, do básico ao avançado, seguindo os editais ENEM e UERJ 2026.</p>
        </div>

        <div className="dc-materias-grid">
          <div className="dc-mat dc-mat-pink">
            <div className="dc-mat-icon">🧮</div>
            <h4>Matemática</h4>
            <span>134 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-yellow">
            <div className="dc-mat-icon">📖</div>
            <h4>Português</h4>
            <span>98 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-violet">
            <div className="dc-mat-icon">🧬</div>
            <h4>Biologia</h4>
            <span>112 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-green">
            <div className="dc-mat-icon">⚗️</div>
            <h4>Química</h4>
            <span>87 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-blue">
            <div className="dc-mat-icon">🪐</div>
            <h4>Física</h4>
            <span>96 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-orange">
            <div className="dc-mat-icon">🗺️</div>
            <h4>História</h4>
            <span>104 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-teal">
            <div className="dc-mat-icon">🌎</div>
            <h4>Geografia</h4>
            <span>89 tópicos</span>
          </div>
          <div className="dc-mat dc-mat-rose">
            <div className="dc-mat-icon">✍️</div>
            <h4>Redação</h4>
            <span>33 temas</span>
          </div>
        </div>
      </section>

      {/* ── Plataforma (Features) ── */}
      <section id="plataforma" className="dc-section dc-plataforma">
        <div className="dc-section-head">
          <span className="dc-eyebrow">Plataforma</span>
          <h2>Tudo o que você precisa, <span className="dc-hl-pink">num lugar só</span></h2>
          <p>Da primeira aula até a última revisão antes da prova.</p>
        </div>

        <div className="dc-features">
          <article className="dc-feat dc-feat-hero">
            <div className="dc-feat-badge">⚡ Mais usado</div>
            <h3>Cronograma inteligente</h3>
            <p>Você diz quanto tempo tem, a gente monta sua semana. Equilibra teoria, questões, revisão e simulado pra você não perder nada.</p>
            <ul className="dc-feat-list">
              <li>Distribui horas pelo peso do curso UERJ</li>
              <li>Adapta janelas de estudo do seu dia a dia</li>
              <li>Integra teoria, prática, redação e simulados</li>
            </ul>
          </article>

          <article className="dc-feat dc-feat-pink">
            <div className="dc-feat-icon">✍️</div>
            <h3>Oficina de Redação</h3>
            <p>33 temas atuais, textos motivadores e estrutura passo a passo pra nota mil.</p>
          </article>

          <article className="dc-feat dc-feat-yellow">
            <div className="dc-feat-icon">📊</div>
            <h3>Desempenho</h3>
            <p>Acerto por matéria, cobertura do edital e evolução semanal num só painel.</p>
          </article>

          <article className="dc-feat dc-feat-violet">
            <div className="dc-feat-icon">🏆</div>
            <h3>Simulados + Ranking</h3>
            <p>Provas cronometradas e ranking semanal pra competir com a comunidade.</p>
          </article>

          <article className="dc-feat dc-feat-soft">
            <div className="dc-feat-icon">🎯</div>
            <h3>Foco UERJ</h3>
            <p>Pesos ajustados por curso: Medicina, Direito, Engenharias e muito mais.</p>
          </article>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" className="dc-section dc-steps">
        <div className="dc-section-head">
          <span className="dc-eyebrow dc-eyebrow-light">Como funciona</span>
          <h2 className="dc-on-dark">Em 4 passos você já <span className="dc-hl-yellow">tá estudando</span></h2>
        </div>

        <ol className="dc-steps-grid">
          <li className="dc-step">
            <span className="dc-step-num">01</span>
            <h4>Crie sua conta</h4>
            <p>Sem cartão, sem complicação. Leva 30 segundos.</p>
          </li>
          <li className="dc-step">
            <span className="dc-step-num">02</span>
            <h4>Defina sua meta</h4>
            <p>ENEM, UERJ ou os dois? Escolha o curso dos sonhos.</p>
          </li>
          <li className="dc-step">
            <span className="dc-step-num">03</span>
            <h4>Receba seu plano</h4>
            <p>Cronograma semanal montado com base no seu tempo.</p>
          </li>
          <li className="dc-step">
            <span className="dc-step-num">04</span>
            <h4>Estude e evolua</h4>
            <p>Questões, simulados, redação e ranking — tudo junto.</p>
          </li>
        </ol>
      </section>

      {/* ── Final CTA ── */}
      <section className="dc-cta">
        <div className="dc-cta-inner">
          <h2>Falta pouco pra você <span className="dc-hl-yellow-solid">passar</span>.</h2>
          <p>Comece agora. É grátis e leva menos de 1 minuto.</p>
          <button className="dc-btn-white dc-btn-lg" onClick={onGetStarted}>
            Quero começar agora →
          </button>
        </div>
        <span className="dc-cta-shape dc-cta-shape-1" aria-hidden="true" />
        <span className="dc-cta-shape dc-cta-shape-2" aria-hidden="true" />
      </section>

      {/* ── Footer ── */}
      <footer className="dc-footer">
        <div className="dc-footer-inner">
          <div className="dc-footer-brand">
            <div className="dc-logo dc-logo-footer">
              <span className="dc-logo-mark">V</span>es<span className="dc-logo-mark">T</span>ibular
            </div>
            <p>Sua jornada rumo à universidade começa aqui.</p>
          </div>

          <div className="dc-footer-cols">
            <div>
              <h5>Plataforma</h5>
              <a onClick={() => scrollTo('materias')}>Matérias</a>
              <a onClick={() => scrollTo('plataforma')}>Funcionalidades</a>
              <a onClick={() => scrollTo('como-funciona')}>Como funciona</a>
            </div>
            <div>
              <h5>Conta</h5>
              <a onClick={onLogin}>Entrar</a>
              <a onClick={onGetStarted}>Criar conta</a>
            </div>
            <div>
              <h5>Suporte</h5>
              <a href="#">FAQ</a>
              <a href="#">Contato</a>
              <a href="#">Termos</a>
            </div>
          </div>
        </div>

        <div className="dc-footer-bottom">
          © 2026 VesTibular Brasil. Feito com 💗 no Rio de Janeiro.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
