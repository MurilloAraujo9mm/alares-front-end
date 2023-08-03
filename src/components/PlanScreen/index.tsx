import React, { useState } from 'react';
import UserInfoModal from '../UserInfoModal';
import { plansData } from '../mocks/plans.mock';
import settings from './slide.config';
import PlanCard from '../PlanCard';
import Slider from 'react-slick';
import "./index.scss";
import { SampleNextArrow, SamplePrevArrow } from '../ArrowsSlick';

const PlanScreen: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            {plansData.length > 3 ? (
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
                <div className="grid md:grid-cols-3 gap-4">
                    {plansData.map((plan, index) => (
                        <PlanCard key={index} plan={plan} onContractClick={handleOpenModal} />
                    ))}
                </div>
            )}

            {isModalOpen && <UserInfoModal isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
    );
}

export default PlanScreen;
