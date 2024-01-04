import React from 'react';
import DashHead from '../../../Components/DashHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import useAttorneyProfile from '../../../hooks/useAttorneyProfile';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateHiringPost = () => {
    const [attorneyInfo] = useAttorneyProfile();
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    const navigate = useNavigate();



    const onSubmit = async (data) => {
        // Convert responsibilities and requirements to arrays
        data.responsibilities = data.responsibilities.split('\n').map(item => item.trim());
        data.requirements = data.requirements.split('\n').map(item => item.trim());

        // console.log(data); // Handle form submission logic here

        const response = await axiosSecure.post("/create-job-post", data)
        if (response?.data?.insertedId) {
            Swal.fire({
                title: 'Success!',
                text: 'Post Created!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            reset();
            navigate("/dashboard/hire-intern")
        }
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])
    return (
        <section>
            <DashHead title="Create A Hiring Post" />

            <div className="lg:w-full flex items-center justify-center">
                <div className='py-10 w-full'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>
                        <label className='font-bold brandFont'>Position<sup className='text-error'>*</sup></label>
                        <input
                            type='text'
                            placeholder='Enter Position'
                            {...register('position', { required: true })}
                            aria-invalid={errors.position ? 'true' : 'false'}
                            className='inputField w-96 lg:w-[500px]'
                        />
                        {errors.position?.type === 'required' && (
                            <p role="alert" className='text-error font-medium'>Position is required</p>
                        )}

                        <label className='font-bold brandFont'>Law Firm<sup className='text-error'>*</sup></label>
                        <input
                            type='text'
                            placeholder='Enter Law Firm'
                            {...register('law_firm', { required: true })}
                            aria-invalid={errors.law_firm ? 'true' : 'false'}
                            className='inputField w-96 lg:w-[500px]'
                        />
                        {errors.law_firm?.type === 'required' && (
                            <p role="alert" className='text-error font-medium'>Law Firm is required</p>
                        )}

                        <label className='font-bold brandFont'>Location<sup className='text-error'>*</sup></label>
                        <input
                            type='text'
                            placeholder='Enter Location'
                            {...register('location', { required: true })}
                            aria-invalid={errors.location ? 'true' : 'false'}
                            className='inputField w-96 lg:w-[500px]'
                        />
                        {errors.location?.type === 'required' && (
                            <p role="alert" className='text-error font-medium'>Location is required</p>
                        )}

                        <label className='font-bold brandFont'>Duration</label>
                        <input
                            type='text'
                            placeholder='Enter Duration'
                            {...register('duration')}
                            className='inputField w-96 lg:w-[500px]'
                        />

                        <label className='font-bold brandFont'>Job Type</label>
                        <input
                            type='text'
                            placeholder='Enter Job Type'
                            {...register('job_type')}
                            className='inputField w-96 lg:w-[500px]'
                        />

                        <label className='font-bold brandFont'>Working Hours</label>
                        <input
                            type='text'
                            placeholder='Enter Working Hours'
                            {...register('working_hours')}
                            className='inputField w-96 lg:w-[500px]'
                        />

                        <label className='font-bold brandFont'>Contact Email</label>
                        <input
                            type='text'
                            placeholder='Enter Contact Email'
                            defaultValue={attorneyInfo?.email ? attorneyInfo?.email : ""}
                            {...register('contact_email')}
                            className='inputField w-96 lg:w-[500px]'
                        />

                        <label className='font-bold brandFont'>Deadline</label>
                        <input
                            type='date'
                            {...register('deadline')}
                            className='inputField w-96 lg:w-[500px]'
                        />

                        <label className='font-bold brandFont'>Responsibilities</label>
                        <textarea
                            rows="5"
                            placeholder='Enter Responsibilities (separated by newlines)'
                            {...register('responsibilities', { required: true })}
                            className='inputField w-96 lg:w-[500px]'
                        />
                        {errors.responsibilities?.type === 'required' && (
                            <p role="alert" className='text-error font-medium'>Responsibilities are required</p>
                        )}

                        <label className='font-bold brandFont'>Requirements</label>
                        <textarea
                            rows="5"
                            placeholder='Enter Requirements (separated by newlines)'
                            {...register('requirements', { required: true })}
                            className='inputField w-96 lg:w-[500px]'
                        />
                        {errors.requirements?.type === 'required' && (
                            <p role="alert" className='text-error font-medium'>Requirements are required</p>
                        )}

                        <label className='font-bold brandFont'>Educational Requirements</label>
                        <input
                            type='text'
                            placeholder='Enter Educational Requirements'
                            {...register('educational_requirements')}
                            className='inputField w-96 lg:w-[500px]'
                        />

                        <div className='text-center'>
                            <input type="submit" value="Post" className='myBtn text-center' />
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default CreateHiringPost;