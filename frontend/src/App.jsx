import Navbar from './components/Navbar';
import MetricCards from './components/MetricCards';

function App() {
  return (
    <div style={{ background: '#0B192C', minHeight: '100vh', color: '#ffffff' }}>
      <Navbar />
      <main style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>xSTUDENT</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Student Management System</p>
        <MetricCards />
      </main>
    </div>
  );
}

export default App;
