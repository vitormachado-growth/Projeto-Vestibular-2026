import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './LoginScreen.css';

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const LoginScreen = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const isSignUp = activeTab === 'signup';

  const translateError = (msg) => {
    const m = (msg || '').toLowerCase();
    if (m.includes('invalid login credentials')) return 'E-mail ou senha incorretos.';
    if (m.includes('email not confirmed')) return 'E-mail ou senha incorretos.';
    if (m.includes('user already registered')) return 'Este e-mail já está cadastrado.';
    if (m.includes('password should be at least')) return 'A senha deve ter pelo menos 6 caracteres.';
    if (m.includes('unable to validate email')) return 'E-mail inválido.';
    if (m.includes('network')) return 'Sem conexão. Verifique sua internet.';
    return msg || 'Algo deu errado. Tente novamente.';
  };

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setError(null);
    setSuccessMessage(null);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (isSignUp) {
      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setSuccessMessage('Cadastro realizado! Você já pode fazer login.');
        setPassword('');
        setConfirmPassword('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) {
      setError(translateError(err.message));
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-shell">
        {/* ── Left: branding ── */}
        <aside className="auth-brand">
          <button className="auth-back-btn" onClick={onBack} aria-label="Voltar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Voltar</span>
          </button>

          <div className="auth-brand-content">
            <div className="auth-logo">
              <span>V</span>es<span>T</span>ibular
            </div>

            <h1 className="auth-tagline">
              Sua aprovação começa com <em>organização</em>.
            </h1>

            <p className="auth-sub">
              Cronogramas, banco de questões e correção de redação para ENEM e UERJ 2026.
            </p>

            <ul className="auth-features">
              <li>
                <span className="auth-feat-icon">📚</span>
                <div>
                  <strong>+50k questões</strong>
                  <small>Banco completo com filtros inteligentes</small>
                </div>
              </li>
              <li>
                <span className="auth-feat-icon">📅</span>
                <div>
                  <strong>Cronograma adaptativo</strong>
                  <small>Sua rotina de estudos personalizada</small>
                </div>
              </li>
              <li>
                <span className="auth-feat-icon">✍️</span>
                <div>
                  <strong>Correção de redação</strong>
                  <small>Feedback detalhado nas 5 competências</small>
                </div>
              </li>
            </ul>
          </div>

          <div className="auth-brand-footer">
            © 2026 VesTibular · Feito para você passar.
          </div>
        </aside>

        {/* ── Right: form ── */}
        <main className="auth-panel">
          <button className="auth-back-btn mobile" onClick={onBack} aria-label="Voltar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Voltar</span>
          </button>

          <div className="auth-form-wrap">
            <header className="auth-form-header">
              <h2>{isSignUp ? 'Crie sua conta' : 'Bem-vindo de volta'}</h2>
              <p>
                {isSignUp
                  ? 'Comece sua jornada rumo à aprovação em minutos.'
                  : 'Entre para continuar seus estudos de onde parou.'}
              </p>
            </header>

            <div className="auth-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={!isSignUp}
                className={`auth-tab ${!isSignUp ? 'active' : ''}`}
                onClick={() => switchTab('login')}
              >
                Entrar
              </button>
              <button
                role="tab"
                aria-selected={isSignUp}
                className={`auth-tab ${isSignUp ? 'active' : ''}`}
                onClick={() => switchTab('signup')}
              >
                Cadastrar
              </button>
              <div className={`auth-tab-indicator ${isSignUp ? 'right' : 'left'}`} />
            </div>

            {error && (
              <div className="auth-alert error" role="alert">
                <span className="auth-alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="auth-alert success" role="status">
                <span className="auth-alert-icon">✓</span>
                <span>{successMessage}</span>
              </div>
            )}

            <button
              className="auth-google-btn"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              type="button"
            >
              {googleLoading ? (
                <span className="auth-spinner" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.2 0 19-7.4 19-19.5 0-1.2-.1-2.4-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8C14.7 15.3 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.1z" />
                  <path fill="#4CAF50" d="M24 43.5c5 0 9.4-1.9 12.8-5l-5.9-5c-2 1.4-4.4 2.2-6.9 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39 16.3 43.5 24 43.5z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.5l5.9 5c-.4.4 6.5-4.7 6.5-14 0-1.2-.1-2.4-.4-3.5z" />
                </svg>
              )}
              <span>{googleLoading ? 'Conectando…' : 'Continuar com Google'}</span>
            </button>

            <div className="auth-divider"><span>ou com e-mail</span></div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {isSignUp && (
                <div className="auth-field">
                  <label htmlFor="name">Nome completo</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <div className="auth-field-label-row">
                  <label htmlFor="password">Senha</label>
                  {!isSignUp && (
                    <a href="#forgot" className="auth-forgot">Esqueceu?</a>
                  )}
                </div>
                <div className="auth-input-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    placeholder={isSignUp ? 'Mínimo 6 caracteres' : '••••••••'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={isSignUp ? 6 : undefined}
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="auth-field">
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <div className="auth-input-wrap">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Repita a senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-input-toggle"
                      onClick={() => setShowConfirm(v => !v)}
                      aria-label={showConfirm ? 'Ocultar senha' : 'Mostrar senha'}
                      tabIndex={-1}
                    >
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" className="auth-submit" disabled={loading || googleLoading}>
                {loading ? (
                  <><span className="auth-spinner" /> Processando…</>
                ) : (
                  isSignUp ? 'Criar minha conta' : 'Entrar'
                )}
              </button>
            </form>

            <p className="auth-switch-hint">
              {isSignUp ? 'Já tem uma conta? ' : 'Ainda não tem conta? '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => switchTab(isSignUp ? 'login' : 'signup')}
              >
                {isSignUp ? 'Entrar' : 'Cadastre-se grátis'}
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginScreen;
