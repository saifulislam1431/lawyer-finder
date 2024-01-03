import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionHead from '../../Components/SectionHead';
import moment from 'moment';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/single-blog-details/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [id])
    console.log(blog);
    return (
        <section className='my-10'>
            <SectionHead title="Read The Story!" />

            <div className="hero bg-base-100 mt-16 lg:px-20 px-1">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={blog?.thumbnails} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-6xl font-bold text-primary brandFont">{blog?.title}</h1>
                        <p className="pt-4 text-lg font-semibold">By {blog?.author}</p>
                        <p className=" text-lg font-semibold">{moment(blog?.date).format("LLL")}</p>
                    </div>
                </div>
            </div>

            <div className='mt-10 lg:px-20 px-4 text-lg'>
                <p className='first-letter:text-5xl first-letter:font-semibold'>{blog?.short_description}</p>
                <p>{blog?.details}</p>
            </div>
        </section>
    );
};

export default BlogDetails;