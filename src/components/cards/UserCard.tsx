import "../../styles/UserCard.css";
interface UserCardProps {
  user: any; // Firebase User object
}

export default function UserCard({ user }: UserCardProps) {
  if (!user) return null;

  return (
    <div className="user-card">
      <h3>User Info</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Display Name:</strong> {user.displayName || 'No display name set'}</p>
    </div>
  );
}
