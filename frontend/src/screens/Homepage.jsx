import React, { useEffect } from 'react'
import AOS from 'aos'
import '../../node_modules/aos/dist/aos.css';

const Homepage = () => {

useEffect(() =>{
AOS.init({
duration:1500,
once:true
})
},[])

return ( <section className='w-screen min-h-screen flex items-center flex-col bg-gradient-to-br from-white via-[#FFF6F1] to-white overflow-hidden'>

  <div className='w-full pt-16 flex max-md:flex-col-reverse'>

    {/* Left Content */}
    <div className='w-[50%] max-md:w-full flex justify-center flex-col gap-10 px-20 max-md:px-8'>

      <div className='flex flex-col items-start gap-8'>

        <span
          data-aos="fade-right"
          className='bg-[#41EA41]/20 text-[#0A2138] px-4 py-2 rounded-full font-semibold text-sm'
        >
          New Collection 2026
        </span>

        <h1
          className='text-7xl max-md:text-5xl w-full font-black leading-tight text-[#0A2138]'
          data-aos="fade-right"
        >
          FIND CLOTHES
          <span className='text-[#E56627]'> THAT MATCH</span>
          <br />
          YOUR STYLE
        </h1>

        <p
          data-aos="fade-right"
          className='text-gray-600 text-lg leading-8 max-w-[650px]'
        >
          Browse through our diverse range of meticulously crafted garments
          designed to bring out your individuality and elevate your style.
          Discover fashion that fits your personality.
        </p>

        {/* CTA Buttons */}
        <div
          data-aos="fade-up"
          className='flex gap-4 flex-wrap'
        >
          <button
            className='
            px-10 py-4
            bg-[#E56627]
            text-white
            rounded-full
            font-bold
            shadow-lg
            hover:scale-105
            hover:bg-[#cf5a21]
            transition-all
            duration-300
            '
          >
            Shop Now
          </button>

          <button
            className='
            px-10 py-4
            border-2
            border-[#0A2138]
            text-[#0A2138]
            rounded-full
            font-bold
            hover:bg-[#0A2138]
            hover:text-white
            transition-all
            duration-300
            '
          >
            Explore Collection
          </button>
        </div>

      </div>

      {/* Statistics */}
      <section className='flex flex-wrap gap-6'>

        <div
          data-aos="fade-up"
          className='bg-white shadow-lg rounded-2xl p-5 hover:scale-105 transition-all duration-300'
        >
          <h1 className='text-4xl font-black text-[#E56627]'>200+</h1>
          <p className='text-gray-500'>International Brands</p>
        </div>

        <div
          data-aos="fade-up"
          className='bg-white shadow-lg rounded-2xl p-5 hover:scale-105 transition-all duration-300'
        >
          <h1 className='text-4xl font-black text-[#E56627]'>2000+</h1>
          <p className='text-gray-500'>High-Quality Products</p>
        </div>

        <div
          data-aos="fade-up"
          className='bg-white shadow-lg rounded-2xl p-5 hover:scale-105 transition-all duration-300'
        >
          <h1 className='text-4xl font-black text-[#E56627]'>30,000+</h1>
          <p className='text-gray-500'>Happy Customers</p>
        </div>

      </section>

    </div>

    {/* Right Side Image */}
    <div className='w-[50%] max-md:w-full flex justify-center items-center relative overflow-hidden'>

      {/* Decorative Circle */}
      <div className='absolute w-[500px] h-[500px] rounded-full bg-[#E56627]/10 blur-3xl'></div>

      <img
        data-aos="fade-up-left"
        src="https://chop-co.netlify.app/assets/Main-DjG-FNVr.svg"
        alt="Fashion Hero"
        className='
        relative
        z-0
        w-[90%]
        hover:scale-105
        transition-all
        duration-300
        drop-shadow-2xl
        '
      />

      {/* Floating Badge */}
      <div
        data-aos="zoom-in"
        className='
        absolute
        top-20
        right-20
        bg-white
        shadow-xl
        rounded-2xl
        px-5
        py-3
        font-bold
        text-[#0A2138]
        '
      >
        🔥 50% OFF
      </div>

      <div
        data-aos="zoom-in"
        className='
        absolute
        bottom-20
        left-10
        bg-white
        shadow-xl
        rounded-2xl
        px-5
        py-3
        '
      >
        <p className='font-bold text-[#41EA41]'>
          ✓ Premium Quality
        </p>
      </div>

    </div>

  </div>

</section>

)
}

export default Homepage
