import React from 'react';
import SectionHead from '../../../Components/SectionHead';
import lawIcon from "../../../assets/icons/law1.png";
import lawIcon1 from "../../../assets/icons/law2.png";
import lawIcon2 from "../../../assets/icons/law3.png";
import lawIcon3 from "../../../assets/icons/law4.png";
import lawIcon4 from "../../../assets/icons/law5.png";
import lawIcon5 from "../../../assets/icons/law6.png";
import { HiArrowRightCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const PracticeSection = () => {
    return (
        <section className='my-16'>
            <SectionHead title="The Legal Practice Area" description="Explore expertise at its finest with our 'Legal Practice Area.' Dive into specialized realms of law to quickly find the perfect attorney for your unique needs." />

            <div className='mt-14 w-full lg:px-10'>
                <div className='w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-10 border-b'>
                    <div className='flex flex-col items-center justify-between gap-3 text-center p-5'>
                        <img src={lawIcon} alt="law Icon" className='w-12' />
                        <h1 className='brandFont text-2xl font-semibold'>Business Law</h1>
                        <p className='text-sm my-3'>Unravel the complexities of corporate legal matters with skilled professionals.</p>

                        <Link to={`/service-details/Business Law`}><HiArrowRightCircle className='h-8 w-8 text-primary' /></Link>
                    </div>

                    <div className='flex flex-col items-center justify-between gap-3 text-center border-l border-r p-5 bg-gradient-to-t from-[#e6e3e3] to-[#F3F3F3]'>
                        <img src={lawIcon1} alt="law Icon 1" className='w-12' />
                        <h1 className='brandFont text-2xl font-semibold'>Criminal Law</h1>
                        <p className='text-sm my-3'>Seek justice and defense with experienced criminal attorneys by your side.</p>

                        <Link to={`/service-details/Criminal Law`}><HiArrowRightCircle className='h-8 w-8 text-primary' /></Link>
                    </div>

                    <div className='flex flex-col items-center justify-between gap-3 text-center p-5'>
                        <img src={lawIcon2} alt="law Icon 2" className='w-12' />
                        <h1 className='brandFont text-2xl font-semibold'>Child Support</h1>
                        <p className='text-sm my-3'>Ensure the best outcomes for your child with expert guidance in child support matters.</p>

                        <Link to={`/service-details/Child Support`}><HiArrowRightCircle className='h-8 w-8 text-primary' /></Link>
                    </div>
                </div>

                <div className='w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-10'>
                    <div className='flex flex-col items-center justify-between gap-3 text-center p-5'>
                        <img src={lawIcon3} alt="law Icon" className='w-12' />
                        <h1 className='brandFont text-2xl font-semibold'>Education Law</h1>
                        <p className='text-sm my-3'>Safeguard your educational rights with knowledgeable legal support in the field of education law.</p>

                        <Link to={`/service-details/Education Law`}><HiArrowRightCircle className='h-8 w-8 text-primary' /></Link>
                    </div>

                    <div className='flex flex-col items-center justify-between gap-3 text-center border-l border-r p-5'>
                        <img src={lawIcon4} alt="law Icon 1" className='w-12' />
                        <h1 className='brandFont text-2xl font-semibold'>Divorce Law</h1>
                        <p className='text-sm my-3'>Navigating the complexities of divorce is easier with our specialized attorneys by your side.</p>

                        <Link to={`/service-details/Divorce Law`}><HiArrowRightCircle className='h-8 w-8 text-primary' /></Link>
                    </div>

                    <div className='flex flex-col items-center justify-between gap-3 text-center p-5'>
                        <img src={lawIcon5} alt="law Icon 2" className='w-12' />
                        <h1 className='brandFont text-2xl font-semibold'>Tax Law</h1>
                        <p className='text-sm my-3'>From personal to business taxes, find the expertise you need to navigate the intricate landscape of tax law.</p>

                        <Link to={`/service-details/Tax Law`}><HiArrowRightCircle className='h-8 w-8 text-primary' /></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PracticeSection;