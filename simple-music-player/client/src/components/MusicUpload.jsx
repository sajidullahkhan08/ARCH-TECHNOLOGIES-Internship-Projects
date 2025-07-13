import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MusicUpload = ({ onUpload }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setError('');
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== 'audio/mp3' && f.type !== 'audio/mpeg') {
      setError('Only MP3 files are allowed');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setFile(f);
    // Get duration
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => {
      setDuration(Math.round(audio.duration));
    };
    audio.onerror = () => setError('Could not read audio duration');
    audio.src = URL.createObjectURL(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file || !title || !duration) {
      setError('All fields are required and file must be valid');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('duration', duration);
      await axios.post('/api/music/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setTitle('');
      setArtist('');
      setFile(null);
      setDuration('');
      if (onUpload) onUpload();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-gray-800 p-4 rounded shadow">
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Artist (optional)</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          value={artist}
          onChange={e => setArtist(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">MP3 File (max 10MB)</label>
        <input
          type="file"
          accept="audio/mp3,audio/mpeg"
          className="w-full text-white"
          onChange={handleFileChange}
          required
        />
      </div>
      {duration && <div className="text-xs text-gray-400">Duration: {duration} seconds</div>}
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default MusicUpload; 