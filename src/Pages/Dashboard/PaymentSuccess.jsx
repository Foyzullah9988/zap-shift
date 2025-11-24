import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({})
    const [called,setCalled]=useState(false)
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    console.log(sessionId);

    useEffect(() => {
        if (!sessionId || called) return;
        setCalled(true)
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    })
                })
        
    }, [sessionId, axiosSecure,called])

    return (
        <div>
            <h2 className='text-4xl'>Payment Successful</h2>
            <Link to={'/dashboard/my-parcels'} className='btn btn-secondary'>My Parcels</Link>
            <p>Your Transaction ID is : {paymentInfo.transactionId}</p>
            <p>Your Tracking ID is : {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;