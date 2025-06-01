import React from 'react'

const Navbar = () => {
  const bannerHandler = () =>{
    const banner = document.getElementById('discount-banner');
    banner.style.visibility="hidden";
  }
  return (
    <div className='w-full overflow-hidden z-1 absolute'>
      <span className='w-full h-7 overh bg-black absolute text-white text-[13px] justify-end flex items-center' id='discount-banner'>
        <p>Check out <a href='/' className='w-[60%] hover:underline cursor-pointer'>Discount</a> upto 50% and latest deals.</p>
        <div className='w-[40%] flex justify-end pr-10'>
          <p className='text-[18px] cursor-pointer' onClick={bannerHandler}>x</p>
        </div>
      </span>
      <div className='w-full h-23 flex justify-around items-center shadow-2xs fixed bg-white'>
        <h1 className='font-bold text-4xl'>SHOP.CO</h1>
        <ul className='flex gap-6 text-[15px]'>
          <li>Shop</li>
          <li>New Arrivel</li>
          <li>Top Selling</li>
          <li>On Sale</li>
        </ul>
        <span className='flex w-[35%] items-center h-10 rounded-2xl bg-gray-200'>
          <label className='text-[20px] w-[10%] pl-3' htmlFor="search-bar"><i className="fa-solid fa-magnifying-glass"></i></label>
          <input className='w-[90%] h-full outline-0' placeholder='Search for products...' type="text" name='search-bar'/>
        </span>
        <label className='text-2xl' htmlFor="search-bar"><i className="fa-solid fa-cart-shopping"></i></label>
      </div>
    </div>
  )
}

export default Navbar
