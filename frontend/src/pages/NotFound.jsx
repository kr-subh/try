import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main
      style={{
        padding: '5rem 1.5rem',
        textAlign: 'center',
        background: '#0B192C',
        minHeight: 'calc(100vh - 70px)',
        color: '#ffffff',
      }}
    >
      <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem', color: '#38bdf8' }}>404</h1>
      <h2 style={{ fontSize: '1.75rem', margin: '0 0 1rem', color: '#f8fafc' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.75rem',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
        }}
      >
        Return to Home
      </Link>
    </main>
  );
}
