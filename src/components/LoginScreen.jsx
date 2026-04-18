import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const isSignUp = activeTab === 'signup';

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError(null);
    setSuccessMessage(null);
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (isSignUp && password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setSuccessMessage('Cadastro realizado! Verifique seu e-mail para confirmar a conta.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <h2><span>V</span>es<span>T</span>ibular</h2>
          </div>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Entrar
          </button>
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => switchTab('signup')}
          >
            Cadastrar
          </button>
        </div>

        <div className="auth-tab-subtitle">
          {isSignUp
            ? 'Comece sua jornada rumo à aprovação hoje.'
            : 'Acesse sua conta para continuar seus estudos.'}
        </div>

        {error && <div className="login-error-message">{error}</div>}
        {successMessage && <div className="login-success-message">{successMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {!isSignUp && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Lembrar de mim
              </label>
              <a href="#forgot" className="forgot-password">Esqueceu a senha?</a>
            </div>
          )}

          <button type="submit" className="login-btn-primary" disabled={loading}>
            {loading ? 'Processando...' : (isSignUp ? 'Criar conta' : 'Entrar')}
          </button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button className="google-login-btn" onClick={handleGoogleLogin} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
          <span>{isSignUp ? 'Cadastrar com Google' : 'Entrar com Google'}</span>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
