const User = require('../models/User');
const Post = require('../models/Post');
const { validationResult } = require('express-validator');

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user._id;

    const user = await User.findById(id)
      .select('-password')
      .populate('friends', 'username profilePicture');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Get user's posts
    const posts = await Post.find({ userId: id })
      .populate('userId', 'username profilePicture')
      .populate('likes', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    // Check if current user is friends with this user
    const isFriend = user.friends.some(friend => friend._id.toString() === currentUserId.toString());

    res.json({
      success: true,
      data: {
        user,
        posts,
        isFriend
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;
    const currentUserId = req.user._id;

    // Check if user is updating their own profile
    if (id !== currentUserId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this profile' 
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    const updateData = {};
    if (bio !== undefined) {
      updateData.bio = bio;
    }

    // Handle profile picture upload
    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Search users
// @route   GET /api/users/search?q=query
// @access  Private
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const currentUserId = req.user._id;

    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        {
          $or: [
            { username: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } }
          ]
        }
      ]
    })
    .select('username profilePicture bio')
    .limit(10);

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  searchUsers
}; 