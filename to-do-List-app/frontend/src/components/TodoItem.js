import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiCalendar, FiTag, FiFlag } from 'react-icons/fi';
import './TodoItem.css';

const TodoItem = ({ todo, isEditing, onSave, onCancel, onDelete, onToggle }) => {
  const [formData, setFormData] = useState({
    status: 'pending', // Added status field
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    category: todo.category || '',
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 16) : ''
  });

  useEffect(() => {
    setFormData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      category: todo.category || '',
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 16) : ''
    });
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const updatedData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null
    };

    onSave(todo._id, updatedData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <motion.div
      className="todo-item-edit"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-header">
          <div className="edit-title-section">
            <button
              type="button"
              className={`check-btn ${todo.completed ? 'checked' : ''}`}
              onClick={() => onToggle(todo._id)}
            >
              {todo.completed && <span>✓</span>}
            </button>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="edit-title-input"
              placeholder="Task title"
              required
              autoFocus
            />
          </div>
          <div className="edit-actions">
            <button
              type="submit"
              className="action-btn save-btn"
              title="Save changes"
            >
              <FiSave />
            </button>
            <button
              type="button"
              className="action-btn cancel-btn"
              onClick={onCancel}
              title="Cancel editing"
            >
              <FiX />
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(todo._id)}
              title="Delete task"
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="edit-content">
          <div className="input-group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description (optional)"
              className="edit-description-input"
              rows="3"
            />
          </div>

          <div className="edit-meta">
            <div className="meta-row">
              <div className="input-group">
                <label>
                  <FiFlag className="input-icon" />
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="select-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="input-group">
                <label>
                  <FiTag className="input-icon" />
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="input"
                />
              </div>
            </div>

            <div className="input-group">
              <label>
                <FiCalendar className="input-icon" />
                Due Date
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default TodoItem;
