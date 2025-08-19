import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillsAdmin = () => {
  const [data, setData] = useState({
    technical: [],
    soft: [],
    languages: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/skills');
      setData(response.data);
    } catch (error) {
      setMessage('Error fetching skills data');
    } finally {
      setLoading(false);
    }
  };

  const addTechnicalCategory = () => {
    setData({
      ...data,
      technical: [...data.technical, { category: '', skills: [] }]
    });
  };

  const updateTechnicalCategory = (index, field, value) => {
    const updated = data.technical.map((item, i) => {
      if (i === index) {
        if (field === 'skills') {
          return { ...item, [field]: value.split(',').map(skill => skill.trim()).filter(skill => skill) };
        }
        return { ...item, [field]: value };
      }
      return item;
    });
    setData({ ...data, technical: updated });
  };

  const removeTechnicalCategory = (index) => {
    const updated = data.technical.filter((_, i) => i !== index);
    setData({ ...data, technical: updated });
  };

  const updateSoftSkills = (value) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setData({ ...data, soft: skills });
  };

  const updateLanguages = (value) => {
    const languages = value.split(',').map(lang => lang.trim()).filter(lang => lang);
    setData({ ...data, languages: languages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await axios.put('/skills', data);
      setMessage('Skills updated successfully!');
    } catch (error) {
      setMessage('Error updating skills');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Skills Management</h2>
      <p>Manage your technical and soft skills</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Technical Skills Section */}
        <div className="form-section">
          <div className="section-header">
            <h3>Technical Skills</h3>
            <button type="button" onClick={addTechnicalCategory} className="btn btn-secondary">
              Add Category
            </button>
          </div>
          
          {data.technical.map((category, index) => (
            <div key={index} className="form-item">
              <div className="form-item-header">
                <h4>Category #{index + 1}</h4>
                <button 
                  type="button" 
                  onClick={() => removeTechnicalCategory(index)}
                  className="btn btn-danger btn-small"
                >
                  Remove
                </button>
              </div>
              
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  value={category.category}
                  onChange={(e) => updateTechnicalCategory(index, 'category', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Programming Languages, Frameworks, Tools"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  value={category.skills.join(', ')}
                  onChange={(e) => updateTechnicalCategory(index, 'skills', e.target.value)}
                  className="form-input"
                  placeholder="React, Node.js, JavaScript, Python"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills Section */}
        <div className="form-section">
          <h3>Soft Skills</h3>
          <div className="form-group">
            <label className="form-label">Soft Skills (comma separated)</label>
            <input
              type="text"
              value={data.soft.join(', ')}
              onChange={(e) => updateSoftSkills(e.target.value)}
              className="form-input"
              placeholder="Leadership, Communication, Problem Solving, Team Work"
            />
          </div>
        </div>

        {/* Languages Section */}
        <div className="form-section">
          <h3>Languages</h3>
          <div className="form-group">
            <label className="form-label">Languages (comma separated)</label>
            <input
              type="text"
              value={data.languages.join(', ')}
              onChange={(e) => updateLanguages(e.target.value)}
              className="form-input"
              placeholder="English (Native), Spanish (Fluent), French (Intermediate)"
            />
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

export default SkillsAdmin;