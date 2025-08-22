import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [editingExperience, setEditingExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('/experience');
      setExperiences(response.data);
    } catch (error) {
      setMessage('Error fetching experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience({ ...experience });
  };

  const handleAdd = () => {
    setEditingExperience({
      company: '',
      position: '',
      duration: '',
      location: '',
      description: '',
      responsibilities: [],
      contributions: [],
      technologies: [],
      current: false
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      if (editingExperience._id) {
        await axios.put(`/experience/${editingExperience._id}`, editingExperience);
        setMessage('Experience updated successfully!');
      } else {
        await axios.post('/experience', editingExperience);
        setMessage('Experience created successfully!');
      }
      
      await fetchExperiences();
      setEditingExperience(null);
    } catch (error) {
      setMessage('Error saving experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) {
      return;
    }

    try {
      await axios.delete(`/experience/${id}`);
      setMessage('Experience deleted successfully!');
      await fetchExperiences();
    } catch (error) {
      setMessage('Error deleting experience');
    }
  };

  const handleChange = (field, value) => {
    setEditingExperience({
      ...editingExperience,
      [field]: value
    });
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    handleChange(field, items);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Experience Management</h2>
      <p>Manage your professional experience</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="admin-actions">
        <button onClick={handleAdd} className="btn btn-primary">
          Add New Experience
        </button>
      </div>

      {editingExperience && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>{editingExperience._id ? 'Edit Experience' : 'Add New Experience'}</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  value={editingExperience.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="form-input"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  value={editingExperience.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  className="form-input"
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  value={editingExperience.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Jan 2020 - Present"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={editingExperience.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="form-input"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={editingExperience.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="form-input form-textarea"
                rows="3"
                placeholder="Brief description of your role"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Responsibilities (comma separated)</label>
              <textarea
                value={editingExperience.responsibilities.join(', ')}
                onChange={(e) => handleArrayChange('responsibilities', e.target.value)}
                className="form-input form-textarea"
                rows="3"
                placeholder="Responsibility 1, Responsibility 2, Responsibility 3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contributions (comma separated)</label>
              <textarea
                value={editingExperience.contributions.join(', ')}
                onChange={(e) => handleArrayChange('contributions', e.target.value)}
                className="form-input form-textarea"
                rows="3"
                placeholder="Contribution 1, Contribution 2, Contribution 3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Technologies (comma separated)</label>
              <input
                type="text"
                value={editingExperience.technologies.join(', ')}
                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                className="form-input"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editingExperience.current}
                  onChange={(e) => handleChange('current', e.target.checked)}
                />
                Current Position
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
                onClick={() => setEditingExperience(null)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="experiences-list">
        {experiences.length === 0 ? (
          <p>No experiences added yet.</p>
        ) : (
          experiences.map(experience => (
            <div key={experience._id} className="experience-item">
              <div className="experience-info">
                <h4>{experience.position} at {experience.company}</h4>
                <p className="experience-duration">{experience.duration}</p>
                {experience.location && (
                  <p className="experience-location">{experience.location}</p>
                )}
                <p className="experience-description">{experience.description}</p>
                
                {experience.responsibilities.length > 0 && (
                  <div className="experience-responsibilities">
                    <strong>Responsibilities:</strong>
                    <ul>
                      {experience.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {experience.technologies.length > 0 && (
                  <div className="experience-technologies">
                    <strong>Technologies:</strong>
                    <div className="tech-tags">
                      {experience.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="experience-actions">
                <button 
                  onClick={() => handleEdit(experience)}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(experience._id)}
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

export default ExperienceAdmin;
