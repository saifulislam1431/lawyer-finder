import React from 'react';
import Main from '../Layout/Main';
import {
    createBrowserRouter,
} from "react-router-dom";
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home/Home';
import Services from '../Pages/Services/Services';
import Cases from '../Pages/Cases/Cases';
import Blogs from '../Pages/Blogs/Blogs';
import ContactUs from '../Pages/ContactUs/ContactUs';
import Consultation from '../Pages/Consultation/Consultation';
import About from '../Pages/About/About';
import SignIn from '../Pages/SignIn/SignIn';
import Signup from '../Pages/Signup/Signup';
import LawyerDetails from '../Pages/Cases/LawyerDetails';
import BlogDetails from '../Pages/Blogs/BlogDetails';
import PracticeSection from '../Pages/Home/PracticeSection/PracticeSection';
import ServiceDetails from '../Pages/Home/PracticeSection/ServiceDetails';
import PrivateRoute from './PrivateRoute';
import DashBoard from '../Pages/Dashboard/Dashboard';
import MangeBlogs from '../Pages/Dashboard/AdminDashboard/MangeBlogs';
import ManageUsers from '../Pages/Dashboard/AdminDashboard/ManageUsers';
import Support from '../Pages/Dashboard/AdminDashboard/Support';
import ManageBarAssociations from '../Pages/Dashboard/AdminDashboard/ManageBarAssociations';
import AttorneyProfile from '../Pages/Dashboard/AttorneyDashboard/AttorneyProfile';
import FeeStructure from '../Pages/Dashboard/AttorneyDashboard/FeeStructure';
import HireIntern from '../Pages/Dashboard/AttorneyDashboard/HireIntern';
import WriteBlog from '../Pages/Dashboard/AttorneyDashboard/WriteBlog';
import MyProfile from '../Pages/Dashboard/UserDashboard/MyProfile';
import PostForSolution from '../Pages/Dashboard/UserDashboard/PostForSolution';
import ApplyIntern from '../Pages/Dashboard/UserDashboard/ApplyIntern';
import WriteFeedback from '../Pages/Dashboard/UserDashboard/WriteFeedback';

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/service",
                element: <PracticeSection />
            },
            {
                path: "/cases",
                element: <Cases />
            },
            {
                path: "/blog",
                element: <Blogs />
            },
            {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/consultation",
                element: <Consultation />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/sign-in",
                element: <SignIn />
            },
            {
                path: "/sign-up",
                element: <Signup />
            },
            {
                path: "/lawyer-details/:id",
                element: <LawyerDetails />
            },
            {
                path: "/blog-details/:id",
                element: <BlogDetails />
            },
            {
                path: "/service-details/:name",
                element: <ServiceDetails />
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><DashBoard /></PrivateRoute>,
                children: [
                    {
                        path: "manage-blog",
                        element: <PrivateRoute><MangeBlogs /></PrivateRoute>
                    },
                    {
                        path: "manage-users",
                        element: <PrivateRoute><ManageUsers /></PrivateRoute>
                    },
                    {
                        path: "manage-supports",
                        element: <PrivateRoute><Support /></PrivateRoute>
                    },
                    {
                        path: "manage-bar-association",
                        element: <PrivateRoute><ManageBarAssociations /></PrivateRoute>
                    },
                    {
                        path: "attorney-profile",
                        element: <PrivateRoute><AttorneyProfile /></PrivateRoute>
                    },
                    {
                        path: "fee-structure",
                        element: <PrivateRoute><FeeStructure /></PrivateRoute>
                    },
                    {
                        path: "hire-intern",
                        element: <PrivateRoute><HireIntern /></PrivateRoute>
                    },
                    {
                        path: "write-blog",
                        element: <PrivateRoute><WriteBlog /></PrivateRoute>
                    },
                    {
                        path: "my-profile",
                        element: <PrivateRoute><MyProfile /></PrivateRoute>
                    },
                    {
                        path: "post-case",
                        element: <PrivateRoute><PostForSolution /></PrivateRoute>
                    },
                    {
                        path: "apply-intern",
                        element: <PrivateRoute><ApplyIntern /></PrivateRoute>
                    },
                    {
                        path: "write-feedback",
                        element: <PrivateRoute><WriteFeedback /></PrivateRoute>
                    }
                ]
            }
        ]
    },
]);

export default router;