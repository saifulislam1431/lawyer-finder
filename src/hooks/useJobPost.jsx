import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useJobPost = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allJobs = [], refetch } = useQuery({
        queryKey: ["all-job-post"],
        queryFn: async () => {
            const response = await axiosSecure.get("/all-job-post")
            return response.data
        }
    })
    return [allJobs, refetch]
};

export default useJobPost;