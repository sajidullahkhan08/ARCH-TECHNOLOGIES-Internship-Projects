import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserMinus, User } from 'lucide-react';
import axios from 'axios';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingFriend, setRemovingFriend] = useState(null);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/friends');
      setFriends(response.data.data);
      setError(null);
    } catch (error) {
      setError('Failed to load friends');
      console.error('Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleRemoveFriend = async (friendId) => {
    if (!window.confirm('Are you sure you want to remove this friend?')) {
      return;
    }

    setRemovingFriend(friendId);
    try {
      await axios.delete(`/api/friends/${friendId}`);
      setFriends(prev => prev.filter(friend => friend._id !== friendId));
    } catch (error) {
      console.error('Error removing friend:', error);
    } finally {
      setRemovingFriend(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card">
              <div className="flex items-center space-x-4">
                <div className="loading w-12 h-12 rounded-full"></div>
                <div className="flex-1">
                  <div className="loading h-4 w-1/3 mb-2"></div>
                  <div className="loading h-4 w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {friends.length}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {friends.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No friends yet</p>
          <p className="text-gray-400 text-sm">
            Start connecting with people by sending friend requests!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map(friend => (
            <div key={friend._id} className="card">
              <div className="flex items-center space-x-4">
                <img
                  src={friend.profilePicture || '/default-avatar.png'}
                  alt={friend.username}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/48x48?text=U';
                  }}
                />
                <div className="flex-1">
                  <Link
                    to={`/profile/${friend._id}`}
                    className="font-semibold text-gray-900 hover:text-primary-600 block"
                  >
                    {friend.username}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {friend.bio ? friend.bio.substring(0, 50) + '...' : 'No bio'}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${
                      friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-xs text-gray-500">
                      {friend.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend._id)}
                  disabled={removingFriend === friend._id}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove friend"
                >
                  {removingFriend === friend._id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  ) : (
                    <UserMinus className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends; 