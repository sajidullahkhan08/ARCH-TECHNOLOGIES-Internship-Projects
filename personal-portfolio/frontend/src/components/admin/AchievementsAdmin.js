import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AchievementsAdmin = () => {
  const [achievements, setAchievements] = useState([]);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('/achievements');
      setAchievements(response.data);
    } catch (error) {
      setMessage('Error fetching achievements');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (achievement) => {
    setEditingAchievement({ 
      ...achievement, 
      date: achievement.date ? achievement.date.split('T')[0] : ''
    });
  };

  const handleAdd = () => {
    setEditingAchievement({
      title: '',
      description: '',
      date: '',
      issuer: '',
      category: '',
      image: ''
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const achievementData = {
        ...editingAchievement,
        date: editingAchievement.date ? new Date(editingAchievement.date) : null
      };

      if (editingAchievement._id) {
        await axios.put(`/achievements/${editingAchievement._id}`, achievementData);
        setMessage('Achievement updated successfully!');
      } else {
        await axios.post('/achievements', achievementData);
        setMessage('Achievement created successfully!');
      }
      
      await fetchAchievements();
      setEditingAchievement(null);
    } catch (error) {
      setMessage('Error saving achievement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    try {
      await axios.delete(`/achievements/${id}`);
      setMessage('Achievement deleted successfully!');
      await fetchAchievements();
    } catch (error) {
      setMessage('Error deleting achievement');
    }
  };

  const handleChange = (field, value) => {
    setEditingAchievement({
      ...editingAchievement,
      [field]: value
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Achievements Management</h2>
      <p>Manage your awards, honors, and achievements</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="admin-actions">
        <button onClick={handleAdd} className="btn btn-primary">
          Add New Achievement
        </button>
      </div>

      {editingAchievement && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>{editingAchievement._id ? 'Edit Achievement' : 'Add New Achievement'}</h3>
            
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={editingAchievement.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="form-input"
                placeholder="Achievement Title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                value={editingAchievement.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="form-input form-textarea"
                rows="4"
                placeholder="Description of the achievement"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={editingAchievement.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Issuer</label>
                <input
                  type="text"
                  value={editingAchievement.issuer}
                  onChange={(e) => handleChange('issuer', e.target.value)}
                  className="form-input"
                  placeholder="Organization or Company"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  value={editingAchievement.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="form-input"
                  placeholder="Award, Recognition, Honor, etc."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={editingAchievement.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="form-input"
                  placeholder="https://example.com/achievement-image.jpg"
                />
              </div>
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
                onClick={() => setEditingAchievement(null)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="achievements-list">
        {achievements.length === 0 ? (
          <p>No achievements added yet.</p>
        ) : (
          achievements.map(achievement => (
            <div key={achievement._id} className="achievement-item">
              <div className="achievement-info">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
                <div className="achievement-meta">
                  <span>Category: {achievement.category}</span>
                  <span>Issuer: {achievement.issuer}</span>
                  {achievement.date && (
                    <span>Date: {new Date(achievement.date).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="achievement-actions">
                <button 
                  onClick={() => handleEdit(achievement)}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(achievement._id)}
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

export default AchievementsAdmin;