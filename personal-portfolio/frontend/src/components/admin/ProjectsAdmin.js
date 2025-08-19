import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch (error) {
      setMessage('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject({ ...project });
  };

  const handleAdd = () => {
    setEditingProject({
      title: '',
      description: '',
      role: '',
      technologies: [],
      outcomes: '',
      liveLink: '',
      githubLink: '',
      image: '',
      featured: false
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      if (editingProject._id) {
        await axios.put(`/projects/${editingProject._id}`, editingProject);
        setMessage('Project updated successfully!');
      } else {
        await axios.post('/projects', editingProject);
        setMessage('Project created successfully!');
      }
      
      await fetchProjects();
      setEditingProject(null);
    } catch (error) {
      setMessage('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await axios.delete(`/projects/${id}`);
      setMessage('Project deleted successfully!');
      await fetchProjects();
    } catch (error) {
      setMessage('Error deleting project');
    }
  };

  const handleChange = (field, value) => {
    setEditingProject({
      ...editingProject,
      [field]: value
    });
  };

  const handleTechnologiesChange = (value) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    handleChange('technologies', technologies);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Projects Management</h2>
      <p>Manage your portfolio projects</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="admin-actions">
        <button onClick={handleAdd} className="btn btn-primary">
          Add New Project
        </button>
      </div>

      {editingProject && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>{editingProject._id ? 'Edit Project' : 'Add New Project'}</h3>
            
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="form-input"
                placeholder="Project Title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="form-input form-textarea"
                rows="4"
                placeholder="Project Description"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  value={editingProject.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="form-input"
                  placeholder="Your role in the project"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Technologies (comma separated)</label>
              <input
                type="text"
                value={editingProject.technologies.join(', ')}
                onChange={(e) => handleTechnologiesChange(e.target.value)}
                className="form-input"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Outcomes</label>
              <textarea
                value={editingProject.outcomes}
                onChange={(e) => handleChange('outcomes', e.target.value)}
                className="form-input form-textarea"
                rows="3"
                placeholder="Project outcomes and results"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Live Link</label>
                <input
                  type="url"
                  value={editingProject.liveLink}
                  onChange={(e) => handleChange('liveLink', e.target.value)}
                  className="form-input"
                  placeholder="https://example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub Link</label>
                <input
                  type="url"
                  value={editingProject.githubLink}
                  onChange={(e) => handleChange('githubLink', e.target.value)}
                  className="form-input"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                value={editingProject.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editingProject.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                />
                Featured Project
              </label>
            </div>

            <div className="modal-actions">
              <button 
                onClick={handleSave} 
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={() => setEditingProject(null)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="projects-list">
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          projects.map(project => (
            <div key={project._id} className="project-item">
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span>Role: {project.role}</span>
                  {project.featured && <span className="featured-badge">Featured</span>}
                  }
                </div>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-actions">
                <button 
                  onClick={() => handleEdit(project)}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsAdmin;