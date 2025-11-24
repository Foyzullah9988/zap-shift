import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { CiCircleAlert, CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { IoAlertCircleSharp } from "react-icons/io5";



const MyParcels = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    // console.log(parcels);

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.deletedCount) {
                            // refresh the data in ui
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => console.log(err))


            }
        });
    }

    const handlePayment = async (parcel) => {
        const parcelInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }
        const res = await axiosSecure.post('/create-checkout-session', parcelInfo);
        window.location.href = res.data.url;
    }

    return (
        <div>
            All of my parcels ({parcels.length})
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={i} >
                                    <th>{i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>
                                        {
                                            parcel.paymentStatus === 'paid'
                                                ? <span className='text-green-400'>Paid</span>
                                                : <button onClick={() => handlePayment(parcel)} className="btn btn-primary text-black">Pay</button>
                                        }

                                    </td>
                                    <td>{parcel.deliveryStatus}</td>
                                    <td className='space-x-2 space-y-1'>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <CiEdit />
                                        </button>
                                        {/* <button className='btn btn-square hover:bg-primary'>
                                            <CiEdit />
                                        </button> */}
                                        <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square hover:bg-red-600'>
                                            <MdDeleteOutline />
                                        </button>

                                        <Link to={`/dashboard/payment/${parcel._id}`}>
                                            <button className="btn btn-square ">
                                                <CiCircleAlert />
                                            </button>
                                        </Link>

                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;