import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-5 rounded-lg shadow-lg relative z-10">
        <button onClick={onClose} className="absolute top-0 right-0 m-2 text-gray-700">&times;</button>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Popup