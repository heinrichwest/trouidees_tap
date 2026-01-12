import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import "../../styles/Header.css";

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = () => {
    if (!user) return '??';
    const name = user.displayName || user.email || '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        {/* Logo (left) */}
        <div className="logo-section">
          <a
            href="#"
            className="logo-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            <span className="logo-bold">TROU</span>
            <span className="logo-script">idees</span>
          </a>
        </div>

        {/* Nav (center) */}
        <div className="nav-wrapper">
          <nav className="header-nav">
            <a href="#" className="nav-link" onClick={() => navigate('/')}>
              Tuis
            </a>
            <a href="#" className="nav-link" onClick={() => navigate('/courses')}>
              Kursusse
            </a>
            {user && (
              <a
                href="#"
                className="nav-link"
                onClick={() => navigate('/progress')}
              >
                My Vordering
              </a>
            )}
          </nav>
        </div>

        {/* User actions (right) */}
        {user && (
          <div className="user-actions">
            <div
              className="avatar"
              onClick={goToProfile}
              title={user.displayName || user.email}
            >
              {getInitials()}
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Teken Uit
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
