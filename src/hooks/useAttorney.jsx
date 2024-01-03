import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAttorney = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isAttorney, isLoading: isAttorneyLoading } = useQuery({
        queryKey: ["isAttorney", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/users/attorney/${user?.email}`)
            return res.data.attorney;

        }
    })
    return [isAttorney, isAttorneyLoading]
};

export default useAttorney;