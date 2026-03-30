import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MusicUpload from '../components/MusicUpload';
import MusicList from '../components/MusicList';
import AudioPlayer from '../components/AudioPlayer';

const Player = () => {
  const { user, token } = useContext(AuthContext);
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
    if (token) {
      fetchTracks();
    }
    // eslint-disable-next-line
  }, [token]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Music Library</h2>
      <MusicUpload onUpload={fetchTracks} />
      <div className="mt-8">
        <MusicList
          tracks={tracks}
          loading={loading}
          error={error}
          onDelete={(id) => setTracks(tracks.filter(t => t._id !== id))}
        />
      </div>
      <AudioPlayer tracks={tracks} />
    </div>
  );
};

export default Player;