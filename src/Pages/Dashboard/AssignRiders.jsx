import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { AuthContext } from '../../Context/AuthProvider';
// import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null)
    const modalRef = useRef()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data
        }
    })
    console.log(parcels);

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistricts, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistricts}&workStatus=available`);
            return res.data
        }
    })

    const assignRiderModal = parcel => {
        setSelectedParcel(parcel)
        modalRef.current.showModal();
    }

    const handleAssignRider = rider => {
        const assignRiderInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id
        }

        axiosSecure.patch(`/parcels/${selectedParcel._id}`, assignRiderInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    modalRef.current.close();
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Rider has been assigned",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

console.log(riders);



    return (
        <div>
            <h2 className="text-4xl">Pending Parcels ({parcels.length})</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Sender Details</th>
                            <th>Receiver Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>
                                        {parcel.senderName} <br />
                                        {parcel.senderEmail} <br />
                                        {parcel.senderDistricts}
                                    </td>

                                    <td>
                                        {parcel.receiverName} <br />
                                        {parcel.receiverEmail} <br />{parcel.receiverDistricts}
                                    </td>
                                    <td>
                                        <button onClick={() => assignRiderModal(parcel)} className="btn text-black btn-primary">Assign Rider</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders available for this District : {riders.length}</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, i) => <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>
                                        <button onClick={() => handleAssignRider(rider)} className="btn btn-primary text-black">Find Riders</button>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>


                </div>
                <form method="dialog" className='modal-backdrop'>
                    <button></button>
                </form>
            </dialog>
        </div>
    );
};

export default AssignRiders;