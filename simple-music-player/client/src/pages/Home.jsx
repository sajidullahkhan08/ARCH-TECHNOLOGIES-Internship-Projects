import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to Simple Music Player</h1>
    <p className="mb-6 text-lg text-gray-300 max-w-xl text-center">
      Upload, store, and play your favorite music files securely in the cloud. Enjoy a modern, responsive music player built with the MERN stack and Tailwind CSS.
    </p>
    <Link to="/player" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg shadow">
      Go to Player
    </Link>
  </div>
);

export default Home; 