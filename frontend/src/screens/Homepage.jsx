import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import AOS from 'aos'
import '../../node_modules/aos/dist/aos.css';

const Homepage = () => {

  useEffect(() =>{
    AOS.init({
      duration:1500,
      once:true
    })
  },[])
  return (
    <section className='w-screen h-screen flex items-center flex-col'>
      <div className='w-full h-full flex overflow-hidden mt-30'>
        <div className='w-[50%] flex justify-center flex-col items-center h-full gap-10 pl-20 pr-20'>
          <div className='w-[100%] flex flex-col items-start gap-8'>
            <h1 className='text-6xl w-[90%] font-extrabold' data-aos="fade-right">FIND CLOTHES THAT MATCHES YOUR STYE</h1>

            <p data-aos="zoom-out-right" className='font-light w-[100%]'>Browse through our diverse rage of meticulously crafted garments designed to bring out your individuality and cater to your sense of style.</p>

            <button data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className='pl-12 pr-12 pt-3 pb-3 bg-black text-white rounded-3xl font-bold'>Shop Now</button>
          </div>

          <section className='flex w-[100%] justify-center gap-10'>
              <span className='text-4xl' data-aos="fade-down">
                  <h1>200+</h1>
                  <p className='text-[15px] font-thin'>International Brands</p>
              </span>
              <span className='text-4xl' data-aos="fade-down">
                  <h1>2000+</h1>
                  <p className='text-[15px] font-thin'>High-Quality Products</p>
              </span>
              <span className='text-4xl' data-aos="fade-down">
                  <h1>30,000+</h1>
                  <p className='text-[15px] font-thin'>Happy Customer</p>
              </span>
          </section>
        </div>

        <div className='w-[50%] flex justify-center h-full overflow-hidden'>
          <img data-aos="fade-up-left" src="https://chop-co.netlify.app/assets/Main-DjG-FNVr.svg" alt="image" />
        </div>
      </div> 
    </section>
  )
}

export default Homepage
