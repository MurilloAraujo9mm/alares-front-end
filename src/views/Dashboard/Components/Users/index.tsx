import React, { useEffect, useState } from 'react';
import { planController } from '../../../../services/api';
import { FiEdit, FiTrash2, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    id_user: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
}

const Users: React.FC = () => {
    const [usersWithOrders, setUsersWithOrders] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await planController.findAllUsersWithOrders();
                setUsersWithOrders(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch users.', error);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const updateUser = async (user: User): Promise<User> => {
        try {
            const response = await planController.updateUserWithOrder(user.id_user, {
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                email: user.email,
            });
            return response;
        } catch (error) {
            throw new Error('Failed to update user.');
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            if (selectedUser) {
                const updatedUser = await updateUser(selectedUser);

                setUsersWithOrders((prevUsers) =>
                    prevUsers.map((user) => (user.id_user === updatedUser.id_user ? updatedUser : user))
                );

                closeModal();
                toast.success('Usuário atualizado com sucesso!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (id: number) => {
        console.log('Delete user with ID:', id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="p-4 lg:p-8 bg-gray-100 h-full">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Usuários</h2>
                <p className="text-gray-600">Aqui estão os detalhes de todos os usuários.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <AiOutlineLoading size={30} className="animate-spin text-blue-500" />
                </div>
            ) : (
                <div>
                    {usersWithOrders.map((user) => (
                        <article
                            key={user.id_user}
                            data-user-id={user.id_user}
                            className="bg-white shadow-md rounded-md p-6 mb-6 transition duration-300 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500">
                                        <FiUser size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{`${user.first_name}`}</h3>
                                        <p className="text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        <FiEdit size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                        onClick={() => handleDeleteUser(user.id_user)}
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center space-x-4 mt-3">
                                    <FiPhone size={18} className="text-gray-500" />
                                    <span className="text-gray-600">{user.phone}</span>
                                </div>
                                <div className="flex items-center space-x-4 mt-3">
                                    <FiMail size={18} className="text-gray-500" />
                                    <span className="text-gray-600">{user.email}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Editar Usuário</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="text-gray-600">Nome</label>
                                    <input
                                        type="text"
                                        value={selectedUser.first_name}
                                        onChange={(e) =>
                                            setSelectedUser({
                                                ...selectedUser,
                                                first_name: e.target.value,
                                            })
                                        }
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-gray-600">Telefone</label>
                                    <input
                                        type="text"
                                        value={selectedUser.phone}
                                        onChange={(e) =>
                                            setSelectedUser({
                                                ...selectedUser,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-gray-600">Email</label>
                                    <input
                                        type="text"
                                        value={selectedUser.email}
                                        onChange={(e) =>
                                            setSelectedUser({
                                                ...selectedUser,
                                                email: e.target.value,
                                            })
                                        }
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </section>
    );
};

export default Users;
