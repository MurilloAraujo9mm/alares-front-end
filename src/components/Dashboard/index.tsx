import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => logout()}>Sair</button>
    </div>
  );
};

export default Dashboard;
