import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import EditStudent from './pages/EditStudent';
import NotFound from './pages/NotFound';

function LandingPage() {
  return (
    <div style={{ background: '#0B192C', minHeight: '100vh', color: '#ffffff' }}>
      <Navbar />
      <main style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <h1>xSTUDENT</h1>
        <p style={{ color: '#94a3b8' }}>Student Management System</p>
      </main>
    </div>
  );
}

function DashboardPlaceholder() {
  return (
    <div>
      <h2 style={{ margin: '0 0 1rem', color: '#f8fafc' }}>Dashboard Overview</h2>
      <p style={{ color: '#94a3b8' }}>
        Welcome to the student management system dashboard.
      </p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/register" element={<LandingPage />} />

      {/* Authenticated Application with Shared AppLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
          <Route path="/students" element={<DashboardPlaceholder />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
          <Route path="/profile" element={<DashboardPlaceholder />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
