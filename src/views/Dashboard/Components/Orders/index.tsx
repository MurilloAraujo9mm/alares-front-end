import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaInfoCircle, FaEdit, FaTrash, FaMoneyBillWave } from 'react-icons/fa';
import { planController } from '../../../../services/api';  

type User = {
  id_user: number;
  first_name: string;
  phone: string;
  email: string;
};

type Plan = {
  id_plan: number;
  name_plan: string;
  price: string;
  details: string;
};

type Order = {
  date_order: string;
  hour_order: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  plan: Plan;
};


const Orders: React.FC = () => {

  const [ordersData, setOrderData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await planController.getAllOrders();
        setOrderData(response);
      } catch (error) {
        console.error('Failed to fetch orders.', error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <section className="p-4 lg:p-8 bg-gray-100 h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Pedidos</h2>
        <p className="text-gray-500">Aqui estão os detalhes de todos os pedidos realizados.</p>
      </div>

      {ordersData.map((order, index) => (
        <article
          key={index}
          className="bg-white shadow-md rounded-md p-6 mb-6 transition duration-300 hover:shadow-lg"
        >
          <div className="flex justify-between mb-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                <FaUser className="text-blue-500 text-3xl inline-block align-middle" />
                <span className="ml-2 align-middle">{order.user.first_name}</span>
              </h3>
              <p className="text-gray-500">{order.user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendar className="text-gray-500" />
              <span className="text-gray-500">
                {new Date(order.date_order).toLocaleDateString()} at {order.hour_order}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="text-lg font-semibold mb-3">{order.plan.name_plan}</h4>
            <p className="text-gray-600">{order.plan.details}</p>
            <div className="flex items-center space-x-2 my-3">
              <FaMoneyBillWave className="text-green-500 text-xl" />
              <span className="text-lg font-semibold text-green-500">R$ {order.plan.price}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out">
                <FaEdit className="text-xl" />
              </button>
              <button className="text-red-500 hover:text-red-600 transition duration-150 ease-in-out">
                <FaTrash className="text-xl" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Orders;
