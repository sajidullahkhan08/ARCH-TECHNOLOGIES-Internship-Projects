import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import './TodoStats.css';

const TodoStats = ({ stats }) => {
  const {
    total = 0,
    completed = 0,
    pending = 0,
    highPriority = 0,
    completionRate = 0
  } = stats;

  const statItems = [
    {
      title: 'Total Tasks',
      value: total,
      icon: FiTrendingUp,
      color: '#667eea',
      bgColor: '#f0f4ff'
    },
    {
      title: 'Completed',
      value: completed,
      icon: FiCheckCircle,
      color: '#28a745',
      bgColor: '#f0fff4'
    },
    {
      title: 'Pending',
      value: pending,
      icon: FiClock,
      color: '#ffc107',
      bgColor: '#fffbf0'
    },
    {
      title: 'High Priority',
      value: highPriority,
      icon: FiAlertTriangle,
      color: '#dc3545',
      bgColor: '#fff5f5'
    }
  ];

  return (
    <motion.div
      className="todo-stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stats-header">
        <h3>📊 Task Overview</h3>
      </div>

      <div className="stats-grid">
        {statItems.map((item, index) => (
          <motion.div
            key={item.title}
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div 
              className="stat-icon"
              style={{ 
                backgroundColor: item.bgColor,
                color: item.color
              }}
            >
              <item.icon />
            </div>
            <div className="stat-content">
              <div className="stat-value">{item.value}</div>
              <div className="stat-title">{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {total > 0 && (
        <motion.div
          className="completion-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="progress-header">
            <span>Completion Rate</span>
            <span className="progress-percentage">{completionRate}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              style={{
                background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`
              }}
            />
          </div>
        </motion.div>
      )}

      {total === 0 && (
        <motion.div
          className="empty-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="empty-stats-icon">🎯</div>
          <p>Start adding tasks to see your progress!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TodoStats;
