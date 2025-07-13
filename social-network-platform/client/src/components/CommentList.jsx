import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, User } from 'lucide-react';
import axios from 'axios';

const CommentList = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/${postId}/comments`);
      setComments(response.data.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const response = await axios.post(`/api/posts/${postId}/comment`, {
        content: newComment
      });

      const comment = response.data.data;
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add comment';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-start space-x-3">
          <img
            src={currentUser?.profilePicture || '/default-avatar.png'}
            alt={currentUser?.username}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/32x32?text=U';
            }}
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="2"
              maxLength="200"
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">
                {newComment.length}/200
              </span>
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Comment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="loading w-8 h-8 rounded-full"></div>
              <div className="flex-1">
                <div className="loading h-4 w-1/3 mb-2"></div>
                <div className="loading h-4 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="flex items-start space-x-3">
                <img
                  src={comment.userId.profilePicture || '/default-avatar.png'}
                  alt={comment.userId.username}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/32x32?text=U';
                  }}
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Link
                        to={`/profile/${comment.userId._id}`}
                        className="font-semibold text-sm text-gray-900 hover:text-primary-600"
                      >
                        {comment.userId.username}
                      </Link>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-900 text-sm whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentList; 