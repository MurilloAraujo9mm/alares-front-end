import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaUser, FaPhone, FaEnvelope, FaCheck } from 'react-icons/fa';
import "./index.scss";

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
            }, 1000);
        } else {
            setShowModal(false);
            setShowSpinner(false);
        }
    }, [isOpen]);

    return (
        <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
            {showSpinner && <div className="spinner"></div>}
            {showModal && (
                <div className="modal-content">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
                        <FaTimes className="h-6 w-6" />
                    </button>
                    <div className="flex justify-end">
                            <button onClick={onClose} className="text-gray-600 hover:text-gray-800 flex items-center">
                                <FaTimes className="mr-2" />
                                Close
                            </button>
                        </div>
                    <h2 className="text-2xl font-bold mb-4">Capture User Info</h2>
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="userName" className="text-md font-medium mb-1 flex items-center">
                                <FaUser className="mr-2" />
                                Nome:
                            </label>
                            <input type="text" id="userName" name="userName" required className="p-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userPhone" className="text-md font-medium mb-1 flex items-center">
                                <FaPhone className="mr-2" />
                                Celular/telefone:
                            </label>
                            <input type="tel" id="userPhone" name="userPhone" required className="p-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="userEmail" className="text-md font-medium mb-1 flex items-center">
                                <FaEnvelope className="mr-2" />
                                Email:
                            </label>
                            <input type="email" id="userEmail" name="userEmail" required className="p-2 border rounded-md" />
                        </div>
                      
                        <div className="flex">
                            <button type="submit" className="flex justify-center align-middle bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 w-full">
                                <FaCheck className="mr-2" />
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default UserInfoModal;
