import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAttorneyProfile = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: attorneyInfo = {}, refetch } = useQuery({
        queryKey: ["attorneyInfo", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/attorney-info?email=${user?.email}`)
            return res.data;

        }
    })
    return [attorneyInfo, refetch]
};

export default useAttorneyProfile;