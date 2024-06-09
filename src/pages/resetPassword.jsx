import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import baseURL from "../../src/axios/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.success('Passwords do not match', { autoClose: 300 });
      return;
    }
    try {
      const response = await axios.put(`${baseURL}/auth/reset-password/${resetToken}`, { newPassword: password });

      if (response.status === 200) {
        toast.success('Password reset successful', { autoClose: 300 });
      } else {
        toast.error(response.data.message || 'Something went wrong', { autoClose: 300 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', { autoClose: 300 });
    }
  };

  return (
    <div className="bg-black text-[#ebdd79] h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6">Reset Password</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="mb-2" htmlFor="password">Enter New Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          className="p-2 mb-4 rounded border border-[#ebdd79] text-black" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <label className="mb-2" htmlFor="confirmPassword">Confirm New Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          className="p-2 mb-4 rounded border border-[#ebdd79] text-black" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
