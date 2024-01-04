import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Consultation = () => {
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();
    const [services, setService] = useState([]);
    // console.log(services);


    const onSubmit = async (data) => {
        if (!user) {
            Swal.fire({
                title: 'Error!',
                text: 'Please Sign In First!',
                icon: 'warning',
                confirmButtonText: 'Cool'
            })
            navigate("/sign-in")
        } else {
            const response = await axiosSecure.post("/create-support", data)
            if (response?.data?.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your query is submitted!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                reset();
            }
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/get-all-services")
            .then(res => res.json())
            .then(data => setService(data))
    }, [])

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])

    return (
        <section>
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
                                services?.map(service => service?.fee_structure?.map((option, indx) => <option value={option?.service_name} key={indx}>{option?.service_name}</option>))
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
                            <input type="submit" value="Submit" className='myBtn text-center' />
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Consultation;