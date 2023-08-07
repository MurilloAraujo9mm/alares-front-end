import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../components/auth/auth';
import Topbar from './Topbar';
import Sidebar from './SideBar';
import "./index.scss";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Topbar />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
