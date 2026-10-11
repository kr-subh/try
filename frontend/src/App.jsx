import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Navbar from './components/Navbar';
import HeroCTA from './components/HeroCTA';
import Login from './pages/Login';
import Register from './pages/Register';

function LandingPage() {
  return (
    <main style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#0B192C', minHeight: 'calc(100vh - 70px)', color: '#ffffff' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>xSTUDENT</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Student Management System</p>
      <HeroCTA />
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <div style={{ background: '#070F1E', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
