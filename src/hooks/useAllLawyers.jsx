import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useAllLawyers = () => {
    // const { data: allLawyers = [] } = useQuery({
    //     queryKey: ["all-lawyers"],
    //     queryFn: async () => {
    //         const response = await axios.get("http://localhost:5000/all-lawyers")
    //         return response.data
    //     }
    // })
    // return [allLawyers]
};

export default useAllLawyers;