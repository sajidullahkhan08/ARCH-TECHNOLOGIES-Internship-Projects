import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PlayerContext } from '../context/PlayerContext';

const MusicList = ({ tracks, loading, error, onDelete }) => {
  const { token } = useContext(AuthContext);
  const { setCurrentTrack, setIsPlaying, currentTrack } = useContext(PlayerContext);

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
      if (onDelete) onDelete(id);
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
        <div
          key={track._id}
          className={`flex items-center justify-between rounded px-4 py-2 shadow ${
            currentTrack?._id === track._id ? 'bg-blue-900 ring-2 ring-blue-500' : 'bg-gray-800'
          }`}
        >
          <div>
            <div className="font-semibold">{track.title}</div>
            <div className="text-xs text-gray-400">{track.artist || 'Unknown Artist'} &bull; {track.duration}s</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => handlePlay(track)}
            >
              {currentTrack?._id === track._id ? 'Playing' : 'Play'}
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