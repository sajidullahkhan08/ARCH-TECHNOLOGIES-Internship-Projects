const express = require('express');
const { body } = require('express-validator');
const { 
  createPost, 
  getPosts, 
  updatePost, 
  deletePost, 
  toggleLike, 
  addComment, 
  getComments 
} = require('../controllers/postController');
const { uploadMiddleware } = require('../middleware/upload');

const router = express.Router();

// Validation middleware
const postValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Post content must be between 1 and 500 characters')
];

const commentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Comment content must be between 1 and 200 characters')
];

// Routes
router.post('/', uploadMiddleware, postValidation, createPost);
router.get('/', getPosts);
router.put('/:id', uploadMiddleware, postValidation, updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', toggleLike);
router.post('/:id/comment', commentValidation, addComment);
router.get('/:id/comments', getComments);

module.exports = router; 