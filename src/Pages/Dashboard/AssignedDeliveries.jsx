import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'rider_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`)
            return res.data
        }
    })

    const handleDeliveryStatus = (parcel,status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId:parcel.riderId
        }
        const message = `Thanks for ${status.split('_').join(' ')}`
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    console.log(parcels);

    return (
        <div>
            <h2 className="text-4xl">Parcels pending {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>

                            <td>
                                {
                                    parcel.deliveryStatus === 'rider_assigned' ?
                                        <>
                                            <button onClick={() => handleDeliveryStatus(parcel,'rider_arriving')} className="btn  btn-primary text-black">Accept</button>
                                            <button className="btn btn-warning text-black ms-2">Reject</button>
                                        </>
                                        : <span className='text-green-500'>Accepted</span>
                                }

                            </td>
                            <td>
                                <button onClick={() => handleDeliveryStatus(parcel,'parcel_picked_up')} className="btn  btn-primary text-black">Mark as picked up</button>
                                <button onClick={() => handleDeliveryStatus(parcel,'parcel_delivered')} className="btn  btn-primary text-black">Mark as delivered</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;