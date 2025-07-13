import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PlayerContext } from '../context/PlayerContext';

const MusicList = () => {
  const { token } = useContext(AuthContext);
  const { setCurrentTrack, setIsPlaying } = useContext(PlayerContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTracks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/music', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks(res.data);
    } catch (err) {
      setError('Failed to load music list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
    // eslint-disable-next-line
  }, []);

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this track?')) return;
    try {
      await axios.delete(`/api/music/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks(tracks.filter(t => t._id !== id));
    } catch (err) {
      alert('Failed to delete track');
    }
  };

  if (loading) return <div className="text-center py-8">Loading music...</div>;
  if (error) return <div className="text-center text-red-400 py-8">{error}</div>;
  if (!tracks.length) return <div className="text-center py-8">No music uploaded yet.</div>;

  return (
    <div className="space-y-2">
      {tracks.map(track => (
        <div key={track._id} className="flex items-center justify-between bg-gray-800 rounded px-4 py-2 shadow">
          <div>
            <div className="font-semibold">{track.title}</div>
            <div className="text-xs text-gray-400">{track.artist || 'Unknown Artist'} &bull; {track.duration}s</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => handlePlay(track)}
            >
              Play
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(track._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicList; 