import { useState, useEffect, useRef } from 'react';
import {
  gerarNotificacoes, getNotificacoesLidas,
  marcarLida, marcarTodasLidas,
  solicitarPermissaoBrowser, enviarNotificacaoBrowser,
} from '../utils/notificacoes';
import './Navbar.css';

const TIPO_COR = {
  alerta:  { bg: '#fef2f2', border: '#fca5a5', dot: '#ef4444' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6' },
  revisar: { bg: '#fefce8', border: '#fde68a', dot: '#f59e0b' },
  sucesso: { bg: '#f0fdf4', border: '#bbf7d0', dot: '#16a34a' },
};

const TIPO_COR_DARK = {
  alerta:  { bg: '#3b1010', border: '#7f1d1d', dot: '#ef4444' },
  info:    { bg: '#1e3a5f', border: '#1d4ed8', dot: '#60a5fa' },
  revisar: { bg: '#3b2500', border: '#78350f', dot: '#f59e0b' },
  sucesso: { bg: '#052e16', border: '#14532d', dot: '#16a34a' },
};

export default function Navbar({ title, darkMode, onToggleDark, onNavigate, onMenuToggle }) {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [lidas, setLidas] = useState([]);
  const [permissao, setPermissao] = useState(() => {
    try { return (typeof Notification !== 'undefined') ? Notification.permission : 'unsupported'; }
    catch { return 'unsupported'; }
  });
  const ref = useRef(null);

  useEffect(() => {
    const todas = gerarNotificacoes();
    setNotifs(todas);
    setLidas(getNotificacoesLidas());
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const naoLidas = notifs.filter(n => !lidas.includes(n.id));

  function handleOpen() {
    setOpen(o => !o);
  }

  function handleLer(notif) {
    marcarLida(notif.id);
    setLidas(getNotificacoesLidas());
    if (notif.rota && onNavigate) {
      onNavigate(notif.rota);
      setOpen(false);
    }
  }

  function handleLerTodas() {
    marcarTodasLidas(notifs.map(n => n.id));
    setLidas(notifs.map(n => n.id));
  }

  async function handlePermissao() {
    const result = await solicitarPermissaoBrowser();
    setPermissao(result);
    if (result === 'granted') {
      enviarNotificacaoBrowser('Notificações ativadas!', 'Você receberá lembretes de estudo enquanto o app estiver aberto.');
    }
  }

  const cores = darkMode ? TIPO_COR_DARK : TIPO_COR;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Abrir menu">
          ☰
        </button>
        <h1>{title}</h1>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="O que você quer estudar hoje?" />
        </div>

        <div className="navbar-actions">
          {/* ── Sino ──────────────────────────────────────────────────────── */}
          <div className="notif-wrap" ref={ref}>
            <button
              className="icon-btn notif-btn"
              onClick={handleOpen}
              title="Notificações"
            >
              🔔
              {naoLidas.length > 0 && (
                <span className="notif-badge">{naoLidas.length}</span>
              )}
            </button>

            {open && (
              <div className="notif-panel">
                <div className="notif-panel-header">
                  <span>Notificações</span>
                  {naoLidas.length > 0 && (
                    <button className="notif-marcar-todas" onClick={handleLerTodas}>
                      Marcar todas como lidas
                    </button>
                  )}
                </div>

                {/* Permissão browser */}
                {permissao === 'default' && (
                  <button className="notif-permissao-btn" onClick={handlePermissao}>
                    🔔 Ativar notificações do navegador
                  </button>
                )}
                {permissao === 'denied' && (
                  <p className="notif-permissao-negada">
                    Notificações bloqueadas pelo navegador. Habilite nas configurações do site.
                  </p>
                )}

                <div className="notif-list">
                  {notifs.length === 0 && (
                    <p className="notif-vazia">Nenhuma notificação no momento.</p>
                  )}
                  {notifs.map(n => {
                    const lida = lidas.includes(n.id);
                    const c = cores[n.tipo] || cores.info;
                    return (
                      <button
                        key={n.id}
                        className={`notif-item ${lida ? 'lida' : ''}`}
                        style={!lida ? { background: c.bg, borderColor: c.border } : {}}
                        onClick={() => handleLer(n)}
                      >
                        <span className="notif-item-icone">{n.icone}</span>
                        <div className="notif-item-body">
                          <div className="notif-item-titulo">
                            {!lida && <span className="notif-dot" style={{ background: c.dot }} />}
                            {n.titulo}
                          </div>
                          <p className="notif-item-corpo">{n.corpo}</p>
                        </div>
                        {n.rota && <span className="notif-seta">→</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            className="icon-btn dark-toggle"
            onClick={onToggleDark}
            title={darkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="premium-btn">Seja Premium</button>
        </div>
      </div>
    </nav>
  );
}
