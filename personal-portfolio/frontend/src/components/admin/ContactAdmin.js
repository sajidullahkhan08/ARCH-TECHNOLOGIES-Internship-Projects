import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactAdmin = () => {
  const [data, setData] = useState({
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
    availability: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/contact');
      setData(response.data);
    } catch (error) {
      setMessage('Error fetching contact data');
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
      await axios.put('/contact', data);
      setMessage('Contact information updated successfully!');
    } catch (error) {
      setMessage('Error updating contact information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Contact Information Management</h2>
      <p>Manage your contact details and social media links</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="form-input"
              placeholder="your.email@example.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              className="form-input"
              placeholder="City, Country"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Availability</label>
            <select
              name="availability"
              value={data.availability}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select availability</option>
              <option value="Available for hire">Available for hire</option>
              <option value="Open to opportunities">Open to opportunities</option>
              <option value="Currently employed">Currently employed</option>
              <option value="Not available">Not available</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Social Media & Professional Links</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={data.linkedin}
                onChange={handleChange}
                className="form-input"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Profile</label>
              <input
                type="url"
                name="github"
                value={data.github}
                onChange={handleChange}
                className="form-input"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Personal Website</label>
              <input
                type="url"
                name="website"
                value={data.website}
                onChange={handleChange}
                className="form-input"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Twitter Profile</label>
              <input
                type="url"
                name="twitter"
                value={data.twitter}
                onChange={handleChange}
                className="form-input"
                placeholder="https://twitter.com/yourusername"
              />
            </div>
          </div>
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

export default ContactAdmin;