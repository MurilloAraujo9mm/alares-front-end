import React, { useState } from 'react';
import { IPlan } from '../types';

interface PlanCardProps {
    plan: IPlan;
    onContractClick: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onContractClick }) => (
    <div className="p-6 m-2 bg-white shadow-md rounded-xl w-72 h-96 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
        <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">{plan.name}</h2>
            <h3 className="text-xl mb-3 text-blue-500">{plan.speed}</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 overflow-y-auto">
                {plan.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                ))}
            </ul>
        </div>
        <button 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 shadow-sm transition-colors duration-300 w-full"
            onClick={onContractClick}
        >
            Contrate já
        </button>
    </div>
);


export default PlanCard;
