import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroCTA from './components/HeroCTA';
import MetricCards from './components/MetricCards';
import FeaturesGrid from './components/FeaturesGrid';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import NotFound from './pages/NotFound';

function LandingPage() {
  return (
    <div style={{ background: '#0B192C', minHeight: '100vh', color: '#ffffff' }}>
      <Navbar />
      <main>
        <Hero>
          <HeroCTA />
        </Hero>
        <MetricCards />
        <FeaturesGrid />
        <TechStack />
      </main>
      <Footer />
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
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Application with Shared AppLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPlaceholder />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/new" element={<AddStudent />} />
            <Route path="/students/:id/edit" element={<EditStudent />} />
            <Route path="/profile" element={<DashboardPlaceholder />} />
          </Route>
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
