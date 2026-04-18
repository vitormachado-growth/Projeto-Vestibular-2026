import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import SelectionScreen from './components/SelectionScreen';
import CourseSelectionScreen from './components/CourseSelectionScreen';
import Layout from './components/Layout';
import Cronograma from './components/Cronograma';
import Materias from './components/Materias';
import Questoes from './components/Questoes';
import Redacao from './components/Redacao';
import Simulado from './components/Simulado';
import Desempenho from './components/Desempenho';
import Ranking from './components/Ranking';
import Inicio from './components/Inicio';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [focus, setFocus] = useState(null);
  const [course, setCourse] = useState(null);
  const [currentView, setCurrentView] = useState('inicio');
  const [questoesFilter, setQuestoesFilter] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    if (saved !== null) return saved === 'true';
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('dark_mode', String(darkMode));
  }, [darkMode]);

  const handleLogin = () => {
    setUser({ name: 'Estudante', email: 'estudante@exemplo.com' });
  };

  const handleSelectFocus = (selectedFocus) => {
    setFocus(selectedFocus);
    setCourse(null);
  };

  const handleSelectCourse = (selectedCourse) => {
    setCourse(selectedCourse);
  };

  const handleBackToFocus = () => {
    setFocus(null);
    setCourse(null);
  };

  const navigateToSubjectQuestoes = (subject, topic = null) => {
    setQuestoesFilter({ subject, topic });
    setCurrentView('questoes');
  };

  const handleViewChange = (view) => {
    if (view !== 'questoes') setQuestoesFilter(null);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'inicio':
        return <Inicio onNavigate={handleViewChange} focus={focus} />;
      case 'materias':
        return (
          <Materias
            focus={focus}
            course={course}
            onPraticarMateria={navigateToSubjectQuestoes}
          />
        );
      case 'questoes':
        return <Questoes initialFilter={questoesFilter} />;
      case 'simulados':
        return <Simulado />;
      case 'desempenho':
        return <Desempenho />;
      case 'ranking':
        return <Ranking />;
      case 'redacao':
        return <Redacao />;
      case 'cronograma':
      default:
        return (
          <Cronograma
            focus={focus}
            course={course}
            onOpenQuestoes={navigateToSubjectQuestoes}
            onOpenRedacao={() => setCurrentView('redacao')}
          />
        );
    }
  };

  // 1. Visitor Flow (Non-logged in)
  if (!user) {
    if (showLogin) {
      return <LoginScreen onLogin={handleLogin} />;
    }
    return (
      <LandingPage
        onGetStarted={() => setShowLogin(true)}
        onLogin={() => setShowLogin(true)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      />
    );
  }

  // 2. Onboarding Flow (First tasks after login)
  if (!focus) {
    return <SelectionScreen onSelect={handleSelectFocus} />;
  }

  if ((focus === 'uerj' || focus === 'ambos') && !course) {
    return (
      <CourseSelectionScreen
        onSelect={handleSelectCourse}
        onBack={handleBackToFocus}
      />
    );
  }

  // 3. Main Dashboard Flow
  return (
    <Layout
      focus={focus}
      currentView={currentView}
      onViewChange={handleViewChange}
      darkMode={darkMode}
      onToggleDark={() => setDarkMode(d => !d)}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
