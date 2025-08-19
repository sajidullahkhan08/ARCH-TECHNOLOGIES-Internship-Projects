import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin-styles.css';

const IntroductionAdmin = () => {
  const [data, setData] = useState({
    name: '',
    title: '',
    description: '',
    profileImage: '',
    ambitions: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/introduction');
      setData(response.data);
    } catch (error) {
      setMessage('Error fetching introduction data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await axios.put('/introduction', data);
      setMessage('Introduction updated successfully!');
    } catch (error) {
      setMessage('Error updating introduction');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Introduction Management</h2>
      <p>Edit your personal introduction and ambitions</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Professional Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Full Stack Developer"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Profile Image URL</label>
          <input
            type="url"
            name="profileImage"
            value={data.profileImage}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com/your-image.jpg"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="form-input form-textarea"
            rows="4"
            placeholder="Brief introduction about yourself"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ambitions</label>
          <textarea
            name="ambitions"
            value={data.ambitions}
            onChange={handleChange}
            className="form-input form-textarea"
            rows="4"
            placeholder="Your career goals and ambitions"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default IntroductionAdmin;