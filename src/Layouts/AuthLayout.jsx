import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='border-e-amber-950'>
            <Navbar />
            <div className='flex items-center container mx-auto justify-evenly min-h-screen'>
                <div>
                    <Outlet />
                </div>
                <div>
                    <img src={'/Assets/authImage.png'} alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;