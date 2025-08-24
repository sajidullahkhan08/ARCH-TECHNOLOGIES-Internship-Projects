import React from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiArrowUp, FiArrowDown, FiX } from 'react-icons/fi';
import './TodoFilter.css';

const TodoFilter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      completed: undefined,
      priority: '',
      category: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.completed !== undefined || 
                          filters.priority || 
                          filters.category || 
                          filters.sortBy !== 'createdAt' || 
                          filters.sortOrder !== 'desc';

  return (
    <motion.div
      className="todo-filter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="filter-header">
        <h3>
          <FiFilter />
          Filters & Sort
        </h3>
        {hasActiveFilters && (
          <button
            className="clear-filters-btn"
            onClick={clearFilters}
            title="Clear all filters"
          >
            <FiX />
            Clear
          </button>
        )}
      </div>

      <div className="filter-content">
        <div className="filter-section">
          <label className="filter-label">Status</label>
          <div className="filter-options">
            <button
              className={`filter-option ${filters.completed === undefined ? 'active' : ''}`}
              onClick={() => handleFilterChange('completed', undefined)}
            >
              All
            </button>
            <button
              className={`filter-option ${filters.completed === false ? 'active' : ''}`}
              onClick={() => handleFilterChange('completed', false)}
            >
              Pending
            </button>
            <button
              className={`filter-option ${filters.completed === true ? 'active' : ''}`}
              onClick={() => handleFilterChange('completed', true)}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="filter-select"
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="filter-section">
          <label className="filter-label">Category</label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            placeholder="Filter by category..."
            className="filter-input"
          />
        </div>

        <div className="filter-section">
          <label className="filter-label">Sort By</label>
          <div className="sort-controls">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="sort-select"
            >
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Last Modified</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
            <button
              className={`sort-btn ${filters.sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => handleFilterChange('sortOrder', 'asc')}
              title="Sort ascending"
            >
              <FiArrowUp />
            </button>
            <button
              className={`sort-btn ${filters.sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => handleFilterChange('sortOrder', 'desc')}
              title="Sort descending"
            >
              <FiArrowDown />
            </button>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <motion.div
          className="active-filters"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="active-filters-label">Active Filters:</div>
          <div className="active-filters-tags">
            {filters.completed !== undefined && (
              <span className="filter-tag">
                Status: {filters.completed ? 'Completed' : 'Pending'}
                <button
                  onClick={() => handleFilterChange('completed', undefined)}
                  className="remove-filter"
                >
                  <FiX />
                </button>
              </span>
            )}
            {filters.priority && (
              <span className="filter-tag">
                Priority: {filters.priority}
                <button
                  onClick={() => handleFilterChange('priority', '')}
                  className="remove-filter"
                >
                  <FiX />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="filter-tag">
                Category: {filters.category}
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className="remove-filter"
                >
                  <FiX />
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TodoFilter;
