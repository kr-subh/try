import './FeaturesGrid.css';

const FEATURES = [
  {
    title: 'Full-Stack CRUD',
    description: 'Create, read, update, and delete student records seamlessly with verified Express backend endpoints and MongoDB persistence.',
    icon: (
      <svg className="feature-icon" viewBox="0 0 16 16" fill="currentColor">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
      </svg>
    ),
  },
  {
    title: 'Role-Based Access (RBAC)',
    description: 'Enforces Admin and Student roles. Admin users manage courses and records, while students view attendance and personal profile details.',
    icon: (
      <svg className="feature-icon" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m0 1.066c3.83 0 6.934 3.104 6.934 6.934s-3.104 6.934-6.934 6.934S1.066 11.83 1.066 8 4.17 1.066 8 1.066"/>
        <path d="M8 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-3 7c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5z"/>
      </svg>
    ),
  },
  {
    title: 'Real-Time Search & Filters',
    description: 'Filter instantly by name, email, roll number, or branch with responsive table updates and empty-state indicators.',
    icon: (
      <svg className="feature-icon" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
      </svg>
    ),
  },
  {
    title: 'Safe Delete Modal',
    description: 'Prevents accidental data loss with explicit confirmation dialogs and immediate UI feedback on deletion.',
    icon: (
      <svg className="feature-icon" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
    ),
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="features-section" aria-label="Core Features">
      <div className="features-container">
        <div className="section-header">
          <span className="section-eyebrow">CAPABILITIES</span>
          <h2 className="section-title">Core Application Features</h2>
          <p className="section-subtitle">
            Designed to make academic administrative workflows smooth, reliable, and accessible.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
