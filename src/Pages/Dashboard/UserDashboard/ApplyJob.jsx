import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashHead from '../../../Components/DashHead';
import { useForm } from 'react-hook-form';
import useProfile from '../../../hooks/useProfile';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApplyJob = () => {
    const [userInfo] = useProfile();
    const navigate = useNavigate();
    // console.log(userInfo);
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();


    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        fetch(`https://lawyer-finder-pro.vercel.app/job-post/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])
    // console.log(post);

    const onSubmit = async (data) => {

        const newData = {
            law_firm: post?.law_firm,
            duration: post?.duration,
            job_type: post?.job_type,
            position: post?.position,
            author: post?.contact_email,
            working_hours: post?.working_hours,
            applicant_name: data?.name,
            applicant_email: data?.email,
            applicant_number: data?.number,
            applicant_resume: data?.resume,
            applicant_cover_letter: data?.cover_letter

        }

        const response = await axiosSecure.post("/create-job-application", newData)
        if (response?.data?.insertedId) {
            Swal.fire({
                title: 'Success!',
                text: 'Successfully applied!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            navigate("/dashboard/apply-intern")
        }

        // console.log(newData);
    };
    return (
        <section className='w-full px-6'>
            <DashHead title={`Apply As ${post?.position}`} />

            <div className="my-8 w-full">
                <div className="flex justify-between items-center mb-6">
                    <a href="/dashboard/apply-intern" className="text-blue-500 hover:underline text-sm">
                        Back to Job Listings
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-8 mb-6 w-full">
                    <div>
                        {/* Job Details */}
                        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
                        <p>Law Firm: {post?.law_firm}</p>
                        <p>Location: {post?.location}</p>
                        <p>Duration: {post?.duration}</p>
                        <p>Job Type: {post?.job_type}</p>
                        <p>Working Hours: {post?.working_hours}</p>
                        <p>Deadline: {post?.deadline}</p>

                        <div className='flex items-start w-full gap-10 flex-col lg:flex-row'>
                            <div>
                                {/* Responsibilities */}
                                <h2 className="text-xl font-semibold mt-6 mb-4">Responsibilities</h2>
                                <ul className='font-medium list-disc space-y-2'>
                                    {
                                        post?.responsibilities?.map((responsibility, indx) => <li key={indx}>{responsibility}</li>)
                                    }
                                </ul>
                            </div>

                            <div>
                                {/* Responsibilities */}
                                <h2 className="text-xl font-semibold mt-6 mb-4">Requirements</h2>
                                <ul className='font-medium list-disc space-y-2'>
                                    {
                                        post?.requirements?.map((requirements, indx) => <li key={indx}>{requirements}</li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>




                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Educational Requirements</h2>
                    <p>{post?.educational_requirements}</p>
                </div>
                <div className="lg:w-full flex items-center justify-center">
                    <div className='py-10 lg:w-1/2'>
                        <h2 className="text-xl font-semibold mb-4">Application Form</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>

                            <label className='font-bold brandFont'>Name<sup className='text-error'>*</sup></label>
                            <input type='text' defaultValue={userInfo?.name ? userInfo?.name : ""} placeholder='Enter Your Name'
                                {...register("name", { required: true })}
                                aria-invalid={errors?.name ? "true" : "false"}
                                className='inputField' />
                            {errors?.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}


                            <label className='font-bold brandFont'>Email<sup className='text-error'>*</sup></label>
                            <input type='email' defaultValue={userInfo?.email ? userInfo?.email : ""} placeholder='Enter Your Email'
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className='inputField' />
                            {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}
                            <label className='font-bold brandFont'>Phone<sup className='text-error'>*</sup></label>
                            <input type='tel' defaultValue={userInfo?.phone ? userInfo?.phone : ""} placeholder='Enter Your Number'
                                {...register("number", { required: true })}
                                aria-invalid={errors.number ? "true" : "false"}
                                className='inputField' />
                            {errors.number?.type === 'required' && <p role="alert" className='text-error font-medium'>Number is required</p>}


                            <label className='font-bold brandFont'>Resume<sup className='text-error'>*</sup></label>
                            <input type='url' placeholder='Enter Your Resume URL (Drive or Dropbox)'
                                {...register("resume", { required: true })}
                                aria-invalid={errors.resume ? "true" : "false"}
                                className='inputField' />
                            {errors.resume?.type === 'required' && <p role="alert" className='text-error font-medium'>Resume is required</p>}


                            <label className='font-bold brandFont'>Cover Letter<sup className='text-error'>*</sup></label>
                            <textarea rows="5" cols="10" placeholder='Cover Letter'
                                {...register("cover_letter", { required: true })}
                                aria-invalid={errors.message ? "true" : "false"}
                                className='inputField' />
                            {errors.message?.type === 'required' && <p role="alert" className='text-error font-medium'>Cover Letter is required</p>}

                            <div className='text-center'>
                                <input type="submit" value="Submit" className='myBtn text-center' />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplyJob;