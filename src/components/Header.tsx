import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Header.css';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const handleLogout = async () => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      onLogout();
      return;
    }
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <a href="#" className="logo-link">
            <span className="logo-bold">TROU</span>
            <span className="logo-script">idees</span>
          </a>
        </div>
        
        <nav className="header-nav">
          <a href="#home" className="nav-link">Tuis</a>
          <a href="#courses" className="nav-link">Kursusse</a>
          <a href="#progress" className="nav-link">My Vordering</a>
          <a href="#resources" className="nav-link">Hulpbronne</a>
          {user && (
            <button onClick={handleLogout} className="nav-logout-button">
              Teken Uit
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

