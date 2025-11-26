import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { LuShieldPlus } from "react-icons/lu";
import { LuShieldOff } from "react-icons/lu";
import Swal from 'sweetalert2';


const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })
    // console.log(users);
    const handleMakeAdmin = user => {
        Swal.fire({
            title: `Make ${user.displayName} as a admin?`,
            text: ``,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make!"
        }).then((result) => {
            if (result.isConfirmed) {
                const roleInfo = { role: 'admin' };
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${user.displayName} Marked As Admin`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    }
    const handleRemoveAdmin = user => {

        Swal.fire({
            title: `Remove ${user.displayName} from admin?`,
            text: ``,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove!"
        }).then((result) => {
            if (result.isConfirmed) {
                const roleInfo = { role: 'user' };
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${user.displayName} removed from Admin`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    }
    return (
        <div>
            <h2 className="text-4xl">Manage Users : ({users.length})</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Other Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={i}>
                                    <th>
                                        <label>{i + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img referrerPolicy='no-referrer'
                                                        src={user.photoURL}
                                                        alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td className={`${user.role === 'admin' ? 'bg-green-100' : user.role === 'rider' ? 'bg-red-100' : 'bg-amber-100'}`}>
                                        {user.role}
                                    </td>
                                    <td className='flex gap-1'>
                                        {
                                            user.role === 'admin'
                                                ? <button className='btn bg-red-300'
                                                    onClick={() => handleRemoveAdmin(user)}
                                                >
                                                    < LuShieldOff />
                                                </button>
                                                : <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-300">
                                                    < LuShieldPlus />
                                                </button>

                                        }


                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">Actions</button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;