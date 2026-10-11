import Navbar from './components/Navbar';
import HeroCTA from './components/HeroCTA';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '3rem 1.5rem', fontFamily: 'sans-serif', textAlign: 'center', background: '#0B192C', minHeight: 'calc(100vh - 70px)' }}>
        <h1 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>xSTUDENT</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Student Management System</p>
        <HeroCTA />
      </main>
    </div>
  );
}

export default App;
