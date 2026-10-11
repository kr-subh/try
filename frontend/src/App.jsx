import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroCTA from './components/HeroCTA';
import MetricCards from './components/MetricCards';
import FeaturesGrid from './components/FeaturesGrid';
import TechStack from './components/TechStack';
import Footer from './components/Footer';

function App() {
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

export default App;
