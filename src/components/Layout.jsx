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

const Layout = ({ children, focus, currentView, onViewChange, darkMode, onToggleDark }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    return saved === null ? true : saved === 'true';
  });

  const toggleCollapsed = () => {
    setCollapsed(c => {
      localStorage.setItem('sidebar_collapsed', String(!c));
      return !c;
    });
  };

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        focus={focus}
        currentView={currentView}
        onViewChange={onViewChange}
        collapsed={collapsed}
        onToggle={toggleCollapsed}
      />
      <div className="main-wrapper">
        <Navbar
          title={viewTitles[currentView] || 'Dashboard'}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
          onNavigate={onViewChange}
        />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
