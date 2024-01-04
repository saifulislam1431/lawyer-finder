import React from 'react';
import DashHead from '../../../Components/DashHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoMdTrash } from 'react-icons/io';
import Swal from 'sweetalert2';

const ManageBarAssociations = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allLawyers = [], refetch } = useQuery({
        queryKey: ["all-support"],
        queryFn: async () => {
            const response = await axiosSecure.get("/get-all-attorney")
            return response.data
        }
    })
    console.log(allLawyers);

    const handleLawyer = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert the attorney!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete him!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/delete-attorney/${id}`)
                if (response.data?.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The attorney has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });

    }
    return (
        <section>
            <DashHead title="Manage Bar Associations" />

            <div className="overflow-x-auto my-14">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Attorney</th>
                            <th>Contact</th>
                            <th>Success Rate</th>
                            <th>Total Case</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allLawyers?.map((lawyer, indx) => <tr key={lawyer?._id}>
                                <th>
                                    {indx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={lawyer?.image} alt="Attorney" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{lawyer?.name}</div>
                                            <span className="badge badge-ghost badge-sm">{lawyer?.expert_in}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {lawyer?.email ? lawyer?.email : "example@gmail.com"}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{lawyer?.phone ? lawyer?.phone : "+880123456789"}</span>
                                </td>
                                <td className='font-semibold'>{lawyer?.success_rate}%</td>
                                <td className='font-semibold'>{lawyer?.total_case}</td>
                                <th>
                                    <button className='mt-4 px-2 py-2 rounded-full border bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300' onClick={() => handleLawyer(lawyer?._id)}><IoMdTrash className='h-6 w-6' /></button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageBarAssociations;