import React from 'react';
const Banner = () => {
    return (
        <div className="hero h-[500px] mt-10" style={{ backgroundImage: 'url(https://i.ibb.co/bb8jvzB/Rectangle-4.png)' }}>
            <div className="hero-overlay bg-black bg-opacity-60"></div>
            <div className="hero-content text-center text-white">
                <div className="">
                    <h1 className="mb-7 text-5xl font-bold brandFont text-white max-w-md mx-auto">We Provide Effective Legal Solutions</h1>
                    <p className="mb-5"> Lawyer Finder is your go-to destination for swift access to skilled attorneys across various specialties. Navigate through a spectrum of case sections with ease, ensuring you find the right legal expert for your needs. Your journey to justice begins here!</p>
                    <div className='relative flex items-center justify-center max-w-lg mx-auto mt-8'>
                        <input type="text" placeholder='Search your services' className='w-full lg:w-96 py-3 px-4 rounded-md placeholder:text-sm' />
                        <button to="/consultation" className="myBtn absolute right-1 lg:right-[66px]">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;