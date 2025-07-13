import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  ThumbsUp,
  User
} from 'lucide-react';
import axios from 'axios';
import CommentList from './CommentList';

const PostCard = ({ post, currentUser, onPostDeleted, onPostUpdated }) => {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  const isOwnPost = post.userId._id === currentUser._id;
  const isLiked = post.likes.some(like => like._id === currentUser._id);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await axios.post(`/api/posts/${post._id}/like`);
      const { liked, likeCount } = response.data.data;
      
      const updatedPost = {
        ...post,
        likes: liked 
          ? [...post.likes, currentUser]
          : post.likes.filter(like => like._id !== currentUser._id),
        likeCount
      };
      
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`/api/posts/${post._id}`);
      onPostDeleted(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;

    try {
      const formData = new FormData();
      formData.append('content', editContent);
      if (editImage) {
        formData.append('image', editImage);
      }

      const response = await axios.put(`/api/posts/${post._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onPostUpdated(response.data.data);
      setIsEditing(false);
      setEditImage(null);
      setEditImagePreview(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      setEditImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="card">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.userId.profilePicture || '/default-avatar.png'}
            alt={post.userId.username}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40x40?text=U';
            }}
          />
          <div>
            <Link 
              to={`/profile/${post.userId._id}`}
              className="font-semibold text-gray-900 hover:text-primary-600"
            >
              {post.userId.username}
            </Link>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        
        {isOwnPost && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="3"
            maxLength="500"
          />
          
          {editImagePreview && (
            <div className="relative">
              <img
                src={editImagePreview}
                alt="Preview"
                className="max-h-64 rounded-lg object-cover"
              />
              <button
                onClick={() => {
                  setEditImage(null);
                  setEditImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(post.content);
                  setEditImage(null);
                  setEditImagePreview(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={!editContent.trim()}
                className="btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-900 mb-4 whitespace-pre-wrap">{post.content}</p>
          
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-lg object-cover mb-4"
            />
          )}
        </>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-500 transition-colors`}
          >
            {isLiked ? (
              <Heart className="h-5 w-5 fill-current" />
            ) : (
              <ThumbsUp className="h-5 w-5" />
            )}
            <span>{post.likeCount}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post.commentCount}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <CommentList postId={post._id} currentUser={currentUser} />
      )}
    </div>
  );
};

export default PostCard; 