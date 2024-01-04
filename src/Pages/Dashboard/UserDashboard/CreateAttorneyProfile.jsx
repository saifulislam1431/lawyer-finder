import React from 'react';
import DashHead from '../../../Components/DashHead';
import { useForm, Controller } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useProfile from '../../../hooks/useProfile';

const CreateAttorneyProfile = () => {

    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const [userInfo, refetch] = useProfile();

    const onSubmit = async (data) => {
        console.log(data);
        const response = await axiosSecure.post(`/create-lawyer/${userInfo?._id}`, data)
        console.log(response);
        if (response?.data?.insertedId && response?.data?.modifiedCount) {
            Swal.fire({
                title: 'Success!',
                text: 'Profile Created!',
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
            <DashHead title="Create Attorney Profile" />

            <div className='my-12'>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Create New Attorney</h2>

                    {/* Attorney Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Attorney Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={userInfo?.name}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("name", { required: true })}
                        />
                    </div>

                    {/* Attorney Email */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Attorney Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            defaultValue={userInfo?.email}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("email", { required: true })}
                        />
                    </div>

                    {/* Attorney Email */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                            Attorney Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            defaultValue={userInfo?.phone ? userInfo?.phone : ""}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("phone", { required: true })}
                        />
                    </div>

                    {/* Attorney Image URL */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            defaultValue={userInfo?.photo}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("image", { required: true })}
                        />
                    </div>

                    {/* Expertise in */}
                    <div className="mb-4">
                        <label htmlFor="expert_in" className="block text-sm font-medium text-gray-600">
                            Expertise In
                        </label>
                        <input
                            type="text"
                            id="expert_in"
                            name="expert_in"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("expert_in", { required: true })}
                        />
                    </div>

                    {/* Fee Structure */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Fee Structure</label>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex space-x-2">
                                <input
                                    type="text"
                                    name={`fee_structure[${index}].service_name`}
                                    placeholder="Service Name"
                                    className="p-2 border border-gray-300 rounded-md flex-1 my-2"
                                    {...register(`fee_structure[${index}].service_name`, { required: true })}
                                />
                                <input
                                    type="number"
                                    name={`fee_structure[${index}].fee`}
                                    placeholder="Fee"
                                    className="p-2 border border-gray-300 rounded-md flex-1 my-2"
                                    {...register(`fee_structure[${index}].fee`, { required: true })}
                                />
                                <input
                                    type="text"
                                    name={`fee_structure[${index}].details`}
                                    placeholder="Details"
                                    className="p-2 border border-gray-300 rounded-md flex-1 my-2"
                                    {...register(`fee_structure[${index}].details`, { required: true })}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            rows="4"
                            {...register("description", { required: true })}
                        ></textarea>
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
                            Rating
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            step="0.1"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("rating", { required: true })}
                        />
                    </div>

                    {/* Reviews */}
                    <div className="mb-4">
                        <label htmlFor="reviews" className="block text-sm font-medium text-gray-600">
                            Reviews
                        </label>
                        <input
                            type="number"
                            id="reviews"
                            name="reviews"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("reviews", { required: true })}
                        />
                    </div>

                    {/* Total Cases */}
                    <div className="mb-4">
                        <label htmlFor="total_case" className="block text-sm font-medium text-gray-600">
                            Total Cases
                        </label>
                        <input
                            type="number"
                            id="total_case"
                            name="total_case"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("total_case", { required: true })}
                        />
                    </div>

                    {/* Success Rate */}
                    <div className="mb-6">
                        <label htmlFor="success_rate" className="block text-sm font-medium text-gray-600">
                            Success Rate
                        </label>
                        <input
                            type="number"
                            id="success_rate"
                            name="success_rate"
                            step="0.1"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            {...register("success_rate", { required: true })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Create Attorney
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateAttorneyProfile;