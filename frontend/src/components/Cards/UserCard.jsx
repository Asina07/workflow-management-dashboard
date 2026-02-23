import React from 'react'
import StatCard from './StatCard'

const UserCard = ({ userInfo }) => {
    // console.log(userInfo, "userInfo in card")
  return (
    <div className='user-card p-2'>
        <div className='flex items-center justify-between '>
            <div className='flex items-center gap-3'>
                <img src={userInfo.profileImageUrl} alt="profile" className='w-10 h-10 rounded-full object-cover border-2 border-white' />
                <div>
                    <p className="font-medium text-sm">{userInfo.name}</p>
                    <p className="text-gray-500 text-sm">{userInfo.email}</p>
                </div>
            </div>
        </div>
        <div className='flex items-end gap-3 mt-5'>
            <StatCard label='Pending' count={userInfo?.pendingTasks || 0} status='pending' />
            <StatCard label='In Progress' count={userInfo?.inProgressTasks || 0} status='inProgress' />
            <StatCard label='Completed' count={userInfo?.completedTasks || 0} status='completed' />
        </div>
    </div>
  )
}

export default UserCard