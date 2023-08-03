import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaStore } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <FaStore className="text-2xl mr-2" />
                    Minha Loja
                </Link>
            </div>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/login" className="flex items-center">
                        <FaUser className="mr-1" />
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/products" className="flex items-center">
                        <FaShoppingCart className="mr-1" />
                        Produtos
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
