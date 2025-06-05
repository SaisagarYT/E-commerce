import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'

const OrderPage = () => {

  const {id} = useParams();
  const [data,setData] = useState(null);

  useEffect( () => {
    const finalData = async() =>{
      const response = await Axios.get(`http://localhost:5000/api/products/${id}`);
      setData(response.data);
    }
    finalData();
  },[id]);

  const insertIntoCart = async() =>{
    const response = await Axios.post('http://localhost:5000/api/cart/add',data);
    console.log(response.data);
  }

  if(!data){
    return <div>Loading...</div>
  }
  return (
    <div className='w-screen'>
      <Navbar/>
      <div className='w-full h-13'>
        <p></p>
      </div>
      <section className='w-full flex max-md:flex-col max-md:items-center max-md:pl-10 max-md:pr-10 max-md:w-full max-md:gap-5 pl-20 pr-20 gap-10'>
        <div className='w-[60%] max-md:w-[100%] h-170 max-md:h-full flex justify-center items-start'>
          <div className='w-[100%] h-[80%] bg-[#f2f2f2] rounded-2xl overflow-hidden'>
            <img className='w-full h-[95%] object-cover' src={data.image} alt="image" />
          </div>
        </div>

        <div className='w-[40%] max-md:w-full'>
          <div>
            <h1 className='text-5xl font-bold'>{data.name}</h1>
            <div className='flex gap-2 items-center mb-5'>
              <i className="fa-solid fa-star text-[12px]"></i>
              <p className='text-[14px]'>{data.rating}</p>
            </div>
            <p className='text-2xl font-bold'>{data.price}$</p>
          </div>
          <div className='relative pb-10 pt-5'>
            <hr />
            <p className='absolute top-2 bg-white right-10'>Select Color</p>
          </div>
          <div className='list-none flex gap-4'>
            <li className='w-8 h-8 rounded-[50%] bg-red-500'></li>
            <li className='w-8 h-8 rounded-[50%] bg-blue-400'></li>
            <li className='w-8 h-8 rounded-[50%] bg-orange-400'></li>
            <li className='w-8 h-8 rounded-[50%] bg-green-500'></li>
            <li></li>
          </div>
          <div className='relative pb-10 pt-5'>
            <hr />
            <p className='absolute top-2 bg-white right-10'>Choose Size</p>
          </div>
          <div className='flex gap-4 mb-8'>
            <button className='pl-5 pr-5 pt-2 pb-2 rounded-2xl bg-gray-100 cursor-pointer'>Small</button>
            <button className='pl-5 pr-5 pt-2 pb-2 rounded-2xl bg-gray-100 cursor-pointer'>Medium</button>
            <button className='pl-5 pr-5 pt-2 pb-2 rounded-2xl bg-gray-100 cursor-pointer'>Large</button>
            <button className='pl-5 pr-5 pt-2 pb-2 rounded-2xl bg-gray-100 cursor-pointer'>X-Large</button>
          </div>
          <hr />
          <div className='flex items-center mt-8 gap-4'>
            <Link to={`/product/cart/${id}`} className='w-full'>
              <button onClick={insertIntoCart} className='bg-black mb-10 text-white text-2xl w-full h-13 rounded-3xl'>Add to Cart</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderPage
