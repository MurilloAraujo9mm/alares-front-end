import React, { useState } from 'react';
import { FaUser, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/auth';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loginResult = await login(username, password);
      if (loginResult) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      // Se for uma instância de erro, use a mensagem de erro. Caso contrário, use uma mensagem genérica.
      setError(error instanceof Error ? error.message : 'Erro ao realizar o login');
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 flex items-center">
            <FaExclamationCircle className="mr-2" />
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleLogin}>
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
              onChange={(e) => setEmail(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
