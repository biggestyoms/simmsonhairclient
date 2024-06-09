import React, { useState } from 'react';
import Logo from "../images/simms.jpg";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";
import baseUrl from "../../src/axios/baseUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, formData);
      console.log(response)
      toast.success(response?.data?.message, { autoClose: 200 });
      const { email } = response?.data;
      localStorage.setItem("email", email);
      setTimeout(() => {
        navigate("/otp");
      }, 100);
    } catch (error) {
      toast.error("Error: " + error?.response?.data?.message, { autoClose: 200 });
    }
  };

  return (
    <div className='flex w-full h-[100dvh] flex-col items-center justify-between'>
      <div className='w-[40%] md:w-[16%] h-[15dvh] flex items-center justify-center md:h-[20dvh]'> 
        <img src={Logo} alt="" className='h-[10dvh] w-full' />
      </div>
      <form onSubmit={handleSubmit} className='text-white flex flex-col items-start md:items-center pl-2 pr-2 md:pl-0 md:border border-[#ebdd79] md:w-[40%] w-[80%] h-[60dvh] gap-5'>
        <p className='text-[40px] font-bold'>Sign In</p>
        <input type="text" placeholder='Enter your mail' className='bg-transparent md:w-[60%] w-full rounded-md outline-none text-white border md:h-10 h-14 border-[#ebdd79] placeholder-white p-5' name='email' value={formData.email} onChange={handleChange} />
        
        <div className='relative w-full md:w-[60%]'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='bg-transparent w-full rounded-md outline-none text-white border md:h-10 h-14 border-[#ebdd79] placeholder-white p-5 pr-10' name='password' value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none'
          >
            {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
          </button>
        </div>
        
        <Link to="/forgot-password"  className='text-white underline cursor-pointer'>Forgot Password</Link>
        <div className='w-full flex items-center flex-col justify-center gap-2'>
          <button type='submit' className='text-black font-semibold bg-[#ebdd79] md:w-[60%] h-10 flex items-center justify-center w-full'>
            Sign In
          </button>
        </div>
      </form>
      <div className='flex w-full items-center justify-center'>
        <p className='text-white flex gap-2'>Don't have an account? <Link to="/signup"><p className='text-white underline'>Create Account</p></Link></p>
      </div>
    </div>
  );
};

export default Login;