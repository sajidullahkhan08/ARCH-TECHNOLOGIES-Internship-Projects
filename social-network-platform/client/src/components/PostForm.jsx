import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Image, X, Send } from 'lucide-react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setImage(file);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter some content');
      return;
    }

    if (content.length > 500) {
      setError('Post content cannot exceed 500 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newPost = response.data.data;
      onPostCreated(newPost);
      
      // Reset form
      setContent('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create post';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-start space-x-3">
        <img
          src={user?.profilePicture || '/default-avatar.png'}
          alt={user?.username}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/40x40?text=U';
          }}
        />
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows="3"
              maxLength="500"
            />
            
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
            
            {imagePreview && (
              <div className="mt-3 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Image className="h-5 w-5 text-gray-500 hover:text-primary-600 cursor-pointer" />
                </label>
                <span className="text-sm text-gray-500">
                  {content.length}/500
                </span>
              </div>
              
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm; 