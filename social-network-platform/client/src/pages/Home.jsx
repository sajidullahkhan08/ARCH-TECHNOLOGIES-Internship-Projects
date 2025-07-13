import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const { on } = useSocket();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts');
      setPosts(response.data.data.posts);
      setError(null);
    } catch (error) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Listen for new posts from friends
    on('newPost', (data) => {
      setPosts(prev => [data.post, ...prev]);
    });

    // Listen for new comments
    on('newComment', (data) => {
      setPosts(prev => prev.map(post => {
        if (post._id === data.postId) {
          return {
            ...post,
            comments: [...post.comments, data.comment],
            commentCount: post.commentCount + 1
          };
        }
        return post;
      }));
    });

    // Listen for new likes
    on('newLike', (data) => {
      setPosts(prev => prev.map(post => {
        if (post._id === data.postId) {
          const isLiked = post.likes.some(like => like._id === data.user._id);
          const updatedLikes = isLiked 
            ? post.likes.filter(like => like._id !== data.user._id)
            : [...post.likes, data.user];
          
          return {
            ...post,
            likes: updatedLikes,
            likeCount: updatedLikes.length
          };
        }
        return post;
      }));
    });
  }, [on]);

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(prev => prev.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card">
              <div className="loading h-4 w-1/3 mb-2"></div>
              <div className="loading h-4 w-full mb-2"></div>
              <div className="loading h-4 w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Home</h1>
      
      <PostForm onPostCreated={handlePostCreated} />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Start by creating a post or adding some friends!
            </p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={user}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={handlePostUpdated}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home; 