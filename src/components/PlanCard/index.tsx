// PlanCard.tsx
import React from 'react';
import { IPlan } from '../types';

interface PlanCardProps {
    plan: IPlan;
    onContractClick: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onContractClick }) => (
    <div className="p-6 m-2 bg-white shadow-md rounded-xl w-72 h-96 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
        <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">{plan.name_plan}</h2>
            <h3 className="text-xl mb-3 text-blue-500">{plan.price}</h3>
            <p className="text-sm mb-4 text-gray-600">{plan.details}</p>
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 shadow-sm transition-colors duration-300 w-full"
            onClick={onContractClick}
            data-id-plan={plan.id_plan} // Adicione esta propriedade com o valor do id_plan
        >
            Contrate já
        </button>
    </div>
);

export default PlanCard;
