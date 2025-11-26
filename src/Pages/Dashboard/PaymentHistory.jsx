import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })
    console.log(payments);

    return (
        <div>
            <h2 className='text-4xl'>Payment History ({payments.length}) </h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment,i) =>
                                <tr key={i}>
                                    <th>{i+1}</th>
                                    <td>{payment.parcelName}</td>
                                    <td>{payment.amount}tk</td>
                                    <td>{payment.paidAt}</td>
                                    <td>{payment.transactionId}</td>
                                    {/* <td>{payment.deliveryStatus}</td> */}
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;