import { useState } from 'react';
import '../../styles/EditProfile.css';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

interface EditProfileProps {
  user: any;
  onDone: () => void;
}

export default function EditProfile({ user, onDone }: EditProfileProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Regex for strong password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleSave = async () => {
    if (!user) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Vul asseblief alle velde in.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Nuwe wagwoord en bevestiging stem nie ooreen nie.');
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      alert(
        'Die wagwoord moet ten minste 8 karakters lank wees en hoofletters, kleinletters, syfers en spesiale karakters insluit.'
      );
      return;
    }

    try {
      setLoading(true);

      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      alert('Wagwoord is suksesvol opgedateer!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onDone();
    } catch (err: any) {
      console.error('Kon nie wagwoord opdateer nie:', err);
      if (err.code === 'magtiging/verkeerde-wagwoord') {
        alert('Huidige wagwoord is verkeerd.');
      } else if (err.code === 'magtiging/swak-wagwoord') {
        alert('Nuwe wagwoord is te swak. Gebruik ten minste 8 karakters, hoofletters, kleinletters, syfer en spesiale karakter.');
      } else {
        alert(err.message || 'Kon nie wagwoord opdateer nie.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Verander wagwoord</h2>

      <input
        type="Wagwoord"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Huidige wagwoord"
      />
      <input
        type="Wagwoord"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nuwe wagwoord"
      />
      <input
        type="Wagwoord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Bevestig nuwe wagwoord"
      />

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Spaar...' : 'Red'}
        </button>
        <button onClick={onDone} style={{ marginLeft: '0.5rem' }}>
          Kanselleer
        </button>
      </div>
    </div>
  );
}
