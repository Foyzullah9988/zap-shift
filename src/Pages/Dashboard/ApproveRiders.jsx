import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from 'react-icons/md';
import { FaFileInvoice } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import Swal from 'sweetalert2';


const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data
        }
    })
    // console.log(riders);


    // console.log(riders);
    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status is set to ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        // console.log(id);
    }

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved')
    }

    const handleReject = rider => {
        if (rider.status === 'approved') return;
        updateRiderStatus(rider, 'rejected')
    }
    // const handleApproval = id => {}

    return (
        <div>
            <h2 className="text-4xl">Riders Pending Approval {riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Districts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, i) =>
                                <tr key={i} >
                                    <th>{i + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>

                                    <td
                                        className={`${rider.status === 'approved' ? 'text-green-500' : rider.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}
                                    >{rider.status}</td>
                                    <td>{rider.workStatus}</td>

                                    <td>{rider.district}</td>
                                    <td>
                                        <button
                                            // onClick={() => handleApproval(rider)}
                                            className="btn">
                                            <FaFileInvoice />
                                        </button>
                                        <button
                                            onClick={() => handleApproval(rider)}
                                            className="btn">
                                            <MdPersonAddAlt1 />
                                        </button>
                                        <button
                                            onClick={() => handleReject(rider)}
                                            className="btn">
                                            <MdPersonRemoveAlt1 />
                                        </button>
                                        {/* <button
                                            onClick={() => removeApproval(rider._id)}
                                            className="btn">
                                            <BiSolidTrashAlt />
                                        </button> */}
                                    </td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;