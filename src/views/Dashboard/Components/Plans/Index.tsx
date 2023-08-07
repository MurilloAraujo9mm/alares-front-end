import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaMoneyBillWave, FaEdit, FaTrash } from 'react-icons/fa';
import { planController } from '../../../../services/api';
import { FiPlusCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

interface Plan {
    id_plan: number;
    name_plan: string;
    price: string;
    details: string;
    createdAt: string;
    updatedAt: string;
}

const formatCurrency = (value: number): string => {
    const options = {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat('pt-BR', options).format(value);
};

const AddPlanButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <FiPlusCircle size={20} />
            <span>Adicionar Plano</span>
        </button>
    );
};

const Plans: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const { register, handleSubmit, reset } = useForm<Plan>();

    const fetchPlans = async () => {
        try {
            const response = await planController.plans();
            setPlans(response);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch plans.', error);
            setError('Failed to fetch plans. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleAddPlan = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (data: Plan) => {
        try {
            if (!selectedPlan) {
                const newPlan = await planController.createPlan(data);
                setPlans((prevPlans) => [...prevPlans, newPlan]);
                toast.success('Plano cadastrado com sucesso!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {

                await planController.updatePlan(selectedPlan.id_plan, data);
                setPlans((prevPlans) =>
                    prevPlans.map((plan) => (plan.id_plan === selectedPlan.id_plan ? { ...plan, ...data } : plan))
                );

                toast.success('Plano atualizado com sucesso!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
            reset();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to add/update plan.', error);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleEditPlan = async (plan: Plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleDeletePlan = async (id: number) => {
        try {
            await planController.deletePlan(id);
            setPlans((prevPlans) => prevPlans.filter((plan) => plan.id_plan !== id));
            toast.error('Plano excluído com sucesso!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
        } catch (error) {
            console.error('Failed to delete plan.', error);
            setError('Failed to delete plan. Please try again later.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="p-4 lg:p-8 bg-gray-100 h-full">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Planos</h2>
                <div className="flex justify-end mb-4">
                    <AddPlanButton onClick={handleAddPlan} />
                </div>
            </div>

            {plans.map((plan) => (
                <article
                    key={plan.id_plan}
                    className="bg-white shadow-md rounded-md p-6 mb-6 transition duration-300 hover:shadow-lg"
                    data-plan-id={plan.id_plan} // Adicionando o atributo data-plan-id
                >
                    <div className="flex justify-between mb-4">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                                <FaUser className="text-blue-500 text-3xl inline-block align-middle" />
                                <span className="ml-2 align-middle">{plan.name_plan}</span>
                            </h3>
                            <p className="text-gray-500">{plan.details}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendar className="text-gray-500" />
                            <span className="text-gray-500">
                                {new Date(plan.createdAt).toLocaleDateString()} at {plan.updatedAt}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                        <div className="flex items-center space-x-2 my-3">
                            <FaMoneyBillWave className="text-green-500 text-xl" />
                            <span className="text-lg font-semibold text-green-500">{formatCurrency(parseFloat(plan.price))}</span>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
                                onClick={() => handleEditPlan(plan)}
                            >
                                <FaEdit className="text-xl" />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-600 transition duration-150 ease-in-out"
                                onClick={() => handleDeletePlan(plan.id_plan)}
                            >
                                <FaTrash className="text-xl" />
                            </button>
                        </div>
                    </div>
                </article>
            ))}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">{selectedPlan ? 'Editar Plano' : 'Adicionar Plano'}</h2>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-gray-600">Nome do Plano</label>
                                    <input
                                        type="text"
                                        {...register('name_plan', { required: 'Campo obrigatório' })}
                                        defaultValue={selectedPlan?.name_plan}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-gray-600">Preço</label>
                                    <input
                                        type="text"
                                        {...register('price', { required: 'Campo obrigatório' })}
                                        defaultValue={selectedPlan?.price}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-gray-600">Detalhes</label>
                                    <textarea
                                        {...register('details', { required: 'Campo obrigatório' })}
                                        defaultValue={selectedPlan?.details}
                                        style={{ minHeight: '100px', height: 'auto', resize: 'vertical' }}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                    {selectedPlan ? 'Salvar' : 'Adicionar'}
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

export default Plans;
