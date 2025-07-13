const express = require('express');
const { body } = require('express-validator');
const { getUserProfile, updateUserProfile, searchUsers } = require('../controllers/userController');
const { uploadMiddleware } = require('../middleware/upload');

const router = express.Router();

// Validation middleware
const updateProfileValidation = [
  body('bio')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Bio cannot exceed 200 characters')
];

// Routes
router.get('/search', searchUsers);
router.get('/:id', getUserProfile);
router.put('/:id', uploadMiddleware, updateProfileValidation, updateUserProfile);

module.exports = router; 