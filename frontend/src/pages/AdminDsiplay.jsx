import React, { useEffect, useState } from 'react'
import OrderDisplay from '../components/OrderDisplay'
import HomeDisplay from '../components/HomeDisplay'
import {Routes,Route} from 'react-router-dom';
import UserDisplay from '../components/UserDisplay';
import ProductDisplay from '../components/ProductDisplay';
import SettingsDisplay from '../components/SettingsDisplay';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BACKEND_BASE_URL from '../../api/api';


const AdminDsiplay = () => {
  const params = useParams();
  const [data,setData] = useState({})
  const token = localStorage.getItem("token");
  console.log(token)
  useEffect(() =>{
    const userFetch = async() => {
      const response = await axios.get(`${BACKEND_BASE_URL}/api/users/profile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setData(response.data);
    }
    userFetch();
  },[token])
  return (
    <div className='w-full overflow-scroll h-full flex flex-col bg-gray-100 rounded-2xl p-4'> {/*bg-[#faf3ec] */}
      <div className='w-full flex flex-wrap justify-between'>
        <h1 className='text-2xl font-medium'>{`${params["*"].charAt(0).toUpperCase()+params["*"].slice(1)}`}</h1>
        <div className='flex gap-3'>
            <i className="fa-regular fa-envelope p-2 border border-gray-400 rounded-[5px]"></i>
            <i className="fa-solid fa-magnifying-glass p-2 border-gray-400 border rounded-[5px]"></i>
            <div className='flex gap-2'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s" alt="" className='w-8' />
                <div className='text-[12px]'>
                    <h3 className='font-bold'>{data.name}</h3>
                    <p>{data.email}</p>
                </div>
            </div>
        </div>
      </div>
    <Routes>
      <Route path='dashboard' element={<HomeDisplay/>}/>
      <Route path='orders' element={<OrderDisplay/>}/>
      <Route path='customers' element={<UserDisplay/>}/>
      <Route path='products' element={<ProductDisplay/>}/>
      <Route path='settings' element={<SettingsDisplay/>}/>
    </Routes>
    </div>
  )
}

export default AdminDsiplay
