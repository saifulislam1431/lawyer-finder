import React, { useState } from 'react';
import useAllLawyers from '../../hooks/useAllLawyers';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cases = () => {
    const [showAll, setShowAll] = useState(false);
    const { data: allLawyers = [] } = useQuery({
        queryKey: ["all-lawyers"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:5000/all-lawyers")
            return response.data
        }
    })

    console.log(allLawyers);
    return (
        <section>
            <div className="hero lg:h-[500px] mb-14 overflow-hidden" style={{ backgroundImage: 'url(https://i.ibb.co/f91pjYg/banner2.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 bg-black"></div>
                <div className="hero-content text-center text-white">
                    <div className="">
                        <h1 className="mb-7 text-5xl font-bold brandFont text-white max-w-md mx-auto">Attorney Showcase</h1>
                        <p className="mb-5">Explore Proficient Legal Minds for Your Needs</p>
                    </div>
                </div>
            </div>

            <div className='my-14 px-3 grid lg:grid-cols-2 gap-5'>
                {
                    allLawyers?.slice(0, showAll ? 30 : 15)?.map(lawyer => <div className="card lg:card-side bg-base-100 shadow-xl" key={lawyer?._id}>
                        <figure><img src={lawyer?.image} alt="Image" className='w-full lg:w-40 h-48 lg:h-full' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{lawyer?.name}</h2>
                            <div className='flex items-center justify-between'>
                                <div className='font-semibold text-sm text-primary'>
                                    <p>Expert In: <span>{lawyer?.expert_in}</span></p>

                                    <p>Success Rate: <span>{lawyer?.success_rate}%</span></p>
                                </div>

                                <div className='font-semibold text-sm text-primary'>
                                    <p>Case Solved: <span>{lawyer?.total_case}</span></p>

                                    <p>Rating: <span>{lawyer?.rating}</span></p>
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-3">
                                <Link className='myBtn' to={`/lawyer-details/${lawyer?._id}`}>View Details</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div className='my-9 flex items-center justify-center'>

                {
                    showAll ? <button className='myBtn' onClick={() => setShowAll(false)}>Show Less</button> : <button className='myBtn' onClick={() => setShowAll(true)}>Show All</button>
                }
            </div>
        </section>
    );
};

export default Cases;