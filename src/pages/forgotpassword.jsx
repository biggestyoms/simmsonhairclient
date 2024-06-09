import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "../../src/axios/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/auth/forgot-password`, { email });

      if (response.status === 200) {
        toast.success('Password reset link sent to your email', { autoClose: 300 });
      } else {
        toast.error(response?.data?.message || 'Something went wrong', { autoClose: 300 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', { autoClose: 300 });
    }
  };

  return (
    <div className="bg-black text-[#ebdd79] h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6">Forgot Password</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="mb-2" htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="p-2 mb-4 rounded border border-[#ebdd79] text-black" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <button 
          type="submit" 
          className="p-2 bg-[#ebdd79] text-black rounded cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
