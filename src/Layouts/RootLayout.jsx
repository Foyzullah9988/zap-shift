import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const RootLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;