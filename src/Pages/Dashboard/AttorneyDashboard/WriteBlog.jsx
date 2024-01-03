import React from 'react';
import DashHead from '../../../Components/DashHead';
import useProfile from '../../../hooks/useProfile';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { IoMdCloudUpload } from 'react-icons/io';
import Swal from 'sweetalert2';
const token = import.meta.env.VITE_IMAGE_TOKEN;

const WriteBlog = () => {
    const hosting_url = `https://api.imgbb.com/1/upload?key=${token}`
    const [userInfo] = useProfile();
    const [axiosSecure] = useAxiosSecure();
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();



    const onSubmit = async (data) => {
        const image = data?.thumbnails;
        const formData = new FormData();
        formData.append("image", image[0]);
        fetch(hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(async (ResData) => {

                if (ResData) {
                    const newData = {
                        thumbnails: ResData?.data?.display_url,
                        date: new Date(),
                        title: data?.title,
                        author: data?.author,
                        short_description: data?.short_description,
                        details: data?.details
                    }
                    console.log(newData);

                    const response = await axiosSecure.post("/create-new-blogs", newData)
                    if (response?.data?.insertedId) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Blog uploaded!',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        reset();
                    }


                }
            })
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ something: "" })
        }
    }, [formState, reset])
    return (
        <section>
            <DashHead title="Write Blog" />

            <div className="lg:w-full flex items-center justify-center">
                <div className='py-10 w-full'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>

                        <label className='font-bold brandFont'>Author Name<sup className='text-error'>*</sup></label>
                        <input type='text' defaultValue={userInfo?.name ? userInfo?.name : ""} placeholder='Enter Your Name'
                            {...register("author", { required: true })}
                            aria-invalid={errors?.author ? "true" : "false"}
                            className='inputField w-96 lg:w-[500px]' />
                        {errors?.author?.type === 'required' && <p role="alert" className='text-error font-medium'>Author Name is required</p>}


                        <label className='font-bold brandFont'>Blog Title<sup className='text-error'>*</sup></label>
                        <input type='text' placeholder='Enter Blog Title'
                            {...register("title", { required: true })}
                            aria-invalid={errors.title ? "true" : "false"}
                            className='inputField w-96 lg:w-[500px]' />
                        {errors.title?.type === 'required' && <p role="alert" className='text-error font-medium'>Blog Title is required</p>}

                        <label className='font-bold brandFont'>Thumbnails<sup className='text-error'>*</sup></label>
                        <div className="upload-files-container bg-secondary bg-opacity-20 p-8 rounded-lg flex items-center justify-center flex-col space-y-5  w-w-96 lg:w-[500px]">
                            <div className="border-2 border-dashed border-primary rounded-lg p-8 w-full text-center flex flex-col items-center">
                                <label className="text-xl w-full text-center flex flex-col items-center cursor-pointer">
                                    <IoMdCloudUpload className="w-10 h-10 text-success" />
                                    <span className="text-primary brandFont">
                                        <input
                                            type="file"
                                            {...register("thumbnails", { required: true })}
                                            aria-invalid={errors.thumbnails ? "true" : "false"}
                                            className="default-file-input opacity-0"
                                            multiple
                                        />
                                        <span className="browse-files-text">browse file</span>
                                        <span> from device</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        {errors.thumbnails?.type === 'required' && <p role="alert" className='text-error font-medium'>Thumbnails is required</p>}



                        <label className='font-bold brandFont'>Short Description<sup className='text-error'>*</sup></label>
                        <textarea rows="3" cols="5" placeholder='Short Description'
                            {...register("short_description", { required: true })}
                            aria-invalid={errors.short_description ? "true" : "false"}
                            className='inputField w-96 lg:w-[500px]' />
                        {errors.short_description?.type === 'required' && <p role="alert" className='text-error font-medium'>Short Description is required</p>}

                        <label className='font-bold brandFont'>Details Content<sup className='text-error'>*</sup></label>
                        <textarea rows="5" cols="10" placeholder='Cover Letter'
                            {...register("details", { required: true })}
                            aria-invalid={errors.details ? "true" : "false"}
                            className='inputField w-96 lg:w-[500px]' />
                        {errors.details?.type === 'required' && <p role="alert" className='text-error font-medium'>Details Content is required</p>}

                        <div className='text-center'>
                            <input type="submit" value="Submit" className='myBtn text-center' />
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default WriteBlog;