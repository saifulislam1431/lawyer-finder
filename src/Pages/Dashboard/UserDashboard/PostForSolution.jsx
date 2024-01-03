import React from 'react';
import DashHead from '../../../Components/DashHead';
import useProfile from '../../../hooks/useProfile';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserPost from '../../../hooks/useUserPost';
import moment from 'moment';

const PostForSolution = () => {
    const [userInfo] = useProfile();
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    const [posts, refetch] = useUserPost();


    const onSubmit = async (data) => {

        const newData = {
            userName: userInfo?.name,
            userEmail: userInfo?.email,
            userPhoto: userInfo?.photo,
            postTitle: data?.title,
            postDetails: data?.case_detail,
            date: new Date()
        }

        const response = await axiosSecure.post("/create-post", newData)
        if (response.data.insertedId) {
            Swal.fire({
                title: 'Success!',
                text: 'Posted!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            refetch();
            reset();
        }

    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])
    return (
        <section>
            <DashHead title="Post For legal Solution" />


            <div className="w-full flex items-center justify-center">
                <div className='py-10 w-full'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full items-center justify-center'>

                        <div className='space-y-4 flex flex-col'>
                            <label className='font-bold brandFont'>Title<sup className='text-error'>*</sup></label>
                            <input type='text' placeholder='Title'
                                {...register("title", { required: true })}
                                aria-invalid={errors.title ? "true" : "false"}
                                className='w-96 lg:w-[500px] px-6 py-2 rounded-md bg-gray-600 bg-opacity-20 focus:outline focus:outline-accent disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-sm placeholder:text-red-600' />
                            {errors.title?.type === 'required' && <p role="alert" className='text-error font-medium'>Title is required</p>}
                        </div>


                        <div className='space-y-4 flex flex-col'>
                            <label className='font-bold brandFont'>Case Details<sup className='text-error'>*</sup></label>
                            <textarea rows="5" cols="10" placeholder='Describe Your Problems'
                                {...register("case_detail", { required: true })}
                                aria-invalid={errors.message ? "true" : "false"}
                                className='w-96 lg:w-[500px] px-6 py-2 rounded-md bg-gray-600 bg-opacity-20 focus:outline focus:outline-accent disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-sm placeholder:text-red-600' />
                            {errors.message?.type === 'required' && <p role="alert" className='text-error font-medium'>Details is required</p>}
                        </div>

                        <div className='text-center'>
                            <input type="submit" value="Post" className='myBtn text-center' />
                        </div>
                    </form>

                </div>
            </div>

            <div className='mt-12 w-full flex flex-col items-center justify-center'>
                <h1 className='text-center brandFont text-2xl text-primary'>Previous Posts</h1>

                <div className='w-full grid grid-cols-1 items-start justify-start gap-7 mt-8 px-4'>
                    {
                        posts?.map(post => <div className='px-4 py-2 shadow-md rounded' key={post?._id}>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={post?.
                                            userPhoto} alt="user" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold">{post?.userName}</div>
                                    <div className="text-sm opacity-50">{moment(post?.date).format("LLL")}</div>
                                </div>


                            </div>
                            <div className='my-5'>
                                <h1 className='font-bold mb-2 text-lg'>{post?.postTitle}</h1>
                                <p>{post?.postDetails}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>
    );
};

export default PostForSolution;