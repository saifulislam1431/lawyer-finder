import React from 'react';
import DashHead from '../../../Components/DashHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { HiXMark } from 'react-icons/hi2';

const Support = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allSupport = [], refetch } = useQuery({
        queryKey: ["all-support"],
        queryFn: async () => {
            const response = await axiosSecure.get("/get-all-support")
            return response.data
        }
    })

    console.log(allSupport);

    return (
        <section>
            <DashHead title="Support" />


            <div className="overflow-x-auto my-12">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Contact</th>
                            <th>Service Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSupport?.map(support => <tr key={support?._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{support?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {support?.email}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{support?.number}</span>
                                </td>
                                <td>{support?.service}</td>
                                <th>
                                    <label htmlFor={support?._id} className="btn btn-ghost btn-xs">Info</label>
                                    <input type="checkbox" id={support?._id} className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box relative">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor={support?._id}
                                                    className="absolute top-3 right-3 cursor-pointer hover:text-error"
                                                >
                                                    <HiXMark className="w-7 h-7" />
                                                </label>
                                            </div>
                                            <h3 className="font-bold text-lg">Case Info of {support?.name}</h3>
                                            <div className='my-4'>
                                                <p className="py-4">{support?.message}</p>
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

export default Support;