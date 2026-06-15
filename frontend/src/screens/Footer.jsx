import React from 'react'
import UserReviews from '../components/userReviews'

const Footer = () => {
return ( <div className='w-full flex flex-col bg-white overflow-hidden'>

  {/* Reviews Section */}
  <section className='py-20'>

    <div className='flex justify-center mb-14'>
      <h1 className='text-5xl font-black text-[#0A2138] text-center'>
        OUR HAPPY
        <span className='text-[#E56627]'> CUSTOMERS</span>
      </h1>
    </div>

    <div className='flex justify-center items-center flex-wrap gap-6 px-8'>

      <UserReviews
        rating="4"
        name="Sai Sagar"
        description="Amazing quality and fast delivery. The shopping experience was smooth and professional."
      />

      <UserReviews
        rating="5"
        name="Rahul Kumar"
        description="One of the best online stores. Product quality exceeded expectations."
      />

      <UserReviews
        rating="4"
        name="Priya Sharma"
        description="Loved the design and packaging. Will definitely purchase again."
      />

      <UserReviews
        rating="5"
        name="Arjun Reddy"
        description="Excellent support and premium quality products."
      />

    </div>

  </section>

  {/* Newsletter Section */}
  <section
    className='px-20 max-md:px-6 relative z-10'
    data-aos="fade-up"
  >

    <div className='w-full bg-gradient-to-r from-[#0A2138] via-[#123253] to-[#0A2138] rounded-3xl p-10 flex max-md:flex-col items-center gap-10 shadow-2xl'>

      <div className='w-[60%] max-md:w-full'>

        <h1 className='text-white text-5xl max-md:text-4xl font-black leading-tight'>
          STAY UPDATED WITH
          <span className='text-[#41EA41]'>
            {" "}LATEST OFFERS
          </span>
        </h1>

        <p className='text-gray-300 mt-4 text-lg'>
          Get exclusive discounts, new arrivals and member-only deals directly in your inbox.
        </p>

      </div>

      <div className='w-[40%] max-md:w-full'>

        <div className='bg-white rounded-full flex items-center h-14 overflow-hidden shadow-lg'>

          <i className="fa-regular fa-envelope px-5 text-[#E56627] text-xl"></i>

          <input
            type="email"
            placeholder='Enter your email address'
            className='w-full outline-none text-[#0A2138]'
          />

        </div>

        <button
          className='
          w-full
          h-14
          mt-4
          rounded-full
          bg-[#E56627]
          text-white
          font-bold
          hover:bg-[#cf5a21]
          hover:scale-[1.02]
          transition-all
          duration-300
          shadow-lg
          '
        >
          Subscribe Now
        </button>

      </div>

    </div>

  </section>

  {/* Main Footer */}
  <footer className='bg-[#0A2138] mt-[-60px] pt-28 pb-10 px-20 max-md:px-8'>

    <div className='grid grid-cols-5 max-lg:grid-cols-2 max-md:grid-cols-1 gap-12 text-white'>

      {/* Brand */}
      <div>

        <h1 className='font-black text-4xl'>
          FAST
          <span className='text-[#E56627]'>
            RAIL
          </span>
        </h1>

        <p className='mt-5 text-gray-300 leading-7'>
          Discover premium fashion, trending styles and quality products designed for modern lifestyles.
        </p>

        <div className='flex gap-4 mt-6 text-2xl'>

          <i className="fa-brands fa-x-twitter cursor-pointer hover:text-[#41EA41] transition-all duration-300"></i>

          <i className="fa-brands fa-facebook cursor-pointer hover:text-[#41EA41] transition-all duration-300"></i>

          <i className="fa-brands fa-instagram cursor-pointer hover:text-[#41EA41] transition-all duration-300"></i>

          <i className="fa-brands fa-github cursor-pointer hover:text-[#41EA41] transition-all duration-300"></i>

        </div>

      </div>

      {/* Company */}
      <div>

        <h2 className='text-[#E56627] font-bold text-lg mb-4'>
          Company
        </h2>

        <ul className='space-y-3 text-gray-300'>
          <li className='hover:text-[#41EA41] cursor-pointer'>About Us</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Features</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Our Work</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Careers</li>
        </ul>

      </div>

      {/* Help */}
      <div>

        <h2 className='text-[#E56627] font-bold text-lg mb-4'>
          Help
        </h2>

        <ul className='space-y-3 text-gray-300'>
          <li className='hover:text-[#41EA41] cursor-pointer'>Customer Support</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Delivery Details</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Terms & Conditions</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Privacy Policy</li>
        </ul>

      </div>

      {/* Account */}
      <div>

        <h2 className='text-[#E56627] font-bold text-lg mb-4'>
          Account
        </h2>

        <ul className='space-y-3 text-gray-300'>
          <li className='hover:text-[#41EA41] cursor-pointer'>My Account</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Orders</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Wishlist</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Payments</li>
        </ul>

      </div>

      {/* Resources */}
      <div>

        <h2 className='text-[#E56627] font-bold text-lg mb-4'>
          Resources
        </h2>

        <ul className='space-y-3 text-gray-300'>
          <li className='hover:text-[#41EA41] cursor-pointer'>Blog</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Style Guides</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>eBooks</li>
          <li className='hover:text-[#41EA41] cursor-pointer'>Tutorials</li>
        </ul>

      </div>

    </div>

    <div className='border-t border-gray-700 mt-12 pt-6 flex max-md:flex-col justify-between items-center'>

      <p className='text-gray-400'>
        © 2026 FASTRAIL. All Rights Reserved.
      </p>

      <div className='flex gap-4 mt-4 max-md:mt-6'>

        <div className='bg-white rounded-lg px-4 py-2 text-[#0A2138] font-semibold'>
          VISA
        </div>

        <div className='bg-white rounded-lg px-4 py-2 text-[#0A2138] font-semibold'>
          MasterCard
        </div>

        <div className='bg-white rounded-lg px-4 py-2 text-[#0A2138] font-semibold'>
          UPI
        </div>

      </div>

    </div>

  </footer>

</div>

)
}

export default Footer
