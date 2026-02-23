

import React from "react";

const Progress = ({progress,status}) => {
  const getColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <div className='w-full bg-gray-200 rounded-full h-1.5'>
    <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`} style={{width: `${progress}%`}}>{progress}%</div>
  </div>;
};

export default Progress;
