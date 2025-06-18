import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const OrderDisplay = () => {
  const [orders,setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() =>{
    const fetchOrders = async() => {
      try{
        const response = await Axios.get(`http://localhost:5000/api/orders/myorders`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setOrders(response.data);
      }
      catch(err){
        console.log("error:",err.message);
      }
    }
    fetchOrders();
  },[])
  return (
    <div className='w-full mt-5'>
      <table className='w-full text-center'>
        <thead>
            <tr className='border-b border-gray-500'>
                <th className='px-4 py-4'>OrderId</th>
                <th className='px-4 py-4'>Customer</th>
                <th className='px-4 py-4'>Items</th>
                <th className='px-4 py-4'>Status</th>
                <th className='px-4 py-4'>Country</th>
                <th className='px-4 py-4'>Total</th>
                <th className='px-4 py-4'>Date</th>
            </tr>
        </thead>
        <tbody>
  {orders.length === 0 ? (
    <tr>
      <td colSpan="6" className="py-4 text-gray-500">No orders found</td>
    </tr>
  ) : (
    orders.map((order) => (
      <tr key={order._id} className="border-b border-gray-300">
        <td className="px-4 py-2">{order._id.slice(0, 8)}...</td>
        <td className="px-4 py-2">{order.user?.name || "Unknown"}</td>
        <td className="px-4 py-2">{order.orderItems.map((item) => item.name) || "Unknown"}</td>
        <td className="px-4 py-2">
          {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}
        </td>
        <td className="px-4 py-2">{order.shippingAddress.country}</td>
        <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
        <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
        <td className="text-2xl font-bold">...</td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  )
}

export default OrderDisplay
