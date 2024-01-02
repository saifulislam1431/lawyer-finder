import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import useAdmin from '../../hooks/useAdmin';
import logo from "../../assets/logo/logo1.png"
import { HiBars3BottomLeft, HiCreditCard, HiHome, HiMiniAdjustmentsHorizontal, HiMiniListBullet, HiMiniPencilSquare, HiMiniPlus, HiMiniUserGroup, HiOutlineCheckBadge, HiOutlinePencilSquare, HiOutlinePlus, HiOutlineRss, HiOutlineStar, HiOutlineUserCircle, HiOutlineUserGroup, HiOutlineUserPlus, HiPencilSquare, HiShoppingBag } from 'react-icons/hi2';

import { IoIosHeadset, IoMdCheckmarkCircleOutline } from "react-icons/io";


const DashBoard = () => {
    // const [isAdmin] = useAdmin();
    const isAdmin = false;
    const isAttorney = false;

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet />
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden absolute left-2 top-2"><HiBars3BottomLeft className='w-10 h-10 text-primary' /></label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu py-4 pl-4 pr-0 w-64 h-full bg-base-200 text-base-content">
                    <Link to="/" className='inline-flex items-center gap-4 mt-10'>
                        <img src={logo} alt="Logo" className='w-9' />
                        <p className='brandFont font-bold text-xl'>Lawyer Finder</p>
                    </Link>
                    {/* Sidebar content here */}



                    {
                        isAdmin ?
                            <>
                                <NavLink to="/dashboard/manage-blog" className={({ isActive }) => (isActive ? "dash-active mt-5" : "dash-default mt-5")}><HiMiniAdjustmentsHorizontal className='inline-flex items-center h-6 w-6' /> Manage Blog</NavLink>


                                <NavLink to="/dashboard/manage-users" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniUserGroup className='inline-flex items-center h-6 w-6' /> Manage Users</NavLink>

                                <NavLink to="/dashboard/manage-supports" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><IoIosHeadset className='inline-flex items-center h-6 w-6' /> Support</NavLink>

                                <NavLink to="/dashboard/manage-bar-association" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiOutlinePencilSquare className='inline-flex items-center h-6 w-6' /> Manage bar associations</NavLink>
                            </> : isAttorney ? <>

                                <NavLink to="/dashboard/attorney-profile" className={({ isActive }) => (isActive ? "dash-active mt-5" : "dash-default mt-5")}><HiOutlineUserCircle className='inline-flex items-center h-6 w-6' /> My Profile</NavLink>

                                <NavLink to="/dashboard/fee-structure" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiCreditCard className='inline-flex items-center h-6 w-6' /> Fee Structure</NavLink>

                                <NavLink to="/dashboard/hire-intern" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiOutlineUserPlus className='inline-flex items-center h-6 w-6' /> Hire Intern</NavLink>

                                <NavLink to="/dashboard/write-blog" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniPencilSquare className='inline-flex items-center h-6 w-6' /> Write Blog</NavLink>
                            </>

                                :
                                <>

                                    <NavLink to="/dashboard/my-profile" className={({ isActive }) => (isActive ? "dash-active mt-5" : "dash-default mt-5")}><HiOutlineUserCircle className='inline-flex items-center h-6 w-6' /> My Profile</NavLink>

                                    <NavLink to="/dashboard/post-case" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiPencilSquare className='inline-flex items-center h-6 w-6' /> Post For Solution</NavLink>

                                    <NavLink to="/dashboard/apply-intern" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><IoMdCheckmarkCircleOutline className='inline-flex items-center h-6 w-6' /> Apply Intern</NavLink>

                                    <NavLink to="/dashboard/write-feedback" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiMiniPencilSquare className='inline-flex items-center h-6 w-6' /> Write Feedback</NavLink>
                                </>
                    }

                    <li className='my-8 divide-x-4'>

                    </li>

                    <NavLink to="/" className={({ isActive }) => (isActive ? "dash-active" : "dash-default")}><HiHome className='inline-flex items-center gap-2 h-5 w-5' /> Home</NavLink>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;