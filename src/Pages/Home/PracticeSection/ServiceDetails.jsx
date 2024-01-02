import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionHead from '../../../Components/SectionHead';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';

const ServiceDetails = () => {
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    const { user } = useAuth();
    const { name } = useParams();
    console.log(name);
    const [service, setService] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/single-service-details/${name}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [name])


    const onSubmit = async (data) => {
        console.log(data);
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])

    // console.log(service);
    return (
        <section className='my-10'>
            <div className="hero h-[500px] mt-10" style={{ backgroundImage: 'url(https://i.ibb.co/BnD7jGf/law.jpg)' }}>
                <div className="hero-overlay bg-black bg-opacity-60"></div>
                <div className="hero-content text-center text-white">
                    <div className="">
                        <h1 className="mb-7 text-5xl font-bold brandFont text-primary max-w-md mx-auto">{service?.title}</h1>
                        <p className="mb-5">{service?.description}</p>
                    </div>
                </div>
            </div>

            <div className='my-10'>
                <h1 className='text-center font-bold text-3xl brandFont text-primary'>Fee Structure</h1>

                <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-10 items-center justify-center mx-auto relative mt-12 px-3'>
                    {
                        service?.fee_structure?.map((option, indx) => <div key={indx} className='rounded-xl px-3 py-5 shadow-md shadow-primary cursor-pointer hover:shadow-xl transition-shadow duration-500 space-y-3 h-[200px]'>
                            <h2 className='text-center font-bold text-2xl brandFont text-primary mb-5'>{option?.service_name}</h2>
                            <p className='font-medium text-2xl brandFont'>Fee: <span className='font-semibold text-primary'>{option?.fee}</span></p>
                            <p className='font-medium'> {option?.details}</p>

                        </div>)
                    }
                </div>
            </div>

            <h1 className='text-center font-bold text-3xl brandFont text-primary mt-10'>Book a service</h1>

            <div className="lg:w-full flex items-center justify-center">
                <div className='py-10 lg:w-1/2'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>

                        <label className='font-bold brandFont'>Name<sup className='text-error'>*</sup></label>
                        <input type='text' defaultValue={user?.name ? user?.name : ""} placeholder='Enter Your Name'
                            {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                            className='inputField' />
                        {errors.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}


                        <label className='font-bold brandFont'>Email<sup className='text-error'>*</sup></label>
                        <input type='email' defaultValue={user?.email ? user?.email : ""} placeholder='Enter Your Email'
                            {...register("email", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                            className='inputField' />
                        {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}
                        <label className='font-bold brandFont'>Phone<sup className='text-error'>*</sup></label>
                        <input type='tel' defaultValue={user?.phone ? user?.phone : ""} placeholder='Enter Your Number'
                            {...register("number", { required: true })}
                            aria-invalid={errors.number ? "true" : "false"}
                            className='inputField' />
                        {errors.number?.type === 'required' && <p role="alert" className='text-error font-medium'>Number is required</p>}


                        <label className='font-bold brandFont'>Services<sup className='text-error'>*</sup></label>

                        <select  {...register("service", { required: true })} className='inputField font-semibold'>
                            <option value="Select service">Select service</option>
                            {
                                service?.fee_structure?.map((option, indx) => <option value={option?.service_name} key={indx}>{option?.service_name}</option>)
                            }


                        </select>
                        {errors.service?.type === 'required' && <p role="alert" className='text-error font-medium'>Service is required</p>}



                        <label className='font-bold brandFont'>Case Details<sup className='text-error'>*</sup></label>
                        <textarea rows="5" cols="10" placeholder='Case Details'
                            {...register("message", { required: true })}
                            aria-invalid={errors.message ? "true" : "false"}
                            className='inputField' />
                        {errors.message?.type === 'required' && <p role="alert" className='text-error font-medium'>Details is required</p>}

                        <div className='text-center'>
                            <input type="submit" value="Confirm" className='myBtnSec text-center' />
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;