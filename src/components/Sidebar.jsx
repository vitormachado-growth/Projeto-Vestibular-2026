import './Sidebar.css';

const Sidebar = ({ user, focus, currentView, onViewChange, collapsed, onToggle, onLogout }) => {
  const getFocusLabel = () => {
    if (!focus) return 'Não definida';
    if (focus === 'ambos') return 'ENEM + UERJ';
    return focus.toUpperCase();
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'E';

  const navItems = [
    { id: 'inicio', label: 'Início', icon: '🏠', group: 'Principal' },
    { id: 'cronograma', label: 'Cronograma', icon: '📅', group: 'Principal' },
    { id: 'materias', label: 'Matérias', icon: '📖', group: 'Estudos' },
    { id: 'questoes', label: 'Questões', icon: '✍️', group: 'Estudos' },
    { id: 'simulados', label: 'Simulados', icon: '📝', group: 'Estudos' },
    { id: 'redacao', label: 'Redação', icon: '✒️', group: 'Estudos' },
    { id: 'desempenho', label: 'Desempenho', icon: '📊', group: 'Evolução' },
    { id: 'ranking', label: 'Simulados Semanais', icon: '🏆', group: 'Evolução' },
  ];

  const groups = ['Principal', 'Estudos', 'Evolução'];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        {collapsed ? (
          <h2 className="logo-mini"><span>V</span><span>T</span></h2>
        ) : (
          <h2><span>V</span>es<span>T</span>ibular</h2>
        )}
      </div>

      <button className="collapse-btn" onClick={onToggle} title={collapsed ? 'Expandir' : 'Recolher'}>
        {collapsed ? '›' : '‹'}
      </button>

      {!collapsed && (
        <div className="focus-badge">
          <span>Meta: {getFocusLabel()}</span>
        </div>
      )}

      <nav className="sidebar-nav">
        {groups.map(grupo => {
          const items = navItems.filter(i => i.group === grupo);
          return (
            <div key={grupo} className="nav-group">
              {!collapsed && <label>{grupo}</label>}
              {items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                  onClick={() => onViewChange(item.id)}
                  title={collapsed ? item.label : ''}
                >
                  <span className="icon">{item.icon}</span>
                  {!collapsed && <span className="nav-label">{item.label}</span>}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">{userInitial}</div>
          {!collapsed && (
            <div className="user-info">
              <p className="name">{user?.email?.split('@')[0] || 'Estudante'}</p>
              <button className="logout-link" onClick={onLogout}>Sair</button>
            </div>
          )}
          {collapsed && (
             <button className="logout-mini-btn" onClick={onLogout} title="Sair">🚪</button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
