import Navbar from './components/Navbar';
import FeaturesGrid from './components/FeaturesGrid';
import TechStack from './components/TechStack';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ background: '#0B192C', minHeight: '100vh', color: '#ffffff' }}>
      <Navbar />
      <main>
        <FeaturesGrid />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
}

export default App;
