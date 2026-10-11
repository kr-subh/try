import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function LandingPage() {
  return (
    <main style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#0B192C', minHeight: 'calc(100vh - 70px)', color: '#ffffff' }}>
      <h1>xSTUDENT</h1>
      <p style={{ color: '#94a3b8' }}>Student Management System</p>
    </main>
  );
}

function DashboardPlaceholder() {
  return (
    <main style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#0B192C', minHeight: 'calc(100vh - 70px)', color: '#ffffff' }}>
      <h1>Dashboard</h1>
      <p style={{ color: '#94a3b8' }}>Protected dashboard area</p>
    </main>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/register" element={<LandingPage />} />

        {/* Protected Application Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
