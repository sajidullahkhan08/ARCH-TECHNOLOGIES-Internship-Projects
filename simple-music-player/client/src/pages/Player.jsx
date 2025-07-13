import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MusicUpload from '../components/MusicUpload';
import MusicList from '../components/MusicList';
import AudioPlayer from '../components/AudioPlayer';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const { user } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const { currentTrack } = useContext(PlayerContext);

  if (!user) return <Navigate to="/login" />;

  // MusicList will update tracks state via callback
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Music Library</h2>
      <MusicUpload onUpload={() => window.location.reload()} />
      <div className="mt-8">
        <MusicList />
      </div>
      <AudioPlayer tracks={tracks} />
    </div>
  );
};

export default Player; 