const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');
const { validationResult } = require('express-validator');

// @desc    Send friend request
// @route   POST /api/friends/request
// @access  Private
const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if already friends
    const sender = await User.findById(senderId);
    if (sender.friends.includes(receiverId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already friends with this user' 
      });
    }

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ 
        success: false, 
        message: 'Friend request already exists' 
      });
    }

    // Create friend request
    const friendRequest = new FriendRequest({
      senderId,
      receiverId
    });

    await friendRequest.save();

    // Emit real-time notification
    const io = req.app.get('io');
    const senderUser = await User.findById(senderId).select('username profilePicture');
    
    io.to(receiverId.toString()).emit('friendRequest', {
      request: {
        _id: friendRequest._id,
        sender: {
          _id: senderUser._id,
          username: senderUser.username,
          profilePicture: senderUser.profilePicture
        },
        status: friendRequest.status,
        createdAt: friendRequest.createdAt
      }
    });

    res.status(201).json({
      success: true,
      message: 'Friend request sent successfully',
      data: friendRequest
    });
  } catch (error) {
    console.error('Send friend request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Accept friend request
// @route   PUT /api/friends/request/:id/accept
// @access  Private
const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      return res.status(404).json({ 
        success: false, 
        message: 'Friend request not found' 
      });
    }

    // Check if user is the receiver
    if (friendRequest.receiverId.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to accept this request' 
      });
    }

    // Check if request is pending
    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Friend request is not pending' 
      });
    }

    // Update request status
    friendRequest.status = 'accepted';
    await friendRequest.save();

    // Add each other as friends
    const sender = await User.findById(friendRequest.senderId);
    const receiver = await User.findById(friendRequest.receiverId);

    if (!sender.friends.includes(receiver._id)) {
      sender.friends.push(receiver._id);
      await sender.save();
    }

    if (!receiver.friends.includes(sender._id)) {
      receiver.friends.push(sender._id);
      await receiver.save();
    }

    // Emit real-time notification to sender
    const io = req.app.get('io');
    const receiverUser = await User.findById(userId).select('username profilePicture');
    
    io.to(friendRequest.senderId.toString()).emit('friendRequestStatus', {
      requestId: friendRequest._id,
      status: 'accepted',
      receiver: {
        _id: receiverUser._id,
        username: receiverUser.username,
        profilePicture: receiverUser.profilePicture
      }
    });

    res.json({
      success: true,
      message: 'Friend request accepted',
      data: friendRequest
    });
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Decline friend request
// @route   PUT /api/friends/request/:id/decline
// @access  Private
const declineFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const friendRequest = await FriendRequest.findById(id);
    if (!friendRequest) {
      return res.status(404).json({ 
        success: false, 
        message: 'Friend request not found' 
      });
    }

    // Check if user is the receiver
    if (friendRequest.receiverId.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to decline this request' 
      });
    }

    // Check if request is pending
    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Friend request is not pending' 
      });
    }

    // Update request status
    friendRequest.status = 'declined';
    await friendRequest.save();

    // Emit real-time notification to sender
    const io = req.app.get('io');
    const receiverUser = await User.findById(userId).select('username');
    
    io.to(friendRequest.senderId.toString()).emit('friendRequestStatus', {
      requestId: friendRequest._id,
      status: 'declined',
      receiver: {
        _id: receiverUser._id,
        username: receiverUser.username
      }
    });

    res.json({
      success: true,
      message: 'Friend request declined',
      data: friendRequest
    });
  } catch (error) {
    console.error('Decline friend request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get pending friend requests
// @route   GET /api/friends/requests
// @access  Private
const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const friendRequests = await FriendRequest.find({
      receiverId: userId,
      status: 'pending'
    })
    .populate('senderId', 'username profilePicture bio')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: friendRequests
    });
  } catch (error) {
    console.error('Get friend requests error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get friends list
// @route   GET /api/friends
// @access  Private
const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate('friends', 'username profilePicture bio isOnline lastSeen')
      .select('friends');

    res.json({
      success: true,
      data: user.friends || []
    });
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Remove friend
// @route   DELETE /api/friends/:friendId
// @access  Private
const removeFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Remove from each other's friends list
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId.toString());

    await user.save();
    await friend.save();

    res.json({
      success: true,
      message: 'Friend removed successfully'
    });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendRequests,
  getFriends,
  removeFriend
}; 