import './Sidebar.css';

const Sidebar = ({ user, profile, focus, currentView, onViewChange, collapsed, onToggle, mobileOpen, onLogout }) => {
  const getFocusLabel = () => {
    if (!focus) return 'Não definida';
    if (focus === 'ambos') return 'ENEM + UERJ';
    return focus.toUpperCase();
  };

  const displayName = profile?.apelido || profile?.nome_completo?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Estudante';
  const userInitial = displayName.charAt(0).toUpperCase();

  const navItems = [
    { id: 'inicio', label: 'Início', icon: '🏠', group: 'Principal' },
    { id: 'cronograma', label: 'Cronograma', icon: '📅', group: 'Principal' },
    { id: 'materias', label: 'Matérias', icon: '📖', group: 'Estudos' },
    { id: 'questoes', label: 'Questões', icon: '✍️', group: 'Estudos' },
    { id: 'simulados', label: 'Simulados', icon: '📝', group: 'Estudos' },
    { id: 'redacao', label: 'Redação', icon: '✒️', group: 'Estudos' },
    { id: 'desempenho', label: 'Desempenho', icon: '📊', group: 'Evolução' },
    { id: 'ranking', label: 'Simulados Semanais', icon: '🏆', group: 'Evolução' },
    ...(profile?.is_admin ? [{ id: 'admin', label: 'Painel Admin', icon: '⚙️', group: 'Admin' }] : []),
  ];

  const groups = profile?.is_admin
    ? ['Principal', 'Estudos', 'Evolução', 'Admin']
    : ['Principal', 'Estudos', 'Evolução'];

  const showFull = !collapsed || mobileOpen;

  return (
    <aside className={`sidebar ${!showFull ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        {showFull ? (
          <h2><span>V</span>es<span>T</span>ibular</h2>
        ) : (
          <h2 className="logo-mini"><span>V</span><span>T</span></h2>
        )}
      </div>

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
                  <span className="icon">{item.icon}</span>
                  {showFull && <span className="nav-label">{item.label}</span>}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
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
            </div>
          )}
        </div>
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
