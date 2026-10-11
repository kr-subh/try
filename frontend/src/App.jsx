import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroCTA from './components/HeroCTA';

function App() {
  return (
    <div>
      <Navbar />
      <Hero>
        <HeroCTA />
      </Hero>
    </div>
  );
}

export default App;
