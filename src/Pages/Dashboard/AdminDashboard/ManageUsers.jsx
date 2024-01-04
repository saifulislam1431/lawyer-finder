import React from 'react';
import DashHead from '../../../Components/DashHead';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoMdTrash } from 'react-icons/io';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ["manage-users"],
        queryFn: async () => {
            const response = await axiosSecure.get("/get-all-user")
            return response.data
        }
    })
    console.log(allUsers);

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert the user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/user-delete/${id}`)
                if (response.data?.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The user has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });
    }

    const handleAdmin = async (id) => {
        const user = allUsers?.find(user => user?._id === id)
        Swal.fire({
            title: "Are you sure?",
            text: "The user will be admin of this site!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.patch(`/users/admin/${id}`)
                if (response.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: `${user?.name} is an admin now!`,
                        icon: "success"
                    });
                    refetch();
                }

            }
        });

    }

    const handleRemoveAdmin = async (id) => {
        const user = allUsers?.find(user => user?._id === id)
        Swal.fire({
            title: "Are you sure?",
            text: "The user will be remove admin access of this site!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosSecure.patch(`/users/remove/admin/${id}`)
                if (response.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: `${user?.name} is an user now!`,
                        icon: "success"
                    });
                    refetch();
                }

            }
        });

    }
    return (
        <section>
            <DashHead title="Manage Users" />

            <div className="overflow-x-auto my-12">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers?.map(user => <tr key={user?._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photo} alt="User" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                            <span className="badge badge-ghost badge-sm">{user?.role}</span>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user?.email}
                                    <br />
                                    <div className="text-sm opacity-50">{user?.phone}</div>
                                </td>
                                <th className='flex items-center gap-3'>
                                    <button className='px-2 py-2 rounded-full border bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300 cursor-pointer' onClick={() => handleDelete(user?._id)}><IoMdTrash className='h-6 w-6' /></button>

                                    <button disabled={user?.role === "admin" ? true : false} className='px-2 py-2 rounded border bg-green-600 text-white border-green-600 hover:bg-white hover:text-green-600 transition-all duration-300 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => handleAdmin(user?._id)}>Admin</button>

                                    <button className='px-2 py-2 rounded-full border bg-primary text-white border-primary hover:bg-white hover:text-primary transition-all duration-300 cursor-pointer font-medium' onClick={() => handleRemoveAdmin(user?._id)}>Remove Admin</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageUsers;