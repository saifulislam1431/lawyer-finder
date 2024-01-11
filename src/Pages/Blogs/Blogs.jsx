import React from 'react';
import useBlogs from '../../hooks/useBlogs';
import SectionHead from '../../Components/SectionHead';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [allBlogs, refetch] = useBlogs();
    console.log(allBlogs);
    return (
        <section className='my-12'>
            <SectionHead title="Legal Insights Blog" description=" Explore In-Depth Articles on Diverse Legal Topics" />


            <div className='flex items-center justify-center my-10 px-4'>

                <div className='grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-4'>
                    {
                        allBlogs?.map(blog => <div className="card w-96 h-56 bg-base-200 shadow-xl image-full" key={blog?._id}>
                            <figure><img src={blog?.thumbnails} alt="Blog thumbnails" className='w-full' /></figure>
                            <div className="card-body">
                                <h2 className=" text-lg font-bold text-accent">{blog?.title}</h2>
                                <p className='text-white'>{blog?.short_description?.slice(0, 50)}</p>

                                <div>
                                    <Link to={`/blog-details/${blog?._id}`} className='myBtn'>Read</Link>
                                </div>

                            </div>
                        </div>)
                    }
                </div>

            </div>
        </section>
    );
};

export default Blogs;