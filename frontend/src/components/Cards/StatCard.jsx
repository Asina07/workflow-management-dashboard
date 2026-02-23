import React from "react";

const StatCard = ({ label, count, status }) => {

    const getStatusTagColor = ()=>{
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'inProgress':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }


  return <div className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
    <span className='text-[12px] font-semibold'>{count}</span><br/>{label}
  </div>;
};

export default StatCard;
