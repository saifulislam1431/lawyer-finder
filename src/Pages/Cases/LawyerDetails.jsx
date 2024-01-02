import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const LawyerDetails = () => {
    const { id } = useParams();

    const [lawyerData, setLawyerData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/single-lawyer-profile/${id}`)
            .then(res => res.json())
            .then(data => setLawyerData(data))
    }, [id]);

    console.log(lawyerData);
    return (
        <section className='my-14 px-2'>
            <h1 className='font-bold text-3xl text-center text-primary brandFont'>Details Of {lawyerData?.name}</h1>

            <div className="hero bg-base-100 my-14">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={lawyerData?.image} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold brandFont">{lawyerData?.name}</h1>
                        <p className='font-semibold text-primary'>Expert of {lawyerData?.expert_in
                        }</p>
                        <div className='mt-3'>
                            <p>{lawyerData?.total_case}+ Case Solved</p>
                            <p>{lawyerData?.success_rate
                            }% Success rate</p>
                        </div>
                        <p className="py-6 font-medium">{lawyerData?.description}</p>
                        <button className="myBtn">Contacts</button>
                    </div>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-3xl text-center text-primary brandFont'>Fee Structure</h1>

                <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-10 items-center justify-center mx-auto relative mt-12'>
                    {
                        lawyerData?.fee_structure?.map((option, indx) => <div key={indx} className='rounded-xl px-3 py-5 shadow-md shadow-primary cursor-pointer hover:shadow-xl transition-shadow duration-500 space-y-3 h-[250px]'>
                            <h2 className='secondFont font-semibold text-xl text-primary'>{option?.service_name}</h2>
                            <p className='font-medium'>Fee: <span className='font-semibold text-primary'>{option?.fee}</span></p>
                            <p className='font-medium'>services included: {option?.details}</p>
                            <div className='absolute bottom-5'>
                                <Link to={`/quote/${option?.service_name}`} className='myBtn'>
                                    Get a Quote
                                </Link>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default LawyerDetails;