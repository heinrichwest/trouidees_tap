import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // <-- updated path
import Header from './components/layout/Header';
import { useAuth } from './hooks/useAuth';
import './App.css';

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Laai...</p>
      </div>
    );
  }

  return (
    <Router>
      <Header user={user} onLogout={logout} />
      <main className="main-content">
        <AppRoutes />
      </main>
    </Router>
  );
};

export default App;
