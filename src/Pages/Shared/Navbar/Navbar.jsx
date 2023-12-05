import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiChevronRight } from "react-icons/hi2";
import logo from "../../../assets/logo/logo1.png"

const Navbar = () => {
    const navItem = <>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Home</NavLink></li>

        <li><NavLink to="/services" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Services <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/cases" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Cases <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/blog" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Blog <HiChevronRight className='h-5 w-5' /></NavLink></li>

        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "navActive" : "navDefault")}>Contact Us <HiChevronRight className='h-5 w-5' /></NavLink></li>
    </>

    const logoContainer = <>
        <Link to="/" className='inline-flex items-center gap-4'>
            <img src={logo} alt="Logo" className='w-9' />
            <p className='brandFont font-bold text-xl'>Lawyer Finder</p>
        </Link>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
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
            <div className="navbar-end">
                <Link to="/consultation" className="myBtn">Free Consultation</Link>
            </div>
        </div>
    );
};

export default Navbar;