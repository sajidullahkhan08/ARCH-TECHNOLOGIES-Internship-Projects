const express = require('express');
const { body } = require('express-validator');
const { 
  sendFriendRequest, 
  acceptFriendRequest, 
  declineFriendRequest, 
  getFriendRequests, 
  getFriends, 
  removeFriend 
} = require('../controllers/friendController');

const router = express.Router();

// Validation middleware
const friendRequestValidation = [
  body('receiverId')
    .isMongoId()
    .withMessage('Invalid user ID')
];

// Routes
router.post('/request', friendRequestValidation, sendFriendRequest);
router.put('/request/:id/accept', acceptFriendRequest);
router.put('/request/:id/decline', declineFriendRequest);
router.get('/requests', getFriendRequests);
router.get('/', getFriends);
router.delete('/:friendId', removeFriend);

module.exports = router; 