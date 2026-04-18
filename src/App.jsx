import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
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
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  
  // Persist focus and course
  const [focus, setFocus] = useState(() => localStorage.getItem('study_focus'));
  const [course, setCourse] = useState(() => localStorage.getItem('study_course'));
  
  const [currentView, setCurrentView] = useState('inicio');
  const [questoesFilter, setQuestoesFilter] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    if (saved !== null) return saved === 'true';
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  useEffect(() => {
    console.log('Auth state initializing...');
    
    // 1. Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'User Found' : 'No User');
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth change event:', _event, 'User:', session?.user?.email);
      setUser(session?.user ?? null);
      if (session) setShowLogin(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('dark_mode', String(darkMode));
  }, [darkMode]);

  // Sync focus/course with localStorage
  useEffect(() => {
    if (focus) localStorage.setItem('study_focus', focus);
    else localStorage.removeItem('study_focus');
  }, [focus]);

  useEffect(() => {
    if (course) localStorage.setItem('study_course', course);
    else localStorage.removeItem('study_course');
  }, [course]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('study_focus');
    localStorage.removeItem('study_course');
    setUser(null);
    setFocus(null);
    setCourse(null);
    setCurrentView('inicio');
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

  // 0. Loading Screen
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Carregando VesTibular...</p>
      </div>
    );
  }

  // 1. Visitor Flow (Non-logged in)
  if (!user || !user.id) {
    if (showLogin) {
      return <LoginScreen onLogin={() => setShowLogin(false)} />;
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
    return <SelectionScreen onSelect={handleSelectFocus} onLogout={handleLogout} />;
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
      user={user}
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
