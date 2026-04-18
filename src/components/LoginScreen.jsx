import React from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <h2><span>V</span>es<span>T</span>ibular</h2>
          </div>
          <h1>Bem-vindo de volta!</h1>
          <p>Acesse sua conta para continuar seus estudos.</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="seu@email.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Lembrar de mim
            </label>
            <a href="#forgot" className="forgot-password">Esqueceu a senha?</a>
          </div>

          <button className="login-btn-primary" onClick={onLogin}>
            Entrar
          </button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button className="google-login-btn" onClick={onLogin}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
          <span>Entrar com Google</span>
        </button>

        <p className="login-footer">
          Não tem uma conta? <a href="#signup">Crie uma agora</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
