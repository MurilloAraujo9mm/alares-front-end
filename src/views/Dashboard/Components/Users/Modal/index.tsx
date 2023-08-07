import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import { AiOutlineLoading } from 'react-icons/ai';

interface User {
  id_user: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

const ModalUpdateUser: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="p-4 lg:p-8 bg-gray-100 h-full">
      {/* ... restante do código ... */}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Editar Usuário</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="text-gray-600">Nome</label>
                <input
                  type="text"
                  value={selectedUser.first_name}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="text-gray-600">Sobrenome</label>
                <input
                  type="text"
                  value={selectedUser.last_name}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label className="text-gray-600">Telefone</label>
                <input
                  type="text"
                  value={selectedUser.phone}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="col-span-2">
                <label className="text-gray-600">Email</label>
                <input
                  type="text"
                  value={selectedUser.email}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            {/* ... (outros campos para edição) */}
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModalUpdateUser;
