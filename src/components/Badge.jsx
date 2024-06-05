import React from 'react';

const Badge = ({ count }) => {
  return (
    <div className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 bg-red-600 text-white text-xs rounded-full">
      {count}
    </div>
  );
};

export default Badge;

