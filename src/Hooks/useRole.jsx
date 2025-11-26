import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            console.log(res.data.role);
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;