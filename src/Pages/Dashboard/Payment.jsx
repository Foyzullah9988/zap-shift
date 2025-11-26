import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading';

const Payment = () => {
    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)

            return res.data;
        }
    })
    // console.log(parcel);
    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url
    }

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>
            Pay {parcel.cost}{parcel.parcelName}
            <button onClick={handlePayment} className='btn btn-secondary'>
                Pay
            </button>
        </div>
    );
};

export default Payment;