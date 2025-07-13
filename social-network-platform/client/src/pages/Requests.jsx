import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, X, User } from 'lucide-react';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingRequest, setProcessingRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/friends/requests');
      setRequests(response.data.data);
      setError(null);
    } catch (error) {
      setError('Failed to load friend requests');
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    setProcessingRequest(requestId);
    try {
      await axios.put(`/api/friends/request/${requestId}/accept`);
      setRequests(prev => prev.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleDecline = async (requestId) => {
    setProcessingRequest(requestId);
    try {
      await axios.put(`/api/friends/request/${requestId}/decline`);
      setRequests(prev => prev.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error declining request:', error);
    } finally {
      setProcessingRequest(null);
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card">
              <div className="flex items-center space-x-4">
                <div className="loading w-12 h-12 rounded-full"></div>
                <div className="flex-1">
                  <div className="loading h-4 w-1/3 mb-2"></div>
                  <div className="loading h-4 w-1/2"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="loading w-8 h-8 rounded"></div>
                  <div className="loading w-8 h-8 rounded"></div>
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
        <Bell className="h-6 w-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-gray-900">Friend Requests</h1>
        <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {requests.length}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No pending requests</p>
          <p className="text-gray-400 text-sm">
            When someone sends you a friend request, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <div key={request._id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={request.senderId.profilePicture || '/default-avatar.png'}
                    alt={request.senderId.username}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48x48?text=U';
                    }}
                  />
                  <div>
                    <Link
                      to={`/profile/${request.senderId._id}`}
                      className="font-semibold text-gray-900 hover:text-primary-600 block"
                    >
                      {request.senderId.username}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {request.senderId.bio ? request.senderId.bio.substring(0, 50) + '...' : 'No bio'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Sent {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAccept(request._id)}
                    disabled={processingRequest === request._id}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
                    title="Accept request"
                  >
                    {processingRequest === request._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDecline(request._id)}
                    disabled={processingRequest === request._id}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                    title="Decline request"
                  >
                    {processingRequest === request._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests; 