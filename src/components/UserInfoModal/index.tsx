import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCheck, FaExclamationCircle, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import './index.scss';
import { planController } from '../../services/api';

interface UserInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

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
            setShowSuccessMessage(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const formData = new FormData(formRef.current!);

        const userData = {
            first_name: formData.get('userName'),
            phone: formData.get('userPhone'),
            email: formData.get('userEmail'),
        };

        try {
            await planController.createUser(userData);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Falha ao criar usuário.', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
            {showSpinner && <div className="spinner"></div>}
            {isLoading && <div className="loading-bar"></div>}
            {showModal && (
                <div className="modal-content">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
                        <FaTimes className="h-6 w-6" />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Contrate um plano</h2>
                    {!showSuccessMessage ? (
                        <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 w-full">
                                    <span className="flex items-center text-center  ">
                                        <FaCheck className="mr-2" />
                                        Contratar plano
                                    </span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4 w-full">
                            <FaCheck className="mr-2" />
                            Plano contratado com sucesso
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserInfoModal;
