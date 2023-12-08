import React, { useEffect, useState } from 'react';
import SectionHead from '../../../Components/SectionHead';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        fetch("demoTestimonial.json")
            .then(res => res.json())
            .then(data => setTestimonials(data))
    }, [])

    // console.log(testimonials);
    return (
        <section className='my-16'>
            <SectionHead title="What Our Client Say" description="Discover success stories firsthand in our 'What Our Clients Say' section. Real experiences, real results – find the right lawyer with confidence, backed by the testimonials of those who've been there before you." />


            <div className="hero lg:h-[500px] my-16 overflow-hidden" style={{ backgroundImage: 'url(https://i.ibb.co/f91pjYg/banner2.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 bg-black"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className='overflow-hidden'>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                testimonials.map(review => <SwiperSlide
                                    key={review.id}
                                >
                                    <div className='flex flex-col lg:flex-row gap-12 h-full w-full items-center lg:justify-between lg:px-14 space-y-4 px-8'>


                                        <div className='w-full'>
                                            <img src={review.client_img} alt="Client" className='lg:w-96 w-72 lg:h-80 rounded-2xl shadow-2xl' />
                                        </div>

                                        <div className='w-full'>

                                            <div className='lg:w-96 w-72 lg:h-80'>
                                                <div className='flex items-end justify-start mb-4'>
                                                    <FaQuoteLeft className='w-8 h-8 opacity-50 text-primary' />
                                                </div>

                                                <div className='text-left'>
                                                    <p className='font-semibold'>{review.comment}</p>
                                                </div>

                                                <div className='flex items-end justify-end mb-4'>
                                                    <FaQuoteRight className='w-8 h-8 opacity-50 text-primary' />
                                                </div>


                                                <div className='my-6'>
                                                    <Rating
                                                        style={{ maxWidth: 100 }}
                                                        value={review.rating}
                                                        readOnly
                                                    />

                                                    <div className='text-left'>
                                                        <p className='font-bold brandFont'>{review.client_name}</p>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>




                                    </div>
                                </SwiperSlide>)
                            }
                        </Swiper>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Testimonial;