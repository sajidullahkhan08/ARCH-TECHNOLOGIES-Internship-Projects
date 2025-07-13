import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Users, Edit, Send } from 'lucide-react';
import PostCard from '../components/PostCard';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: '',
    profilePicture: null
  });
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [sendingRequest, setSendingRequest] = useState(false);

  const isOwnProfile = currentUser?._id === id;

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/${id}`);
      const { user, posts } = response.data.data;
      setProfile(user);
      setPosts(posts);
      setEditData({ bio: user.bio || '' });
      setError(null);
    } catch (error) {
      setError('Failed to load profile');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

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

      setEditData(prev => ({ ...prev, profilePicture: file }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('bio', editData.bio);
      if (editData.profilePicture) {
        formData.append('image', editData.profilePicture);
      }

      const response = await axios.put(`/api/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(response.data.data);
      setIsEditing(false);
      setEditData({ bio: response.data.data.bio || '' });
      setEditData({ profilePicture: null });
      setEditImagePreview(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSendRequest = async () => {
    if (sendingRequest) return;

    setSendingRequest(true);
    try {
      await axios.post('/api/friends/request', { receiverId: id });
      // Update profile to show request sent
      setProfile(prev => ({ ...prev, requestSent: true }));
    } catch (error) {
      console.error('Error sending friend request:', error);
    } finally {
      setSendingRequest(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="loading h-8 w-1/3 mb-4"></div>
          <div className="loading h-4 w-full mb-2"></div>
          <div className="loading h-4 w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={profile.profilePicture || '/default-avatar.png'}
              alt={profile.username}
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/96x96?text=U';
              }}
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700">
                <Edit className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {profile.username}
                </h1>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Write something about yourself..."
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                    maxLength="200"
                  />
                ) : (
                  <p className="text-gray-600 mb-4">
                    {profile.bio || 'No bio yet'}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {isOwnProfile ? (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                ) : (
                  !profile.isFriend && (
                    <button
                      onClick={handleSendRequest}
                      disabled={sendingRequest || profile.requestSent}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                    >
                      {sendingRequest ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>{profile.requestSent ? 'Request Sent' : 'Send Request'}</span>
                        </>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
            
            {isEditing && (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({ bio: profile.bio || '', profilePicture: null });
                    setEditImagePreview(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            )}
            
            {editImagePreview && (
              <div className="mt-4 relative">
                <img
                  src={editImagePreview}
                  alt="Preview"
                  className="max-h-32 rounded-lg object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{profile.friends?.length || 0} friends</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Member since {new Date(profile.createdAt).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet</p>
            {isOwnProfile && (
              <p className="text-gray-400 text-sm mt-2">
                Start sharing your thoughts!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                currentUser={currentUser}
                onPostDeleted={(postId) => {
                  setPosts(prev => prev.filter(post => post._id !== postId));
                }}
                onPostUpdated={(updatedPost) => {
                  setPosts(prev => prev.map(post => 
                    post._id === updatedPost._id ? updatedPost : post
                  ));
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 