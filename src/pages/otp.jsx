import React from 'react';

const Otp = () => {
  return (
    <div className="bg-black text-[#ebdd79] h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6">Enter OTP</h2>
      <form className="flex flex-col items-center">
        <label className="mb-2" htmlFor="otp">OTP</label>
        <input 
          type="text" 
          id="otp" 
          name="otp" 
          className="p-2 mb-4 rounded border border-[#ebdd79] text-black" 
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
}

export default Otp;