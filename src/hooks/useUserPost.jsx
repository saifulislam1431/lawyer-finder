import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserPost = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: posts = [], refetch } = useQuery({
        queryKey: ["user-post", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/get-single-post?email=${user?.email}`)
            return res.data;

        }
    })
    return [posts, refetch]
};

export default useUserPost;