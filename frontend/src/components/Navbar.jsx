import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const bannerHandler = () =>{
    const banner = document.getElementById('discount-banner');
    banner.style.visibility="hidden";
  }
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/get');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };
    fetchCart();
  }, []);
  return (
    <div className='w-full overflow-hidden bg-white'>
      <span className='w-full h-7 overh bg-black text-white text-[13px] justify-end flex items-center' id='discount-banner'>
        <p>Check out <a href='/' className='w-[60%] hover:underline cursor-pointer'>Discount</a> upto 50% and latest deals.</p>
        <div className='w-[40%] flex justify-end pr-10'>
          <p className='text-[18px] cursor-pointer' onClick={bannerHandler}>x</p>
        </div>
      </span>
      <div className='w-full h-23 flex justify-around items-center shadow-2xs sticky bg-white'>
        <Link to='/'>
          <h1 className='font-bold text-4xl cursor-pointer'>SHOP.CO</h1>
        </Link>
        <ul className='flex gap-6 max-md:hidden text-[15px]'>
          <li>Shop</li>
          <li>New Arrivel</li>
          <li>Top Selling</li>
          <li>On Sale</li>
        </ul>
        <span className='flex w-[45%] items-center h-10 rounded-2xl bg-gray-200 max-md:gap-2'>
          <label className='text-[20px] w-[10%] pl-3' htmlFor="search-bar"><i className="fa-solid fa-magnifying-glass"></i></label>
          <input className='w-[90%] h-full outline-0' placeholder='Search for products...' type="text" name='search-bar'/>
        </span>
        <Link to='/product/cart/:id'>
          <label className='text-2xl cursor-pointer' htmlFor="search-bar">
            <p className='bg-black w-8 h-8 flex items-center justify-center text-white pl-2 pr-2 pb-2 pt-2 rounded-[50%]'>{data.length}</p>
            <i className="fa-solid fa-cart-shopping"></i>
          </label>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
