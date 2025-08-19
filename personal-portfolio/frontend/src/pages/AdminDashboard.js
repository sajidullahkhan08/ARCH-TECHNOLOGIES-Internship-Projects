import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import IntroductionAdmin from '../components/admin/IntroductionAdmin';
import BackgroundAdmin from '../components/admin/BackgroundAdmin';
import ProjectsAdmin from '../components/admin/ProjectsAdmin';
import SkillsAdmin from '../components/admin/SkillsAdmin';
import ExperienceAdmin from '../components/admin/ExperienceAdmin';
import TestimonialsAdmin from '../components/admin/TestimonialsAdmin';
import BlogAdmin from '../components/admin/BlogAdmin';
import AchievementsAdmin from '../components/admin/AchievementsAdmin';
import ContactAdmin from '../components/admin/ContactAdmin';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      <AdminSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
      
      <div className={`admin-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="admin-header">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>Portfolio Admin Dashboard</h1>
        </div>
        
        <div className="admin-main">
          <Routes>
            <Route path="/" element={<IntroductionAdmin />} />
            <Route path="/introduction" element={<IntroductionAdmin />} />
            <Route path="/background" element={<BackgroundAdmin />} />
            <Route path="/projects" element={<ProjectsAdmin />} />
            <Route path="/skills" element={<SkillsAdmin />} />
            <Route path="/experience" element={<ExperienceAdmin />} />
            <Route path="/testimonials" element={<TestimonialsAdmin />} />
            <Route path="/blog" element={<BlogAdmin />} />
            <Route path="/achievements" element={<AchievementsAdmin />} />
            <Route path="/contact" element={<ContactAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;