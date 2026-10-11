import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AppLayout.css';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = (() => {
    if (typeof window === 'undefined') return { name: 'Admin User', role: 'admin' };
    const stored = localStorage.getItem('user');
    try {
      return stored ? JSON.parse(stored) : { name: 'Admin User', role: 'admin' };
    } catch {
      return { name: 'Admin User', role: 'admin' };
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout-root">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div className="layout-backdrop" onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* Sidebar Navigation */}
      <aside className={`layout-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-name">xSTUDENT</span>
          <span className="sidebar-role-badge">{user.role || 'user'}</span>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar Navigation">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            All Students
          </NavLink>

          <NavLink
            to="/students/new"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            Add Student
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            My Profile
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <span className="user-name">{user.name || 'User'}</span>
            <span className="user-email">{user.email || 'user@college.edu'}</span>
          </div>
          <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="layout-main-wrapper">
        <header className="layout-topbar">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar menu"
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          <div className="topbar-title">Student Management Portal</div>

          <div className="topbar-user-badge">
            <span className="avatar-circle">
              {(user.name || 'U').charAt(0).toUpperCase()}
            </span>
            <span className="avatar-label">{user.name || 'User'}</span>
          </div>
        </header>

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
