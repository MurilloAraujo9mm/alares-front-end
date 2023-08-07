// Login.tsx
import React, { useState } from 'react';
import { FaUser, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/auth';
import RegistrationForm from './Registration/RegistrationForm';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Informe username ou password');
      return;
    }

    try {
      const loginResult = await login(username, password);
      if (loginResult) {
        navigate('/dashboard/orders');
      } else {
        setError('Credenciais inválidas');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao realizar o login');
    }
  };

  const handleRegisterSuccess = () => {
    setIsRegistrationSuccess(true);
    setError('Usuário cadastrado com sucesso. Faça o login para continuar.');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isRegistering ? 'Cadastrar Usuário' : 'Login'}
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 flex items-center">
            <FaExclamationCircle className="mr-2" />
            {error}
          </div>
        )}
        {isRegistering ? (
          <RegistrationForm onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <form
            className="space-y-4"
            onSubmit={handleLogin}
          >
            <div className="flex items-center border rounded-md">
              <span className="py-3 px-4">
                <FaUser className="text-gray-500" />
              </span>
              <input
                type="text"
                id="username"
                name="username"
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
                className="border-none focus:outline-none flex-1 py-3 px-4 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md w-full"
            >
              Entrar
            </button>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600"
              onClick={() => {
                setIsRegistrationSuccess(false);
                setIsRegistering(true);
              }}
            >
              Cadastrar novo usuário
            </button>
          </form>
        )}
        {isRegistrationSuccess && (
          <div className="text-green-700 p-4 rounded-md mb-4 text-center">
            Usuário cadastrado com sucesso. Faça o login para continuar.
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
