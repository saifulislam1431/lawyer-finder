import React, { useState } from 'react';
import DashHead from '../../../Components/DashHead';
import useProfile from '../../../hooks/useProfile';
import { useForm } from 'react-hook-form';
import { HiMiniXMark, HiOutlineArrowUpTray, HiXMark } from 'react-icons/hi2';
import { IoMdCloudUpload } from 'react-icons/io';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
const token = import.meta.env.VITE_IMAGE_TOKEN;

const MyProfile = () => {
    const [axiosSecure] = useAxiosSecure();

    const [userInfo, refetch] = useProfile();
    console.log(userInfo);
    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [phone, setPhone] = useState(userInfo?.phone);
    const hosting_url = `https://api.imgbb.com/1/upload?key=${token}`
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();

    const onSubmit = async (data) => {
        const image = data?.photo;
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
                        photo: ResData?.data?.display_url
                    }

                    const response = await axiosSecure.patch(`/update-user-profile-picture/${userInfo?._id}`, newData)
                    if (response?.data?.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Logo updated!',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        refetch();
                        let modalCheckbox = document.getElementById("image-upload");
                        modalCheckbox.checked = false;
                    }


                }
            })

    }

    const handleEditProfile = async (id) => {
        const newData = {
            id,
            name,
            email,
            phone
        }
        const response = await axiosSecure.patch(`/edit-user-profile/${id}`, newData)
        if (response?.data?.modifiedCount > 0) {
            Swal.fire({
                title: 'Success!',
                text: 'Profile updated!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            refetch();
            let modalCheckbox = document.getElementById(id);
            modalCheckbox.checked = false;
        }
    }
    return (
        <section>
            <DashHead title="My Profile" />

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='relative'>
                        <img src={userInfo?.photo} className="max-w-sm rounded-lg shadow-2xl" />
                        <div className="max-w-sm rounded-lg shadow-2xl absolute top-0 w-full h-full bg-black opacity-0 flex items-center justify-center text-white hover:opacity-50 transition-all duration-500">
                            <label htmlFor="image-upload" className="bg-primary px-2 py-2 rounded-full cursor-pointer "><HiOutlineArrowUpTray className='w-8 h-8' /></label>

                        </div>
                        <input type="checkbox" id="image-upload" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box relative">
                                <div className="mb-3">
                                    <label
                                        htmlFor="image-upload"
                                        className="absolute top-3 right-3 cursor-pointer hover:text-error"
                                    >
                                        <HiXMark className="w-7 h-7" />
                                    </label>
                                </div>
                                <h3 className="font-bold text-lg mb-4">Change your picture!</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>
                                    <div className="upload-files-container bg-secondary bg-opacity-20 p-8 rounded-lg flex items-center justify-center flex-col space-y-5  w-[350px] lg:w-full">
                                        <div className="border-2 border-dashed border-primary rounded-lg p-8 w-full text-center flex flex-col items-center">
                                            <label className="text-xl w-full text-center flex flex-col items-center cursor-pointer">
                                                <IoMdCloudUpload className="w-10 h-10 text-success" />
                                                <span className="text-primary brandFont">
                                                    <input
                                                        type="file"
                                                        {...register("photo", { required: true })}
                                                        aria-invalid={errors.photo ? "true" : "false"}
                                                        className="default-file-input opacity-0"
                                                        multiple
                                                    />
                                                    <span className="browse-files-text">browse file</span>
                                                    <span> from device</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    {errors.photo?.type === 'required' && <p role="alert" className='text-error font-medium'>Photo is required</p>}

                                    <button type='submit' className='px-4 py-1 border mt-3 rounded text-sm font-semibold border-primary text-primary cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'>Upload</button>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold">{userInfo?.name}</h1>
                        <p className="pt-6 pb-2">Email: {userInfo?.email}</p>
                        <p className="pb-6">Phone: {userInfo?.phone}</p>
                        <div>
                            <Link to={`/dashboard/create-attorney-profile`} className="btn btn-primary">Create Attorney Profile</Link>
                            <label htmlFor={userInfo?._id} className="btn btn-primary ml-4">Edit</label>
                            <input type="checkbox" id={userInfo?._id} className="modal-toggle" />
                            <div className="modal" role="dialog">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg text-primary">Edit Info</h3>
                                    <div className='flex flex-col space-y-4 w-full my-7'>

                                        <label className='font-bold brandFont'>Name<sup className='text-error'>*</sup></label>
                                        <input type='text' defaultValue={userInfo?.name ? userInfo?.name : ""} placeholder='Enter Your Name'
                                            className='inputField' onChange={(e) => setName(e.target.value)} />
                                        {errors?.rating?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}

                                        <label className='font-bold brandFont'>Email<sup className='text-error'>*</sup></label>
                                        <input type='email' defaultValue={userInfo?.email ? userInfo?.email : ""} placeholder='Enter Your Email'
                                            className='inputField' onChange={(e) => setEmail(e.target.value)} />
                                        {errors?.rating?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                                        <label className='font-bold brandFont'>Phone<sup className='text-error'>*</sup></label>
                                        <input type='tel' defaultValue={userInfo?.phone ? userInfo?.phone : ""} placeholder='Enter Your Phone'
                                            className='inputField' onChange={(e) => setPhone(e.target.value)} />
                                        {errors?.rating?.type === 'required' && <p role="alert" className='text-error font-medium'>Phone is required</p>}

                                        {/* <label className='font-bold brandFont'>Email<sup className='text-error'>*</sup></label>
                                                <textarea rows="5" cols="10" placeholder="Write about attorney's professionalism and efficiency"
                                                    className='inputField' onChange={(e) => setReview(e.target.value)} />
                                                {errors.comment?.type === 'required' && <p role="alert" className='text-error font-medium'>Comment Letter is required</p>} */}

                                        <div className='text-center'>
                                            <button onClick={() => handleEditProfile(userInfo?._id)} className='myBtn text-center'>Submit</button>
                                        </div>
                                    </div>
                                    <div className="modal-action">
                                        <label htmlFor={userInfo?._id} className="absolute top-3 right-3 cursor-pointer hover:text-error"><HiMiniXMark className='w-6 h-6' /></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;