import './MetricCards.css';

const METRICS = [
  {
    value: '100%',
    label: 'Native Fetch (No Axios)',
    tag: 'API Layer',
  },
  {
    value: '40',
    label: 'Documented GitHub Issues',
    tag: 'Full-Stack Plan',
  },
  {
    value: 'Bootstrap 5',
    label: 'Responsive & Accessible',
    tag: 'Design System',
  },
  {
    value: 'JWT + RBAC',
    label: 'Admin & User Roles',
    tag: 'Authentication',
  },
];

export default function MetricCards() {
  return (
    <section className="metric-cards-section" aria-label="Project Highlights">
      <div className="metric-cards-grid">
        {METRICS.map((item, index) => (
          <div className="metric-card" key={index}>
            <span className="metric-tag">{item.tag}</span>
            <h3 className="metric-value">{item.value}</h3>
            <p className="metric-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
