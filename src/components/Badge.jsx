import React from 'react';

const Badge = ({ count }) => {
  return (
    <div className="absolute top-4 right-3 flex items-center justify-center w-4 h-4 bg-red-600 text-white text-xs rounded-full">
      {count}
    </div>
  );
};

export default Badge;

