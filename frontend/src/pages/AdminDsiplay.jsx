import React from 'react'
import OrderDisplay from '../components/OrderDisplay'
import HomeDisplay from '../components/HomeDisplay'
import {Routes,Route} from 'react-router-dom';
import UserDisplay from '../components/UserDisplay';
import ProductDisplay from '../components/ProductDisplay';


const AdminDsiplay = () => {
  return (
    <div className='w-full h-full bg-[#faf3ec] rounded-2xl p-4'>
      <div className='w-full flex justify-between'>
        <h1 className='text-2xl'>Orders</h1>
        <div className='flex gap-3'>
            <i class="fa-regular fa-envelope p-2 border border-gray-400 rounded-[5px]"></i>
            <i class="fa-solid fa-magnifying-glass p-2 border-gray-400 border rounded-[5px]"></i>
            <div className='flex gap-2'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" alt="" className='w-8' />
                <div className='text-[12px]'>
                    <h3 className='font-bold'>SagarSailada</h3>
                    <p>Sagar@gmail.com</p>
                </div>
            </div>
        </div>
      </div>
    <Routes>
      <Route path='/' element={<HomeDisplay/>}/>
      <Route path='/orders' element={<OrderDisplay/>}/>
      <Route path='/customers' element={<UserDisplay/>}/>
      <Route path='products' element={<ProductDisplay/>}/>
    </Routes>
    </div>
  )
}

export default AdminDsiplay
