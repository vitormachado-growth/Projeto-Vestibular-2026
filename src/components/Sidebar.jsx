import './Sidebar.css';

const Icon = ({ name }) => {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (name) {
    case 'inicio':
      return (
        <svg {...common}>
          <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2V9.5z" />
        </svg>
      );
    case 'cronograma':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );
    case 'materias':
      return (
        <svg {...common}>
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5a2.5 2.5 0 0 0 0 5H20" />
          <path d="M4 4.5V19a2.5 2.5 0 0 0 2.5 2.5" />
        </svg>
      );
    case 'questoes':
      return (
        <svg {...common}>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case 'simulados':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h4" />
        </svg>
      );
    case 'redacao':
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      );
    case 'desempenho':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <rect x="7"  y="12" width="3" height="6" rx="0.5" />
          <rect x="12" y="8"  width="3" height="10" rx="0.5" />
          <rect x="17" y="5"  width="3" height="13" rx="0.5" />
        </svg>
      );
    case 'ranking':
      return (
        <svg {...common}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
          <path d="M17 6h3a2 2 0 0 1 0 4h-3M7 6H4a2 2 0 0 0 0 4h3" />
        </svg>
      );
    case 'admin':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
};

const Sidebar = ({ user, profile, focus, currentView, onViewChange, collapsed, onToggle, mobileOpen, onLogout }) => {
  const getFocusLabel = () => {
    if (!focus) return 'Não definida';
    if (focus === 'ambos') return 'ENEM + UERJ';
    return focus.toUpperCase();
  };

  const displayName = profile?.apelido || profile?.nome_completo?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Estudante';
  const userInitial = displayName.charAt(0).toUpperCase();

  const navItems = [
    { id: 'inicio',     label: 'Início',              group: 'Principal' },
    { id: 'cronograma', label: 'Cronograma',          group: 'Principal' },
    { id: 'materias',   label: 'Matérias',            group: 'Estudos'   },
    { id: 'questoes',   label: 'Questões',            group: 'Estudos'   },
    { id: 'simulados',  label: 'Simulados',           group: 'Estudos'   },
    { id: 'redacao',    label: 'Redação',             group: 'Estudos'   },
    { id: 'desempenho', label: 'Desempenho',          group: 'Evolução'  },
    { id: 'ranking',    label: 'Simulados Semanais',  group: 'Evolução'  },
    ...(profile?.is_admin ? [{ id: 'admin', label: 'Painel Admin', group: 'Admin' }] : []),
  ];

  const groups = profile?.is_admin
    ? ['Principal', 'Estudos', 'Evolução', 'Admin']
    : ['Principal', 'Estudos', 'Evolução'];

  const showFull = !collapsed || mobileOpen;

  return (
    <aside className={`sidebar ${!showFull ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <button className="sidebar-logo-btn" onClick={() => onViewChange('inicio')} title="Ir para o Início">
        {showFull ? (
          <h2><span>V</span>es<span>T</span>ibular</h2>
        ) : (
          <span className="logo-mark" aria-label="VesTibular">
            <span className="logo-mark-text">VT</span>
            <svg
              className="logo-mark-cap"
              width="26"
              height="20"
              viewBox="0 0 32 28"
              fill="none"
              aria-hidden="true"
            >
              <path d="M16 3 L30 11 L16 19 L2 11 Z" fill="currentColor" />
              <path
                d="M7 14 L7 19 C7 21.2 10.5 22.5 16 22.5 C21.5 22.5 25 21.2 25 19 L25 14 L16 19 Z"
                fill="currentColor"
              />
              <path
                d="M30 11 L30 18.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="30" cy="20.5" r="1.8" fill="currentColor" />
            </svg>
          </span>
        )}
      </button>

      <button className="collapse-btn" onClick={onToggle} title={collapsed ? 'Expandir' : 'Recolher'}>
        {collapsed ? '›' : '‹'}
      </button>

      <nav className="sidebar-nav">
        {showFull && (
          <div className="focus-badge">
            <span>Meta: {getFocusLabel()}</span>
          </div>
        )}
        {groups.map(grupo => {
          const items = navItems.filter(i => i.group === grupo);
          return (
            <div key={grupo} className="nav-group">
              {showFull && <label>{grupo}</label>}
              {items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                  onClick={() => onViewChange(item.id)}
                  title={!showFull ? item.label : ''}
                >
                  <span className="icon"><Icon name={item.id} /></span>
                  {showFull && <span className="nav-label">{item.label}</span>}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          className={`user-profile ${currentView === 'perfil' ? 'active' : ''}`}
          onClick={() => onViewChange('perfil')}
          title={!showFull ? 'Editar perfil' : 'Editar perfil'}
        >
          <div className="avatar">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={displayName} />
            ) : (
              userInitial
            )}
          </div>
          {showFull && (
            <div className="user-info">
              <p className="name">{displayName}</p>
              <span className="user-sub">Editar perfil</span>
            </div>
          )}
        </button>
        <button className="logout-btn" onClick={onLogout} title="Sair">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          {showFull && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
