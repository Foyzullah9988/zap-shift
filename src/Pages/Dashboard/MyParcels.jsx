import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyParcels = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['mayParcels', user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    console.log(parcels);

    return (
        <div>
            all of my parcels {parcels.length}
        </div>
    );
};

export default MyParcels;