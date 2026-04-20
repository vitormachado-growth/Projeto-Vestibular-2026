import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

const viewTitles = {
  inicio: 'Início',
  cronograma: 'Cronograma',
  materias: 'Matérias',
  questoes: 'Questões',
  simulados: 'Simulados',
  redacao: 'Redação',
  desempenho: 'Desempenho',
  ranking: 'Simulados Semanais',
};

const Layout = ({ children, focus, currentView, onViewChange, darkMode, onToggleDark, user, profile, onLogout }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === null ? true : saved === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(c => {
      localStorage.setItem('sidebar_collapsed', String(!c));
      return !c;
    });
  };

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}
      <Sidebar
        focus={focus}
        currentView={currentView}
        onViewChange={(v) => { onViewChange(v); setMobileOpen(false); }}
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        mobileOpen={mobileOpen}
        user={user}
        profile={profile}
        onLogout={onLogout}
      />
      <div className="main-wrapper">
        <Navbar
          title={viewTitles[currentView] || 'Dashboard'}
          darkMode={darkMode}
          onToggleDark={onToggleDark}
          onNavigate={onViewChange}
          onMenuToggle={() => setMobileOpen(o => !o)}
        />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
