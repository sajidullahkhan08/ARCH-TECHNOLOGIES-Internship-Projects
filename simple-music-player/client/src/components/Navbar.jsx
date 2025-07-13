import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 px-4 py-3 flex items-center justify-between shadow">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-blue-400">🎵 Simple Music Player</span>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/player" className="hover:text-blue-400">Player</Link>
        {user ? (
          <button onClick={handleLogout} className="ml-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 