import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaStore, FaChartBar } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';

const Header = () => {

  const [token] = useState<string | any>(localStorage.getItem("token"))


  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <FaStore className="text-2xl mr-2" />
          Minha Loja
        </Link>
      </div>
      <ul className="flex space-x-4">
        {token ? (
          <>
            <li>
              <Link to="/dashboard" className="flex items-center">
                <FaChartBar className="mr-1" />
                Dashboard
              </Link>
            </li>
           
          </>
        ) : (
          <li>
            <Link to="/login" className="flex items-center">
              <FaUser className="mr-1" />
              Login
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
