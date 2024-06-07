import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../src/axios/baseUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {

  const emailFromStorage = localStorage.getItem("email")
  ? localStorage.getItem("email")
  : undefined;

  console.log(emailFromStorage)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: emailFromStorage,
    otp: "",
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
      const response = await axios.post(`${baseUrl}/auth/otp`, formData);
      console.log(response)
      const { token, email, userId } = response?.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo",  JSON.stringify(response?.data));
      toast.success(response?.data?.message, { autoClose: 200 });
      setTimeout(() => {
        navigate("/shop");
      }, 100);
    } catch (error) {
      toast.error("Error: " + error?.response?.data?.message, { autoClose: 200 });
    }
  };

  return (
    <div className="bg-black text-[#ebdd79] h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6">Enter OTP</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input 
          type="text" 
          id="email" 
          name="email" 
          className="p-2 mb-4 rounded border border-[#ebdd79] text-black" 
          required 
          onChange={handleChange}
          value={formData.email}
        />
        <label className="mb-2" htmlFor="otp">OTP</label>
        <input 
          type="text" 
          id="otp" 
          name="otp" 
          className="p-2 mb-4 rounded border border-[#ebdd79] text-black" 
          required 
          onChange={handleChange}
          value={formData.otp}
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
}

export default Otp;