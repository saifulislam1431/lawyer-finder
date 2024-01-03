import React from 'react';

const DashHead = ({ title }) => {
    return (
        <div>
            <h1 className='text-center brandFont text-2xl text-primary underline decoration-wavy'>{title}</h1>

        </div>
    );
};

export default DashHead;