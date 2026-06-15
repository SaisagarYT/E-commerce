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
const token = localStorage.getItem('token');

    const response = await axios.get(
      'http://localhost:5000/api/cart/get',
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setData(response.data);

  } catch (error) {
    console.error("Failed to fetch cart data", error);
  }
};

fetchCart();

}, []);

return ( <div className='w-full overflow-hidden border-b border-gray-200 bg-white'>

  {/* Top Banner */}
  <span
    className='w-full h-8 bg-[#0A2138] text-white text-[13px] flex items-center justify-end'
    id='discount-banner'
  >
    <p>
      Check out{" "}
      <a
        href='/'
        className='font-semibold text-[#41EA41] hover:text-[#E56627] transition-all duration-300'
      >
        Discounts
      </a>{" "}
      up to 50% and latest deals.
    </p>

    <div className='w-[40%] flex justify-end pr-10'>
      <p
        className='text-[18px] cursor-pointer hover:text-[#E56627] transition-all duration-300'
        onClick={bannerHandler}
      >
        ×
      </p>
    </div>
  </span>

  {/* Main Navbar */}
  <div className='w-full h-24 flex justify-around items-center bg-white'>

    {/* Logo */}
    <Link to='/'>
      <h1 className='font-black text-4xl cursor-pointer text-[#0A2138]'>
        FAST<span className='text-[#E56627]'>RAIL</span>
      </h1>
    </Link>

    {/* Nav Links */}
    <ul className='flex gap-6 max-md:hidden text-[15px] font-medium'>
      <Link to='/shop'>
        <li className='cursor-pointer text-[#0A2138] hover:text-[#E56627] transition-all duration-300'>
          Shop
        </li>
      </Link>

      <Link to='/newarrivel'>
        <li className='cursor-pointer text-[#0A2138] hover:text-[#E56627] transition-all duration-300'>
          New Arrival
        </li>
      </Link>

      <Link to='/topselling'>
        <li className='cursor-pointer text-[#0A2138] hover:text-[#E56627] transition-all duration-300'>
          Top Selling
        </li>
      </Link>

      <Link to='/onsale'>
        <li className='cursor-pointer text-[#0A2138] hover:text-[#E56627] transition-all duration-300'>
          On Sale
        </li>
      </Link>
    </ul>

    {/* Search */}
    <span className='flex w-[45%] items-center h-11 rounded-full bg-gray-100 border border-gray-200 max-md:gap-2'>

      <label
        className='text-[18px] w-[10%] pl-4 text-[#E56627]'
        htmlFor="search-bar"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>

      <input
        className='w-[90%] h-full outline-none bg-transparent text-[#0A2138]'
        placeholder='Search for products...'
        type="text"
        name='search-bar'
      />
    </span>

    {/* Profile */}
    <Link to='/profile'>
      <i className="fa-solid fa-circle-user text-[24px] cursor-pointer text-[#0A2138] hover:text-[#E56627] transition-all duration-300"></i>
    </Link>

    {/* Cart */}
    <Link to='/product/cart/:id'>
      <label
        className='text-[22px] cursor-pointer relative text-[#0A2138] hover:text-[#E56627] transition-all duration-300'
        htmlFor="search-bar"
      >

        <p className='bg-[#E56627] min-w-[20px] h-[20px] flex items-center justify-center absolute top-[-10px] left-3 text-[11px] text-white rounded-full px-1 font-semibold'>
          {data.length}
        </p>

        <i className="fa-solid fa-cart-shopping"></i>

      </label>
    </Link>

  </div>
</div>

)
}

export default Navbar;
