import React from 'react';
import useAttorney from '../hooks/useAttorney';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AttorneyRoute = ({ children }) => {
    const [isAttorney, isAttorneyLoading] = useAttorney()
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading || isAttorneyLoading) {
        return <h1>Loading</h1>
    }
    if (user && isAttorney) {
        return children;
    }
    return navigate("/")
};

export default AttorneyRoute;