import React, { useState } from 'react';
import DashHead from '../../../Components/DashHead';
import useAllLawyers from '../../../hooks/useAllLawyers';
import { HiMiniXMark } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import useProfile from '../../../hooks/useProfile';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const WriteFeedback = () => {
    const [axiosSecure] = useAxiosSecure();
    const [allLawyers, refetch] = useAllLawyers();
    const [userInfo] = useProfile();
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    // console.log(allLawyers);
    // const onSubmit = async (data) => {
    //     console.log(data);
    //     console.log("Clicked");
    // }

    const handleFeedback = async (id) => {
        const data = {
            lawyerId: id,
            rating,
            review,
            clientName: userInfo?.name,
            clientEmail: userInfo?.email
        }

        const response = await axiosSecure.post("/create-feedback", data)
        if (response.data.insertedId) {
            Swal.fire({
                title: 'Success!',
                text: 'Feedback Send!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            setRating("");
            setReview("");
            const modalCheckbox = document.getElementById(id);
            modalCheckbox.checked = false;
        }
        // console.log(data);

    }
    return (
        <section>
            <DashHead title="Write Feedback" />


            <div className="overflow-x-auto my-14">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Attorney Name</th>
                            <th>Expert In</th>
                            <th>Success Rate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allLawyers?.map(lawyer => <tr key={lawyer?._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={lawyer?.image} alt="Attorney" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{lawyer?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>

                                    <span className="badge badge-ghost badge-sm">{lawyer?.expert_in}</span>
                                </td>
                                <td className='font-semibold'>{lawyer?.success_rate}%</td>
                                <th>
                                    <label htmlFor={lawyer?._id} className="myBtnSec">Write</label>
                                    <input type="checkbox" id={lawyer?._id} className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg text-primary">Leave a feedback for {lawyer?.name}</h3>
                                            <div className='flex flex-col space-y-4 w-full my-7'>

                                                <label className='font-bold brandFont'>Rating<sup className='text-error'>*</sup></label>
                                                <input type='text' placeholder='Enter Your Rating'
                                                    className='inputField' onChange={(e) => setRating(e.target.value)} />
                                                {errors?.rating?.type === 'required' && <p role="alert" className='text-error font-medium'>Rating is required</p>}

                                                <label className='font-bold brandFont'>Comment<sup className='text-error'>*</sup></label>
                                                <textarea rows="5" cols="10" placeholder="Write about attorney's professionalism and efficiency"
                                                    className='inputField' onChange={(e) => setReview(e.target.value)} />
                                                {errors.comment?.type === 'required' && <p role="alert" className='text-error font-medium'>Comment Letter is required</p>}

                                                <div className='text-center'>
                                                    <button onClick={() => handleFeedback(lawyer?._id)} className='myBtn text-center'>Submit</button>
                                                </div>
                                            </div>
                                            <div className="modal-action">
                                                <label htmlFor={lawyer?._id} className="absolute top-3 right-3 cursor-pointer hover:text-error"><HiMiniXMark className='w-6 h-6' /></label>
                                            </div>
                                        </div>
                                    </div>
                                </th>

                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </section>
    );
};

export default WriteFeedback;