import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Login.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!auth) {
      setError('Firebase is not initialized. Please check your configuration.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      let errorMessage = 'An error occurred. Please try again.';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'Gebruiker nie gevind nie. Probeer om \'n rekening te skep.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Verkeerde wagwoord. Probeer weer.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Hierdie e-pos word reeds gebruik. Teken eerder in.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Wagwoord is te swak. Gebruik minstens 6 karakters.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Ongeldige e-pos adres.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Verkeerde e-pos of wagwoord. Probeer weer of skep \'n nuwe rekening.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welkom by Trou Idees</h2>
          <p className="login-tagline">Gratis toegang tot ons kursusse en leerhulpbronne</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-pos</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jou@epos.co.za"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Wagwoord</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Versteek wagwoord" : "Wys wagwoord"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Wag asseblief...' : isLogin ? 'Teken In' : 'Skep Rekening'}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="toggle-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin
              ? "Nog nie 'n rekening nie? Skep een"
              : 'Het jy reeds \'n rekening? Teken in'}
          </button>
        </div>
      </div>
    </div>
  );
}

