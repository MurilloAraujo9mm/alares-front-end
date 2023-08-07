import React, { useState, useEffect } from 'react';
import UserInfoModal from '../UserInfoModal';
import settings from './slide.config';
import PlanCard from '../PlanCard';
import Slider from 'react-slick';
import { IPlan } from '../types';
import { planController } from '../../services/api';
import './index.scss';
import Header from '../Header';

const PlanScreen: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [plansData, setPlansData] = useState<IPlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

    useEffect(() => {
        fetchPlansData();
    }, []);

    const fetchPlansData = async () => {
        try {
            const response = await planController.plans();
            setPlansData(response);
        } catch (error) {
            console.error('Failed to fetch plans data.', error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPlanId(null);
    };

    const handleContractClick = (planId: number) => {
        setSelectedPlanId(planId);
        setModalOpen(true);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                {plansData && plansData.length > 0 ? (
                    plansData.length >= 2 ? (
                        <div className="slider-container">
                            <Slider {...settings}>
                                {plansData.map((plan, index) => (
                                    <PlanCard key={index} plan={plan} onContractClick={() => handleContractClick(plan.id_plan)} />
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        <div className="w-128">
                            <div className="p-6 w-200 justify-center items-center">
                                <PlanCard plan={plansData[0]} onContractClick={() => handleContractClick(plansData[0].id_plan)} />
                            </div>
                        </div>
                    )
                ) : (
                    <div className="w-128">
                        <div className="p-6 w-200 justify-center items-center">
                            <p>Não existem planos disponíveis.</p>
                        </div>
                    </div>
                )}

                {isModalOpen && <UserInfoModal isOpen={isModalOpen} onClose={handleCloseModal} selectedPlanId={selectedPlanId} />}
            </div>
        </>
    );
};

export default PlanScreen;
