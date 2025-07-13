import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) return <Navigate to="/player" />;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <LoginForm onSuccess={() => navigate('/player')} />
    </div>
  );
};

export default Login; 