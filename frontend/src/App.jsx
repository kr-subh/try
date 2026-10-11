import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroCTA from './components/HeroCTA';
import MetricCards from './components/MetricCards';
import FeaturesGrid from './components/FeaturesGrid';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function LandingPage() {
  return (
    <>
      <main>
        <Hero>
          <HeroCTA />
        </Hero>
        <MetricCards />
        <FeaturesGrid />
        <TechStack />
      </main>
      <Footer />
    </>
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
    <div style={{ background: '#0B192C', minHeight: '100vh', color: '#ffffff' }}>
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
