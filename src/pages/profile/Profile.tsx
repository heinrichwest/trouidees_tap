import { useState } from 'react';
import UserCard from '../../components/cards/UserCard';
import EditProfile from './EditProfile';
import '../../styles/Profile.css';
import { logoutUser, deleteUser, reauthenticateUser } from '../../firebase/auth';

interface ProfileProps {
  user: any; // Firebase User object
  onLogout: () => void; // callback to update App state
}

export default function Profile({ user, onLogout }: ProfileProps) {
  const [editing, setEditing] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout();
    } catch (err) {
      console.error('Kon nie uitteken nie:', err);
      alert('Kon nie uitteken nie');
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      const confirmed = window.confirm(
        'Is jy seker jy wil jou rekening verwyder? Hierdie aksie kan nie ongedaan gemaak word nie.'
      );
      if (!confirmed) return;

      const password = window.prompt('Voer asseblief u huidige wagwoord in om die verwydering te bevestig:');
      if (!password) return;

      await reauthenticateUser(password);
      await deleteUser();

      alert('Jou rekening is uitgevee.');
      onLogout();
    } catch (err: any) {
      console.error('Kon nie gebruiker uitvee nie:', err);
      if (err.code === 'magtiging/verkeerde-wagwoord') {
        alert('Verkeerde wagwoord. Kan nie rekening uitvee nie.');
      } else if (err.code === 'magtiging/vereis-onlangse-aanmelding.') {
        alert('Meld asseblief weer aan om jou rekening te verwyder.');
      } else {
        alert('Kon nie rekening uitvee nie.');
      }
    }
  };

  if (!user) return <p>Geen gebruiker het aangemeld nie</p>;

  return (
    <div className="profile-page">
      {editing ? (
        <EditProfile user={user} onDone={() => setEditing(false)} />
      ) : (
        <>
          <UserCard user={user} />

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setEditing(true)}>Verander wagwoord</button>
            <button onClick={handleLogout} style={{ marginLeft: '0.5rem' }}>
              Teken uit
            </button>
            <button
              onClick={handleDelete}
              style={{ marginLeft: '0.5rem', color: 'red' }}
            >
              Vee rekening uit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
