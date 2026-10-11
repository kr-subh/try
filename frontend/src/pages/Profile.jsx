import { useAuth } from '../hooks/useAuth';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();

  const currentUser = user || {
    name: 'Admin User',
    email: 'admin@college.edu',
    role: 'admin',
    id: 'ADMIN-ROOT',
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">User Account Profile</h1>
        <p className="profile-subtitle">
          View your authenticated account credentials and institutional privileges.
        </p>
      </div>

      <div className="profile-card">
        <div className="profile-user-summary">
          <div className="profile-avatar">
            {(currentUser.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="profile-summary-text">
            <h2>{currentUser.name}</h2>
            <span className="profile-badge-role">{currentUser.role || 'user'}</span>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{currentUser.name}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Institutional Email</span>
            <span className="detail-value">{currentUser.email}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Assigned Role</span>
            <span className="detail-value capitalize">{currentUser.role || 'user'}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Account Identifier</span>
            <span className="detail-value">
              <code>{currentUser.id || currentUser._id || 'Verified'}</code>
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Institution</span>
            <span className="detail-value">xSTUDENT Academic Administration</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Security Status</span>
            <span className="detail-value status-active">JWT Authenticated &bull; Active</span>
          </div>
        </div>

        <div className="profile-footer-actions">
          <button type="button" className="btn-profile-logout" onClick={logout}>
            Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  );
}
