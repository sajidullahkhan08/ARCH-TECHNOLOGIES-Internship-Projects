import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      setMessage('Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial({ ...testimonial });
  };

  const handleAdd = () => {
    setEditingTestimonial({
      name: '',
      position: '',
      company: '',
      testimonial: '',
      image: '',
      linkedin: ''
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      if (editingTestimonial._id) {
        await axios.put(`/testimonials/${editingTestimonial._id}`, editingTestimonial);
        setMessage('Testimonial updated successfully!');
      } else {
        await axios.post('/testimonials', editingTestimonial);
        setMessage('Testimonial created successfully!');
      }
      
      await fetchTestimonials();
      setEditingTestimonial(null);
    } catch (error) {
      setMessage('Error saving testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      await axios.delete(`/testimonials/${id}`);
      setMessage('Testimonial deleted successfully!');
      await fetchTestimonials();
    } catch (error) {
      setMessage('Error deleting testimonial');
    }
  };

  const handleChange = (field, value) => {
    setEditingTestimonial({
      ...editingTestimonial,
      [field]: value
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Testimonials Management</h2>
      <p>Manage client and colleague testimonials</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="admin-actions">
        <button onClick={handleAdd} className="btn btn-primary">
          Add New Testimonial
        </button>
      </div>

      {editingTestimonial && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>{editingTestimonial._id ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={editingTestimonial.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="form-input"
                  placeholder="Person's Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  value={editingTestimonial.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  className="form-input"
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                type="text"
                value={editingTestimonial.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="form-input"
                placeholder="Company Name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Testimonial</label>
              <textarea
                value={editingTestimonial.testimonial}
                onChange={(e) => handleChange('testimonial', e.target.value)}
                className="form-input form-textarea"
                rows="5"
                placeholder="Write the testimonial content here..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                value={editingTestimonial.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="form-input"
                placeholder="https://example.com/profile-image.jpg"
              />
            </div>

            <div className="form-group">
              <label className="form-label">LinkedIn Profile</label>
              <input
                type="url"
                value={editingTestimonial.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="form-input"
                placeholder="https://linkedin.com/in/username"
              />
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
                onClick={() => setEditingTestimonial(null)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="testimonials-list">
        {testimonials.length === 0 ? (
          <p>No testimonials added yet.</p>
        ) : (
          testimonials.map(testimonial => (
            <div key={testimonial._id} className="testimonial-item">
              <div className="testimonial-info">
                <h4>{testimonial.name}</h4>
                <p className="testimonial-position">{testimonial.position} at {testimonial.company}</p>
                <p className="testimonial-content">"{testimonial.testimonial}"</p>
              </div>
              <div className="testimonial-actions">
                <button 
                  onClick={() => handleEdit(testimonial)}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(testimonial._id)}
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

export default TestimonialsAdmin;