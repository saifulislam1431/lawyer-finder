import React from 'react';
import DashHead from '../../../Components/DashHead';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useJobApplication from '../../../hooks/useJobApplication';

const HireIntern = () => {
    const [applications, refetch] = useJobApplication();
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: allHiringPosts = [] } = useQuery({
        queryKey: ["userEmail", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/lawyer-hiring-post/${user?.email}`)
            return res.data;
        }
    })

    // console.log(applications);


    return (
        <section>
            <DashHead title="Hire Intern" />

            <div className='my-12 text-center'>
                <Link to="/dashboard/create-hiring-post" className='myBtn'>Create Hiring Post</Link>
            </div>


            <div>
                <h1 className='font-bold text-center brandFont text-3xl text-primary'>Previous Hiring Posts</h1>
                <div className='my-3 px-3 grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-3'>
                    {
                        allHiringPosts?.map(job => <div key={job?._id} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-primary">{job?.position}</h2>
                                <p className='font-semibold text-sm'>By {job?.law_firm}</p>
                                <p>{job?.job_type}</p>
                                <p>{job?.working_hours}</p>
                                <div className="card-actions justify-end">
                                    <Link className='myBtn' to={`/dashboard/apply-job-post/${job?._id}`}>Details</Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>

            <div className="overflow-x-auto my-12">
                <h1 className='font-bold text-center brandFont text-3xl text-primary my-5'>See Applicants</h1>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Position</th>
                            <th>Job Type</th>
                            <th>Working Hours</th>
                            <th>Applicants Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications?.map((application, indx) => <tr key={application?._id}>
                                <th>{indx + 1}</th>
                                <td>{application?.position}</td>
                                <td>{application?.job_type}</td>
                                <td>{application?.working_hours}</td>
                                <td>
                                    <button className="myBtn" onClick={() => document.getElementById(application?._id).showModal()}>See</button>
                                    <dialog id={application?._id} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-lg">Application of {application?.applicant_name}</h3>
                                            <div className='my-8 font-semibold'>
                                                <p>Email: {application?.applicant_email}</p>
                                                <p>Contact Number: {application?.applicant_number}</p>
                                                <p>Resume: <a href={application?.applicant_resume} target='_blank' className="text-blue-500 hover:underline text-sm">See Resume</a></p>
                                                <p className='mt-3'>Cover Letter: </p>
                                                <p className='my-3 border p-2 rounded'>{application?.applicant_cover_letter}</p>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default HireIntern;