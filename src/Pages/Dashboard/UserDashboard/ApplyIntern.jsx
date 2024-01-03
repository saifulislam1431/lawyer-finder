import React from 'react';
import DashHead from '../../../Components/DashHead';
import useJobPost from '../../../hooks/useJobPost';
import { Link } from 'react-router-dom';

const ApplyIntern = () => {
    const [allJobs, refetch] = useJobPost();
    console.log(allJobs);
    return (
        <section>
            <DashHead title="Apply Intern" />

            <div className='my-12 px-3 grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-3'>
                {
                    allJobs?.map(job => <div key={job?._id} className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-primary">{job?.position}</h2>
                            <p className='font-semibold text-sm'>By {job?.law_firm}</p>
                            <p>{job?.job_type}</p>
                            <p>{job?.working_hours}</p>
                            <div className="card-actions justify-end">
                                <Link className='myBtn' to={`/dashboard/apply-job-post/${job?._id}`}>Apply</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default ApplyIntern;