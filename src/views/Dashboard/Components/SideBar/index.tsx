import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaProductHunt, FaSignOutAlt, FaArrowLeft, FaBars, FaAnchor } from 'react-icons/fa';
import { logout } from '../../../../components/auth/auth';
import { motion } from 'framer-motion';
import "./index.scss";

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: isSidebarOpen ? -300 : 0 }}
                animate={{ opacity: 1, x: isSidebarOpen ? 0 : -300 }}
                transition={{ duration: 0.5 }}
                className="sidebar h-full bg-gray-800 w-64 fixed top-0 left-0 p-6 flex flex-col justify-center"
            >
                <div className="text-white text-2xl mb-12 self-center">
                    Alared admin
                </div>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard/orders" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                            <FaBox className="mr-4" />
                            Pedidos
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/users" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                            <FaUsers className="mr-4" />
                            Usuários
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/plans" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                            <FaProductHunt className="mr-4" />
                            Planos
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                            <button onClick={() => window.location.href = "/"} className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md w-full text-left">
                                <FaArrowLeft className="mr-4" />
                                Voltar
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
                            <button onClick={() => logout()} className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md w-full text-left">
                                <FaSignOutAlt className="mr-4" />
                                Sair
                            </button>
                        </Link>
                    </li>
                </ul>
            </motion.div>
            {isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-2 left-4 mt-2 text-white focus:outline-none"
                >
                    <FaArrowLeft className="text-2xl" />
                </button>
            )}
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-2 left-4 mt-2 text-white focus:outline-none"
                >
                    <FaBars className="text-2xl" />
                </button>
            )}
        </>
    );
};

export default Sidebar;
