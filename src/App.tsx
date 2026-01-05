import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { createOrUpdateUserProfile } from './utils/userService';
import Header from './components/Header';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Courses from './components/Courses';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCourses, setShowCourses] = useState(false);

  useEffect(() => {
    console.log('App useEffect running, auth:', auth);
    if (!auth) {
      console.error('Firebase auth is not initialized');
      setLoading(false);
      return;
    }

    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed:', currentUser);
      
      if (currentUser) {
        // User is logged in, create/update their profile in Firestore
        try {
          await createOrUpdateUserProfile(
            currentUser.uid,
            currentUser.email || '',
            currentUser.displayName || undefined
          );
        } catch (error) {
          console.error('Failed to create/update user profile:', error);
        }
      }
      
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const handleLoginSuccess = () => {
    // Auth state will be updated by onAuthStateChanged
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Laai...</p>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="app">
        <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ color: '#5C1225', marginBottom: '1rem' }}>Trou Idees Leerplatform</h1>
          <div style={{ 
            background: '#F9E3E8', 
            padding: '1.5rem', 
            borderRadius: '8px',
            border: '2px solid #C48A7A',
            color: '#5C1225'
          }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: '600' }}>⚠️ Firebase is nie geïnitialiseer nie</p>
            <p style={{ fontSize: '0.9rem' }}>
              Maak seker dat jou .env lêer korrek is en dat alle Firebase omgewing veranderlikes ingestel is.
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log('App rendering, user:', user, 'loading:', loading, 'auth:', auth);

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="main-content">
        {!user ? (
          showCourses ? (
            <Courses onBack={() => setShowCourses(false)} />
          ) : (
            <HomePage 
              onBrowseCourses={() => setShowCourses(true)}
              onRegister={() => {/* Handle registration */}}
            />
          )
        ) : (
          <Courses />
        )}
      </main>
    </div>
  );
}

export default App;
