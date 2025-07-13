import React, { createContext, useState, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('volume');
    return saved ? Number(saved) : 1;
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem('volume', volume);
  }, [volume]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        progress,
        setProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}; 