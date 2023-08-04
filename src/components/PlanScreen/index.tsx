import React, { useState, useEffect } from 'react';
import UserInfoModal from '../UserInfoModal';
import settings from './slide.config';
import PlanCard from '../PlanCard';
import Slider from 'react-slick';
import "./index.scss";
import { SampleNextArrow, SamplePrevArrow } from '../ArrowsSlick';
import { IPlan } from '../types';
import { planController } from '../../services/api';

const PlanScreen: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [plansData, setPlansData] = useState<IPlan[]>([]);

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


    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            {plansData && plansData.length > 0 ? (
                plansData.length >= 2 ? (
                    <div className="slider-container">
                        <Slider
                            {...settings}
                            nextArrow={<SampleNextArrow />}
                            prevArrow={<SamplePrevArrow />}
                        >
                            {plansData.map((plan, index) => (
                                <PlanCard key={index} plan={plan} onContractClick={handleOpenModal} />
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="w-128">
                        <div className="p-6 w-200 justify-center items-center transform hover:scale-105 transition-transform duration-300">
                            <PlanCard plan={plansData[0]} onContractClick={handleOpenModal} />
                        </div>
                    </div>
                )
            ) : (
                <div>Loading...</div>
            )}


            {isModalOpen && <UserInfoModal isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
    );
}

export default PlanScreen;
