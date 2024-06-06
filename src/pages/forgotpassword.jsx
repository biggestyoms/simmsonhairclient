import React from 'react';

const Forgotpassword = () => {
  return (
    <div className="bg-black text-[#ebdd79] h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6">Forgot Password</h2>
      <form className="flex flex-col items-center">
        <label className="mb-2" htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
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

export default Forgotpassword;