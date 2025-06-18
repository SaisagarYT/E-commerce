import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderSummary = ({prev,next}) => {
  const [data,setData] = useState([]);
  const token = localStorage.getItem('token');
  console.log(token)
  useEffect(() =>{
    const fetchCart = async() =>{
      const response = await axios.get('http://localhost:5000/api/cart/get',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setData(response.data);
    }
    fetchCart() 
  },[])
  const total = data.reduce((acc,item) => acc + (item.price * item.quantity),0)
  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
      {data.map(item => (
        <div key={item._id} className='flex items-center justify-between border-b py-2'>
          <img src={item.image} alt={item.name} className='w-12 h-12 object-cover' />
          <p>{item.name} x {item.quantity}</p>
          <p>₹{item.quantity * item.price}</p>
        </div>
      ))}
      <div className='mt-4'>
        <p className='font-semibold'>Total: ₹{total}</p>
      </div>
      <div className='flex gap-2 mt-6'>
        <button className='border px-4 py-2 cursor-pointer' onClick={prev}>Back</button>
        <button className='bg-black text-white px-4 py-2 cursor-pointer' onClick={next}>Proceed to Payment</button>
      </div>
    </div>
  )
}

export default OrderSummary
