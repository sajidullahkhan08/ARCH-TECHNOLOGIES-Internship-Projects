const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Ensure unique friend requests
friendRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });

// Prevent self-friend requests
friendRequestSchema.pre('save', function(next) {
  if (this.senderId.toString() === this.receiverId.toString()) {
    return next(new Error('Cannot send friend request to yourself'));
  }
  next();
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema); 