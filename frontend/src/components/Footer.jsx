import './Footer.css';

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">xSTUDENT</span>
            <p className="footer-tagline">
              Modern Full-Stack Student Management System
            </p>
          </div>

          <div className="footer-meta">
            <p className="footer-assignment">
              <strong>College Assignment 4</strong> • Full-Stack CRUD Application
            </p>
            <p className="footer-lead">
              Project Lead: <span className="highlight-lead">Prince Kumar</span>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {CURRENT_YEAR} xSTUDENT. All rights reserved.
          </p>
          <a
            href="https://github.com/princecherry9905/try"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github-link"
          >
            GitHub Repository &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
