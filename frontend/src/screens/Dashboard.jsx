import React from 'react'
import AdminDsiplay from '../pages/AdminDsiplay'

const Dashboard = () => {
  return (
    <div className='contain w-screen h-screen flex p-3 bg-[#11191f]'>
      <div className="sidebar w-[18%] h-full text-white flex flex-col items-center justify-between">
        <div className='flex w-full items-center gap-3 text-2xl'>
            <i className="fa-solid fa-heart-pulse border-1 p-2 rounded-[50%] border-gray-700 flex"></i>
            <h1>ProfitPulse</h1>
        </div>

        <ul className='w-full flex flex-col gap-8 pl-7'>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-solid fa-house"></i><p>Dashboard</p></li>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-brands fa-first-order"></i><p>Orders</p></li>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-solid fa-credit-card"></i><p>Payments</p></li>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-solid fa-person"></i><p>Customers</p></li>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-solid fa-flag"></i><p>Reports</p></li>
        </ul>
        <ul className='w-full flex flex-col gap-8 pl-7'>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-solid fa-bell"></i><p>Notification</p></li>
            <li className='flex items-center gap-3 cursor-pointer'><i className="fa-solid fa-circle-info"></i><p>Help</p></li>
            <li className='flex items-center gap-3 cursor-pointer'><i class="fa-solid fa-gear"></i><p>Settings</p></li>
        </ul>

        <div className='flex gap-3 text-[20px] w-full pl-7 cursor-pointer'>
            <i class="fa-solid fa-right-from-bracket rotate-180"></i>
            Logout
        </div>
      </div>
      <AdminDsiplay/>
    </div>
  )
}

export default Dashboard
