import React from 'react';

const SectionHead = ({ title, description, color }) => {
    return (
        <div className='flex items-center justify-center w-full flex-col gap-3 px-2'>
            <h1 className={`brandFont text-4xl font-semibold ${color}`}>{title}</h1>
            <p className='text-center'>{description}</p>
        </div>
    );
};

export default SectionHead;