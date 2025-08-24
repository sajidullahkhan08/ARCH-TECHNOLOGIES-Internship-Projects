import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiCalendar, FiTag, FiFlag } from 'react-icons/fi';
import './TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'General',
    dueDate: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const todoData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate || null
      };

      await onAddTodo(todoData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'General',
        dueDate: ''
      });
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div 
      className="todo-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-header">
          <h3>Add New Task</h3>
          <button
            type="button"
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FiPlus className={isExpanded ? 'rotated' : ''} />
          </button>
        </div>

        <div className="form-content">
          <div className="input-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="title-input"
              required
            />
          </div>

          {isExpanded && (
            <motion.div
              className="expanded-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="input-group">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add a description (optional)"
                  className="description-input"
                  rows="3"
                />
              </div>

              <div className="form-row">
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
            </motion.div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting || !formData.title.trim()}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FiPlus />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default TodoForm;
