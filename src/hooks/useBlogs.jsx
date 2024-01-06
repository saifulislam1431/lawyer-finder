import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useBlogs = () => {
    const { data: allBlogs = [], refetch } = useQuery({
        queryKey: ["all-blogs"],
        queryFn: async () => {
            const response = await axios.get("https://lawyer-finder-pro.vercel.app/all-blogs")
            return response.data
        }
    })
    return [allBlogs, refetch]
};

export default useBlogs;