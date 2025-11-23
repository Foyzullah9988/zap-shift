import React from 'react';
import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div>
            <h2 className='text-4xl'>Payment Successful</h2>
            <Link to={'/dashboard/my-parcels'} className='btn btn-secondary'>My Parcels</Link>
        </div>
    );
};

export default PaymentSuccess;