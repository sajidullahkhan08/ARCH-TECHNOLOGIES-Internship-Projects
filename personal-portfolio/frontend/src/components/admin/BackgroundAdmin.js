import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackgroundAdmin = () => {
  const [data, setData] = useState({
    education: [],
    certifications: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/background');
      setData(response.data);
    } catch (error) {
      setMessage('Error fetching background data');
    } finally {
      setLoading(false);
    }
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { degree: '', institution: '', year: '', description: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = data.education.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setData({ ...data, education: updated });
  };

  const removeEducation = (index) => {
    const updated = data.education.filter((_, i) => i !== index);
    setData({ ...data, education: updated });
  };

  const addCertification = () => {
    setData({
      ...data,
      certifications: [...data.certifications, { name: '', issuer: '', year: '', credentialId: '' }]
    });
  };

  const updateCertification = (index, field, value) => {
    const updated = data.certifications.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setData({ ...data, certifications: updated });
  };

  const removeCertification = (index) => {
    const updated = data.certifications.filter((_, i) => i !== index);
    setData({ ...data, certifications: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await axios.put('/background', data);
      setMessage('Background updated successfully!');
    } catch (error) {
      setMessage('Error updating background');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Background Management</h2>
      <p>Manage your education and certifications</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Education Section */}
        <div className="form-section">
          <div className="section-header">
            <h3>Education</h3>
            <button type="button" onClick={addEducation} className="btn btn-secondary">
              Add Education
            </button>
          </div>
          
          {data.education.map((edu, index) => (
            <div key={index} className="form-item">
              <div className="form-item-header">
                <h4>Education #{index + 1}</h4>
                <button 
                  type="button" 
                  onClick={() => removeEducation(index)}
                  className="btn btn-danger btn-small"
                >
                  Remove
                </button>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="form-input"
                    placeholder="Bachelor's in Computer Science"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    className="form-input"
                    placeholder="University Name"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    className="form-input"
                    placeholder="2020-2024"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(index, 'description', e.target.value)}
                  className="form-input form-textarea"
                  rows="3"
                  placeholder="Description of your studies"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="form-section">
          <div className="section-header">
            <h3>Certifications</h3>
            <button type="button" onClick={addCertification} className="btn btn-secondary">
              Add Certification
            </button>
          </div>
          
          {data.certifications.map((cert, index) => (
            <div key={index} className="form-item">
              <div className="form-item-header">
                <h4>Certification #{index + 1}</h4>
                <button 
                  type="button" 
                  onClick={() => removeCertification(index)}
                  className="btn btn-danger btn-small"
                >
                  Remove
                </button>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    className="form-input"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Issuer</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    className="form-input"
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input
                    type="text"
                    value={cert.year}
                    onChange={(e) => updateCertification(index, 'year', e.target.value)}
                    className="form-input"
                    placeholder="2023"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Credential ID</label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    className="form-input"
                    placeholder="Optional credential ID"
                  />
                </div>
              </div>
            </div>
          ))}
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

export default BackgroundAdmin;