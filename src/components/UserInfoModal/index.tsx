import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.scss";

import { FaTimes, FaCheckCircle } from 'react-icons/fa';

interface UserInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowSpinner(true);
            setTimeout(() => {
                setShowModal(true);
                setShowSpinner(false);
            }, 1000); // Show spinner for 1 second
        } else {
            setShowModal(false);
            setShowSpinner(false);
        }
    }, [isOpen]);

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-500 transform ${showModal ? 'translate-y-0' : '-translate-y-full'}`} style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            
            {showSpinner && <div className="spinner"></div>}

            {showModal && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 relative transition-transform transform">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
                        <FaTimes className="h-6 w-6" />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Capture User Info</h2>
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="userName" className="text-md font-medium mb-1">Name:</label>
                            <input type="text" id="userName" name="userName" required className="p-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userPhone" className="text-md font-medium mb-1">Phone:</label>
                            <input type="tel" id="userPhone" name="userPhone" required className="p-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userEmail" className="text-md font-medium mb-1">Email:</label>
                            <input type="email" id="userEmail" name="userEmail" required className="p-2 border rounded-md" />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Submit</button>
                            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
                        </div>
                    </form>
                </div>
            )}

        </div>,
        document.getElementById('modal-root') as Element
    );
}

export default UserInfoModal;
