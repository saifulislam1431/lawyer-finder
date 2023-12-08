import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiChevronRight } from "react-icons/hi2";
import logo from "../../../assets/logo/logo1.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItem = <>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Home</NavLink></li>

        <li><NavLink to="/services" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Services <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/cases" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Lawyer <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/blog" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Blog <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Contact Us <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/sign-in" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Sign In <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li className='lg:hidden'>
            <Link to="/consultation" className="myBtn">Free Consultation</Link>
        </li>
    </>

    const logoContainer = <>
        <Link to="/" className='inline-flex items-center gap-4'>
            <img src={logo} alt="Logo" className='w-9' />
            <p className='brandFont font-bold text-xl'>Lawyer Finder</p>
        </Link>
    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navItem
                        }
                    </ul>
                </div>
                {
                    logoContainer
                }
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navItem
                    }
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex">
                <Link to="/consultation" className="myBtn">Free Consultation</Link>
            </div>

            <div className="navbar-end flex lg:hidden">
                <label className="btn btn-circle swap swap-rotate">

                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg onClick={() => setIsOpen(!isOpen)} className="swap-off fill-primary" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                    {/* close icon */}
                    <svg onClick={() => setIsOpen(!isOpen)} className="swap-on fill-error" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                </label>


                <ul className={`${isOpen ? "absolute top-16 left-0 space-y-5 flex flex-col items-center bg-white w-full py-6 transition-all duration-300" : "absolute -top-96 left-0 space-y-5 flex flex-col items-center bg-success bg-opacity-40 w-full py-6 transition-all duration-300"}`}>
                    {navItem}
                </ul>

            </div>
        </div>
    );
};

export default Navbar;