import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/introduction', label: 'Introduction', icon: '👋' },
    { path: '/admin/background', label: 'Background', icon: '🎓' },
    { path: '/admin/projects', label: 'Projects', icon: '💼' },
    { path: '/admin/skills', label: 'Skills', icon: '🛠️' },
    { path: '/admin/experience', label: 'Experience', icon: '💻' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
    { path: '/admin/blog', label: 'Blog/Articles', icon: '📝' },
    { path: '/admin/achievements', label: 'Achievements', icon: '🏆' },
    { path: '/admin/contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={() => onToggle(false)} />}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
          <button className="sidebar-close" onClick={() => onToggle(false)}>
            ×
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => window.innerWidth <= 768 && onToggle(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;