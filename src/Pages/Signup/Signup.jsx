import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import img from "../../assets/Banner/banner4.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import imgLogo from "../../assets/Banner/imglogo.png"
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';


const token = import.meta.env.VITE_IMAGE_TOKEN;
const Signup = () => {
    const { updateUser, signUp, userVerify } = useAuth();
    const [type, setType] = useState("password");
    const [IsShow, setIsShow] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"
    const { register, formState: { errors }, handleSubmit } = useForm();
    const hosting_url = `https://api.imgbb.com/1/upload?key=${token}`



    const onSubmit = (data) => {
        const image = data?.photo;
        // console.log(image[0]);
        const formData = new FormData();
        formData?.append("image", image[0])

        const password = data.password;
        const confirmPassword = data.confirmPassword;
        if (password.length < 6) {
            return setError("Password must be six characters in length")
        }
        if (password !== confirmPassword) {
            return setError("Password doesn't match")
        }
        if (!/(?=.*?[A-Z])/.test(password)) {
            return setError("At least one upper case include in your password")
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            return setError("At least one special character include in your password")
        }



        fetch(hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(ResData => {
                console.log(ResData)
                if (ResData) {
                    const newUser = {
                        email: data?.email,
                        name: data?.name,
                        phone: data?.phone,
                        gender: data?.gender,
                        photo: ResData?.data?.url || "https://i.ibb.co/yyYWbyJ/user.png",
                        role: "User"

                    }


                    signUp(data?.email, data?.password)
                        .then((res) => {
                            const loggedUser = res?.user;

                            updateUser(loggedUser, data?.name)
                                .then(async () => {
                                    userVerify()
                                        .then(async () => {
                                            // Swal.fire({
                                            //     title: 'Success!',
                                            //     text: 'Sign up successful and check your email to verify!',
                                            //     icon: 'success',
                                            //     confirmButtonText: 'Ok'
                                            // })
                                            const res = await axios.post('http://localhost:5000/users', newUser);
                                            // console.log(res.data)
                                            if (res?.data?.insertedId) {
                                                navigate(from, { replace: true })
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'Sign up successful and check your email to verify!',
                                                    icon: 'success',
                                                    confirmButtonText: 'Ok'
                                                })
                                            }
                                        })
                                })


                        })
                        .catch(error => {
                            Swal.fire({
                                title: 'Error!',
                                text: error.message,
                                icon: 'error',
                                confirmButtonText: 'Cool'
                            })

                        })

                }

            })

        // console.log(data);


    }


    const handleShow = () => {
        setType("text")
    }

    const handleHide = () => {
        setType("password")
    }
    return (
        <section className='flex flex-col space-y-10 lg:space-y-0 lg:flex-row w-4/5 mx-auto rounded-xl my-14 border-2'>

            {/* left part */}
            <div className='p-8 w-full lg:w-1/2 border-r-2 bg-white'>
                <Link to="/" className='inline-flex items-center gap-2   text-xl font-bold '><HiArrowSmallLeft className='h-6 w-6' />Back</Link>
                <img src={img} alt="" className='w-3/4 mx-auto' />
                <p className='mt-7 text-center'> Already Have An Account ? </p>

                <div className='text-center my-5 text-xs'>
                    <Link className='text-center' to="/signIn">
                        <button className='px-8 py-2 border border-primary text-base rounded-r-full rounded-l-full text-red-600  hover:text-white  hover:bg-red-600  transition-all duration-300'>Sign In</button>
                    </Link>
                </div>

            </div>

            {/* right part */}
            <div className='w-full lg:w-1/2 p-8 bg-white'>
                <h1 className='text-center text-2xl font-bold pb-4 mt-4'> Create An Account
                </h1>
                <p className='text-center'> Become a member to get your desire law solution </p>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-[90%] mx-auto mt-10'>

                    <div className='flex justify-center'>
                        <input {...register("photo", { required: true })} type="file" id='file' className='hidden' />
                        <label for="file" className=' border rounded-full'>
                            <img className='w-20 rounded-full hover:border-blue-500 border-4 transform duration-500' src={imgLogo} alt="" />
                        </label>
                    </div>
                    <input type='text' placeholder='Enter Your Name'
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                        className='inputField' />
                    {errors.name?.type === 'required' && <p role="alert" className='text-error font-medium'>Name is required</p>}



                    <input type='email' placeholder='Enter Your Email'
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                        className='inputField' />
                    {errors.email?.type === 'required' && <p role="alert" className='text-error font-medium'>Email is required</p>}

                    <input type='tel' placeholder='Enter Your Number'
                        {...register("phone", { required: true })}
                        aria-invalid={errors.phone ? "true" : "false"}
                        className='inputField' />
                    {errors.phone?.type === 'required' && <p role="alert" className='text-error font-medium'>Phone is required</p>}

                    <div className='inline-flex items-center w-full relative'>
                        <input type={type} placeholder='Enter Your Password'
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                            className='inputField' />
                        <div className='absolute right-3 cursor-pointer' onClick={() => setIsShow(!IsShow)}>
                            {
                                IsShow ? <FaEyeSlash className='h-5 w-5 text-red-600 ' onClick={handleHide} /> : <FaEye className='h-5 w-5 text-red-600 ' onClick={handleShow} />
                            }
                        </div>
                    </div>
                    {errors.password && <p role="alert" className='text-error font-medium'>{errors.password?.message}</p>}

                    <div className='inline-flex items-center'>
                        <input type="password" placeholder='Confirm Password'
                            {...register("confirmPassword", { required: "Confirm Password is required" })}
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                            className='inputField' />
                    </div>
                    {errors.confirmPassword && <p role="alert" className='text-error font-medium'>{errors.confirmPassword?.message}</p>}


                    {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}







                    <p className='my-3 font-semibold text-red-600'>{error}</p>

                    <button input type="submit" className="btn btn-block px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-700  text-white inline-block">
                        <span className="absolute bottom-0 left-0 flex w-full h-0 mt-0 transition-all duration-500 ease-out transform translate-y-0 bg-red-600  group-hover:h-full ">
                        </span><span className="relative group-hover:text-gray-800 flex items-center gap-4 justify-center">
                            Sign Up  </span></button>
                </form>



            </div>

        </section>
    );
};

export default Signup;