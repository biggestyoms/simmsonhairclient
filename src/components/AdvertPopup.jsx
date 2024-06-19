import React from 'react';
import { IoClose } from "react-icons/io5";

const AdvertPopup = ({ show, handleClose, message, messages }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[white] popup-img md:w-[35%] w-[90%] h-[50dvh] text-white font-extrabold relative p-6 rounded-[20px] flex flex-col items-center justify-center shadow-md text-center">
            <div className='w-full h-full absolute pop-blur z-10'></div>
            <p className="mb-4 z-50 font-[700] text-[30px]">{message}</p>
            <p className="font-[200] z-50 text-[20px]">{messages}</p>
            <button 
              onClick={handleClose} 
              className="bg-[#ffffff90] z-50 text-black m-2 p-2 rounded-lg absolute top-0 right-0"
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertPopup;
