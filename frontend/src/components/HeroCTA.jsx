import { Link } from 'react-router-dom';
import './HeroCTA.css';

export default function HeroCTA() {
  return (
    <div className="hero-cta-group" role="group" aria-label="Hero Call to Actions">
      <Link to="/dashboard" className="btn-cta btn-cta-primary">
        <svg
          className="bi bi-play-circle-fill cta-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
        </svg>
        <span>Explore Live Dashboard</span>
      </Link>

      <Link to="/register" className="btn-cta btn-cta-secondary">
        <span>Create Account</span>
      </Link>
    </div>
  );
}
