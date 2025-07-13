const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    const { content } = req.body;
    const userId = req.user._id;

    const postData = {
      userId,
      content
    };

    // Handle image upload
    if (req.file) {
      postData.image = `/uploads/${req.file.filename}`;
    }

    const post = new Post(postData);
    await post.save();

    // Populate user data
    await post.populate('userId', 'username profilePicture');

    // Emit real-time update to friends
    const io = req.app.get('io');
    const user = await User.findById(userId).populate('friends');
    
    if (user.friends && user.friends.length > 0) {
      user.friends.forEach(friend => {
        io.to(friend._id.toString()).emit('newPost', {
          post: {
            _id: post._id,
            content: post.content,
            image: post.image,
            userId: {
              _id: post.userId._id,
              username: post.userId.username,
              profilePicture: post.userId.profilePicture
            },
            likes: [],
            comments: [],
            likeCount: 0,
            commentCount: 0,
            createdAt: post.createdAt
          }
        });
      });
    }

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get all posts (friends and self)
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const user = await User.findById(userId);
    const friendIds = user.friends || [];
    friendIds.push(userId); // Include own posts

    const posts = await Post.find({ userId: { $in: friendIds } })
      .populate('userId', 'username profilePicture')
      .populate('likes', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments({ userId: { $in: friendIds } });

    res.json({
      success: true,
      data: {
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this post' 
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

    const updateData = { content };

    // Handle image upload
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'username profilePicture');

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    // Check if user owns the post
    if (post.userId.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this post' 
      });
    }

    // Delete associated comments
    await Comment.deleteMany({ postId: id });

    // Delete the post
    await Post.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Like/unlike a post
// @route   POST /api/posts/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    const isLiked = post.isLikedBy(userId);
    const liked = post.toggleLike(userId);
    await post.save();

    // Emit real-time update to post owner
    if (post.userId.toString() !== userId.toString()) {
      const io = req.app.get('io');
      const user = await User.findById(userId).select('username');
      
      io.to(post.userId.toString()).emit('newLike', {
        postId: post._id,
        user: {
          _id: user._id,
          username: user.username
        },
        liked
      });
    }

    res.json({
      success: true,
      message: liked ? 'Post liked' : 'Post unliked',
      data: {
        liked,
        likeCount: post.likeCount
      }
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Add comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: errors.array() 
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    const comment = new Comment({
      postId: id,
      userId,
      content
    });

    await comment.save();
    await comment.populate('userId', 'username profilePicture');

    // Add comment to post
    post.comments.push(comment._id);
    await post.save();

    // Emit real-time update to post owner and friends
    const io = req.app.get('io');
    const user = await User.findById(userId).populate('friends');
    
    // Notify post owner
    if (post.userId.toString() !== userId.toString()) {
      io.to(post.userId.toString()).emit('newComment', {
        postId: post._id,
        comment: {
          _id: comment._id,
          content: comment.content,
          userId: {
            _id: comment.userId._id,
            username: comment.userId.username,
            profilePicture: comment.userId.profilePicture
          },
          createdAt: comment.createdAt
        }
      });
    }

    // Notify friends
    if (user.friends && user.friends.length > 0) {
      user.friends.forEach(friend => {
        if (friend._id.toString() !== post.userId.toString()) {
          io.to(friend._id.toString()).emit('newComment', {
            postId: post._id,
            comment: {
              _id: comment._id,
              content: comment.content,
              userId: {
                _id: comment.userId._id,
                username: comment.userId.username,
                profilePicture: comment.userId.profilePicture
              },
              createdAt: comment.createdAt
            }
          });
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get comments for a post
// @route   GET /api/posts/:id/comments
// @access  Private
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Post not found' 
      });
    }

    const comments = await Comment.find({ postId: id })
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Comment.countDocuments({ postId: id });

    res.json({
      success: true,
      data: {
        comments,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  getComments
}; 