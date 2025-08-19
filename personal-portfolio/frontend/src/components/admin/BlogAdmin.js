import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/blog');
      setBlogs(response.data);
    } catch (error) {
      setMessage('Error fetching blog articles');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog({ 
      ...blog, 
      publishedDate: blog.publishedDate ? blog.publishedDate.split('T')[0] : ''
    });
  };

  const handleAdd = () => {
    setEditingBlog({
      title: '',
      summary: '',
      link: '',
      publishedDate: '',
      platform: '',
      tags: []
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const blogData = {
        ...editingBlog,
        publishedDate: editingBlog.publishedDate ? new Date(editingBlog.publishedDate) : null
      };

      if (editingBlog._id) {
        await axios.put(`/blog/${editingBlog._id}`, blogData);
        setMessage('Blog article updated successfully!');
      } else {
        await axios.post('/blog', blogData);
        setMessage('Blog article created successfully!');
      }
      
      await fetchBlogs();
      setEditingBlog(null);
    } catch (error) {
      setMessage('Error saving blog article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) {
      return;
    }

    try {
      await axios.delete(`/blog/${id}`);
      setMessage('Blog article deleted successfully!');
      await fetchBlogs();
    } catch (error) {
      setMessage('Error deleting blog article');
    }
  };

  const handleChange = (field, value) => {
    setEditingBlog({
      ...editingBlog,
      [field]: value
    });
  };

  const handleTagsChange = (value) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    handleChange('tags', tags);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2>Blog/Articles Management</h2>
      <p>Manage your blog articles and publications</p>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="admin-actions">
        <button onClick={handleAdd} className="btn btn-primary">
          Add New Article
        </button>
      </div>

      {editingBlog && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>{editingBlog._id ? 'Edit Article' : 'Add New Article'}</h3>
            
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={editingBlog.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="form-input"
                placeholder="Article Title"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Summary</label>
              <textarea
                value={editingBlog.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                className="form-input form-textarea"
                rows="4"
                placeholder="Brief summary of the article"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Link</label>
              <input
                type="url"
                value={editingBlog.link}
                onChange={(e) => handleChange('link', e.target.value)}
                className="form-input"
                placeholder="https://example.com/article"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Published Date</label>
                <input
                  type="date"
                  value={editingBlog.publishedDate}
                  onChange={(e) => handleChange('publishedDate', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Platform</label>
                <input
                  type="text"
                  value={editingBlog.platform}
                  onChange={(e) => handleChange('platform', e.target.value)}
                  className="form-input"
                  placeholder="Medium, Dev.to, Personal Blog"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags (comma separated)</label>
              <input
                type="text"
                value={editingBlog.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="form-input"
                placeholder="JavaScript, React, Web Development"
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
                onClick={() => setEditingBlog(null)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="blogs-list">
        {blogs.length === 0 ? (
          <p>No blog articles added yet.</p>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} className="blog-item">
              <div className="blog-info">
                <h4>{blog.title}</h4>
                <p>{blog.summary}</p>
                <div className="blog-meta">
                  <span>Platform: {blog.platform}</span>
                  {blog.publishedDate && (
                    <span>Published: {new Date(blog.publishedDate).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="blog-tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="blog-actions">
                <a 
                  href={blog.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-small"
                >
                  View
                </a>
                <button 
                  onClick={() => handleEdit(blog)}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(blog._id)}
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

export default BlogAdmin;