import React from 'react';
import DashHead from '../../../Components/DashHead';
import useAttorneyProfile from '../../../hooks/useAttorneyProfile';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FeeStructure = () => {
    const [attorneyInfo, refetch] = useAttorneyProfile();

    const { register, formState: { errors }, handleSubmit, reset, formState, watch } = useForm();
    const [axiosSecure] = useAxiosSecure();

    const onSubmit = async (data) => {
        const newData = {
            fee_structure: data?.fee_structure
        }
        // console.log(newData);
        const response = await axiosSecure.patch(`/update-fee-structure/${attorneyInfo?._id}`, newData)
        console.log(response);
        if (response?.data?.modifiedCount > 0) {
            Swal.fire({
                title: 'Success!',
                text: 'Fee Structure updated!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            refetch();
        }
    }

    return (
        <section>
            <DashHead title="Fee Structure" />

            <div className='my-12'>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-8">

                    {/* Fee Structure */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Fee Structure</label>

                        {
                            attorneyInfo?.fee_structure?.map((fee, index) => (
                                <div key={index} className="flex space-x-2 flex-col items-center justify-center">
                                    <div className='space-x-2'>
                                        <input
                                            type="text"
                                            name={`fee_structure[${index}].service_name`}
                                            defaultValue={fee?.service_name}
                                            placeholder="Service Name"
                                            className="p-2 border border-gray-300 rounded-md flex-1 my-2"
                                            {...register(`fee_structure[${index}].service_name`, { required: true })}
                                        />
                                        <input
                                            type="number"
                                            name={`fee_structure[${index}].fee`}
                                            placeholder="Fee"
                                            defaultValue={fee?.fee}
                                            className="p-2 border border-gray-300 rounded-md flex-1 my-2"
                                            {...register(`fee_structure[${index}].fee`, { required: true })}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <textarea rows="5" cols="10"
                                            type="text"
                                            name={`fee_structure[${index}].details`}
                                            placeholder="Details"
                                            defaultValue={fee?.details}
                                            className="p-2 border border-gray-300 rounded-md  my-2 w-full"
                                            {...register(`fee_structure[${index}].details`, { required: true })}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Update structure
                    </button>
                </form>
            </div>
        </section>
    );
};

export default FeeStructure;