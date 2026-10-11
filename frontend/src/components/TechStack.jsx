import './TechStack.css';

const TECH_ITEMS = [
  { name: 'React 19', category: 'Frontend' },
  { name: 'Vite 8', category: 'Bundler' },
  { name: 'Bootstrap 5.3', category: 'CSS System' },
  { name: 'Express 5', category: 'Backend' },
  { name: 'MongoDB Atlas', category: 'Database' },
  { name: 'JWT & RBAC', category: 'Auth' },
  { name: 'Native Fetch', category: 'No Axios' },
  { name: 'Pure Vanilla JS', category: 'No jQuery' },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="tech-section" aria-label="Technology Stack">
      <div className="tech-container">
        <h3 className="tech-heading">Modern Full-Stack Architecture</h3>
        <p className="tech-subheading">Built strictly according to project specifications</p>

        <div className="tech-badge-strip">
          {TECH_ITEMS.map((item, idx) => (
            <div className="tech-badge" key={idx}>
              <span className="tech-name">{item.name}</span>
              <span className="tech-category">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
