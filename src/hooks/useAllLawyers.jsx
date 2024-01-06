import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useAllLawyers = () => {
    const { data: allLawyers = [], refetch } = useQuery({
        queryKey: ["all-lawyers"],
        queryFn: async () => {
            const response = await axios.get("https://lawyer-finder-pro.vercel.app/all-lawyers")
            return response.data
        }
    })
    return [allLawyers, refetch]
};

export default useAllLawyers;