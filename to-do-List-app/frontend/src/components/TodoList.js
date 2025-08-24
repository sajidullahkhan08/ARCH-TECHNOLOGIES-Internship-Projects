import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiEdit2, FiTrash2, FiCalendar, FiFlag, FiTag } from 'react-icons/fi';
import { format, isPast } from 'date-fns';
import TodoItem from './TodoItem';
import './TodoList.css';

// Custom function to check if a task is overdue
const isOverdue = (date) => {
  return isPast(date) && date !== null;
};

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo, onToggleTodo }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id, updatedData) => {
    try {
      await onUpdateTodo(id, updatedData);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  if (todos.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Add your first task to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="todo-list">
      <AnimatePresence>
        {todos.map((todo, index) => (
          <motion.div
            key={todo._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            layout
          >
            {editingId === todo._id ? (
              <TodoItem
                todo={todo}
                isEditing={true}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={onDeleteTodo}
                onToggle={onToggleTodo}
              />
            ) : (
              <motion.div
                className={`todo-card ${todo.completed ? 'completed' : ''} ${isOverdue(new Date(todo.dueDate)) && !todo.completed ? 'overdue' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="todo-header">
                  <div className="todo-title-section">
                    <button
                      className={`check-btn ${todo.completed ? 'checked' : ''}`}
                      onClick={() => onToggleTodo(todo._id)}
                    >
                      {todo.completed && <FiCheck />}
                    </button>
                    <div className="todo-info">
                      <h4 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                        {todo.title}
                      </h4>
                      {todo.description && (
                        <p className={`todo-description ${todo.completed ? 'completed' : ''}`}>
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="todo-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(todo._id)}
                      title="Edit task"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => onDeleteTodo(todo._id)}
                      title="Delete task"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                <div className="todo-meta">
                  <div className="meta-item">
                    <FiFlag style={{ color: getPriorityColor(todo.priority) }} />
                    <span className="priority-text">
                      {getPriorityIcon(todo.priority)} {todo.priority}
                    </span>
                  </div>
                  
                  {todo.category && (
                    <div className="meta-item">
                      <FiTag />
                      <span>{todo.category}</span>
                    </div>
                  )}
                  
                  {todo.dueDate && (
                    <div className={`meta-item ${isOverdue(new Date(todo.dueDate)) && !todo.completed ? 'overdue' : ''}`}>
                      <FiCalendar />
                      <span>
                        {format(new Date(todo.dueDate), 'MMM dd, yyyy HH:mm')}
                        {isOverdue(new Date(todo.dueDate)) && !todo.completed && ' (Overdue)'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="todo-footer">
                  <span className="todo-date">
                    Created {format(new Date(todo.createdAt), 'MMM dd, yyyy')}
                  </span>
                  {todo.completed && (
                    <span className="completed-date">
                      Completed {format(new Date(todo.updatedAt), 'MMM dd, yyyy')}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
