import React, { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { AuthContext } from '../context/AuthContext';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z" />
  </svg>
);
const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);
const NextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 19.5l7.5-7.5-7.5-7.5M5.25 19.5l7.5-7.5-7.5-7.5" />
  </svg>
);
const PrevIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5l-7.5-7.5 7.5-7.5M18.75 19.5l-7.5-7.5 7.5-7.5" />
  </svg>
);
const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4.5l3 3V6l-3 3H9z" />
  </svg>
);

const AudioPlayer = ({ tracks }) => {
  const {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    progress,
    setProgress,
  } = useContext(PlayerContext);
  const { token } = useContext(AuthContext);
  const audioRef = useRef();

  // Play/pause effect
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Volume effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Progress effect
  useEffect(() => {
    if (!audioRef.current) return;
    const update = () => setProgress(audioRef.current.currentTime);
    audioRef.current.addEventListener('timeupdate', update);
    return () => audioRef.current.removeEventListener('timeupdate', update);
  }, [setProgress, currentTrack]);

  // Track end handler
  const handleEnded = () => {
    if (!tracks || !tracks.length) return;
    const idx = tracks.findIndex(t => t._id === currentTrack?._id);
    if (idx !== -1 && idx < tracks.length - 1) {
      setCurrentTrack(tracks[idx + 1]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (!tracks || !tracks.length) return;
    const idx = tracks.findIndex(t => t._id === currentTrack?._id);
    if (idx > 0) {
      setCurrentTrack(tracks[idx - 1]);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!tracks || !tracks.length) return;
    const idx = tracks.findIndex(t => t._id === currentTrack?._id);
    if (idx !== -1 && idx < tracks.length - 1) {
      setCurrentTrack(tracks[idx + 1]);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setProgress(Number(e.target.value));
    }
  };

  if (!currentTrack) return <div className="text-center py-8 text-gray-400">Select a track to play</div>;

  return (
    <div className="bg-gray-800 rounded p-4 shadow max-w-xl mx-auto mt-6">
      <div className="mb-2">
        <div className="font-semibold text-lg">{currentTrack.title}</div>
        <div className="text-xs text-gray-400">{currentTrack.artist || 'Unknown Artist'} &bull; {currentTrack.duration}s</div>
      </div>
      <audio
        ref={audioRef}
        src={`/api/music/${currentTrack._id}`}
        controls={false}
        onEnded={handleEnded}
        onLoadedMetadata={e => setProgress(e.target.currentTime)}
        style={{ width: '100%' }}
        crossOrigin="anonymous"
        preload="auto"
        {...(token ? { headers: { Authorization: `Bearer ${token}` } } : {})}
      />
      <div className="flex items-center gap-2 mt-2">
        <button onClick={handlePrev} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600" aria-label="Previous">
          <PrevIcon />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button onClick={handleNext} className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600" aria-label="Next">
          <NextIcon />
        </button>
        <input
          type="range"
          min={0}
          max={currentTrack.duration}
          value={progress}
          onChange={handleSeek}
          className="flex-1 mx-2 accent-blue-500"
        />
        <span className="mr-2"><VolumeIcon /></span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="w-24 accent-blue-500"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default AudioPlayer; 