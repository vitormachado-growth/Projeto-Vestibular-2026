import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import ProfileSetupScreen from './components/ProfileSetupScreen';
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
import Admin from './components/Admin';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        setUser(session?.user ?? null);
        setLoading(false);
        if (window.location.search.includes('code=')) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      } else {
        setUser(session?.user ?? null);
        if (session?.user) setShowLogin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch profile when user logs in / out
  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    setProfileLoading(true);
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setProfile(data || null);
        setProfileLoading(false);
      });
    return () => { cancelled = true; };
  }, [user?.id]);

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
    setProfile(null);
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
      case 'admin':
        return profile?.is_admin ? <Admin /> : <Inicio onNavigate={handleViewChange} focus={focus} />;
      case 'cronograma':
        return (
          <Cronograma
            focus={focus}
            course={course}
            onOpenQuestoes={navigateToSubjectQuestoes}
            onOpenRedacao={() => setCurrentView('redacao')}
          />
        );
      default:
        return <Inicio onNavigate={handleViewChange} focus={focus} />;
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
      return <LoginScreen onBack={() => setShowLogin(false)} />;
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

  // 2a. Profile setup (new registration step)
  if (profileLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <ProfileSetupScreen
        user={user}
        onComplete={setProfile}
        onLogout={handleLogout}
      />
    );
  }

  // 2b. Onboarding Flow (First tasks after login)
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
      onNavigateToSubject={navigateToSubjectQuestoes}
      darkMode={darkMode}
      onToggleDark={() => setDarkMode(d => !d)}
      user={user}
      profile={profile}
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
