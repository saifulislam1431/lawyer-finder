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
                path: "/services",
                element: <Services />
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
            }
        ]
    },
]);

export default router;