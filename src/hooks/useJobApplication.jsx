import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useJobApplication = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: applications = [], refetch } = useQuery({
        queryKey: ["userApplication", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/job-applications/${user?.email}`)
            return res.data;
        }
    })
    return [applications, refetch]
};

export default useJobApplication;