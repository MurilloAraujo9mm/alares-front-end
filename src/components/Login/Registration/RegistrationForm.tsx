import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import { planController } from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormProps {
    onRegisterSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/login');
    };


    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const response = await planController.authCreate(username, password, email);

            if (!response?.response?.data) {
                toast.success('Usuário cadastrado com sucesso!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setError('');
                return;
            }

            if (response.response?.data?.message) {
                setError(response.response.data.message);
            }
        } catch (error) {
            console.log(error);
            setError(error instanceof Error ? error.message : 'Erro ao cadastrar o usuário');
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleRegister}>
            {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4 flex items-center">
                    <FaExclamationCircle className="mr-2" />
                    <span>{error}</span>
                </div>
            )}
            <div className="flex items-center border rounded-md">
                <span className="py-3 px-4">
                    <FaUser className="text-gray-500" />
                </span>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Usuario"
                    className="border-none focus:outline-none flex-1 py-3 px-4 rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex items-center border rounded-md">
                <span className="py-3 px-4">
                    <FaLock className="text-gray-500" />
                </span>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    required
                    className="border-none focus:outline-none flex-1 py-3 px-4 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center border rounded-md">
                <span className="py-3 px-4">
                    <FaEnvelope className="text-gray-500" />
                </span>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="border-none focus:outline-none flex-1 py-3 px-4 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md w-full"
            >
                Cadastrar
            </button>
            <button
                type="button"
                className="text-blue-500 hover:text-blue-600"
                onClick={handleBackToLogin}
            >
                Voltar para o login
            </button>
            <ToastContainer />
        </form>

    );
};

export default RegistrationForm;
