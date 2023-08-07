import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PageWrapperProps {
    children: ReactNode;
}

const MainLayout: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default MainLayout;
