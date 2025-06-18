import React from 'react'
import AdminDsiplay from '../pages/AdminDsiplay'
import { Navigate, NavLink } from 'react-router-dom'

const Dashboard = () => {
  const logout = () =>{
    console.log("Logouted")
    localStorage.removeItem('token');
    window.location.href = "/login";
  }
  return (
    <div className='contain w-screen h-screen flex p-3 bg-[#11191f]'>
      <div className="sidebar w-[18%] h-full text-white flex flex-col items-center justify-between">
        <div className='flex w-full items-center gap-3 text-2xl'>
            <i className="fa-solid fa-heart-pulse border-1 p-2 rounded-[50%] border-gray-700 flex"></i>
            <h1>ProfitPulse</h1>
        </div>

        <ul className='dashboard-btns w-full flex flex-col gap-4'>
          <NavLink to='/admin'>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2 rounded-l-2xl transition-all duration-150'><i className="fa-solid fa-house"></i><p>Dashboard</p></li>
          </NavLink>

          <NavLink to='/admin/orders'>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2 rounded-l-2xl transition-all duration-150'><i className="fa-brands fa-first-order"></i><p>Orders</p></li>
          </NavLink>

          <NavLink to='/admin/products'>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2 rounded-l-2xl transition-all duration-150'><i className="fa-solid fa-credit-card"></i><p>Products</p></li>
          </NavLink>

          <NavLink to='/admin/customers'>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2 rounded-l-2xl transition-all duration-150'><i className="fa-solid fa-person"></i><p>Customers</p></li>
          </NavLink>

          <NavLink to='/admin/reports'>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2 rounded-l-2xl transition-all duration-150'><i className="fa-solid fa-flag"></i><p>Reports</p></li>
          </NavLink>
        </ul>
        <ul className='w-full flex flex-col gap-4'>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2'><i className="fa-solid fa-bell"></i><p>Notification</p></li>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2'><i className="fa-solid fa-circle-info"></i><p>Help</p></li>
            <li className='flex items-center gap-3 cursor-pointer pl-7 pt-2 pb-2'><i class="fa-solid fa-gear"></i><p>Settings</p></li>
        </ul>

        <div className='flex gap-3 text-[20px] w-full pl-7 cursor-pointer' onClick={logout}>
            <i class="fa-solid fa-right-from-bracket rotate-180"></i>
            Logout
        </div>
      </div>
      <AdminDsiplay/>
    </div>
  )
}

export default Dashboard
