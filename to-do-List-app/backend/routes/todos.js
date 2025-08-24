const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateTodo = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
  body('category').optional().trim().isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters')
];

// Get all todos
router.get('/', async (req, res) => {
  try {
    const { completed, priority, category, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    let query = {};
    
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    if (category) {
      query.category = category;
    }
    
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const todos = await Todo.find(query).sort(sortOptions);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
});

// Get single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error: error.message });
  }
});

// Create new todo
router.post('/', validateTodo, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
});

// Update todo
router.put('/:id', validateTodo, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
});

// Toggle todo completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling todo', error: error.message });
  }
});

// Get todos statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });
    const pending = await Todo.countDocuments({ completed: false });
    const highPriority = await Todo.countDocuments({ priority: 'high', completed: false });
    
    res.json({
      total,
      completed,
      pending,
      highPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router;
