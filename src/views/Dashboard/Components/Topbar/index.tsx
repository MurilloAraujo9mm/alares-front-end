import React from 'react';
import { FaUserCircle, FaCog } from 'react-icons/fa';

const Topbar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 pl-64">
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-flex">Welcome, Admin</span>
            <FaUserCircle size={24} className="mr-2" />
            <div className="hidden md:block">
              <FaCog size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
