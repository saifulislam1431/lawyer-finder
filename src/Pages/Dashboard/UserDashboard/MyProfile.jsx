import React from 'react';
import DashHead from '../../../Components/DashHead';
import useProfile from '../../../hooks/useProfile';

const MyProfile = () => {
    const [userInfo, refetch] = useProfile();
    console.log(userInfo);
    return (
        <section>
            <DashHead title="My Profile" />
        </section>
    );
};

export default MyProfile;