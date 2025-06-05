import React from 'react'
import UserReviews from '../components/userReviews'

const Footer = () => {
   {
    return (
      <div className='w-full max-md:h-[400vh] flex flex-col justify-between'>
        <h1 className='font-extrabold text-5xl pl-20 max-md:pl-10'>OUR HAPPY CUSOTMERS</h1>
        <div className='h-80 cursor-pointer flex justify-center items-center max-md:flex-col' >
          <UserReviews rating="4" name="saisagar" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus alias ad tempore repellat similique, delectus odit. Provident sunt dicta pariatur, cum, nemo tempora perferendis delectus sint sapiente temporibus ratione velit!"/>
          <UserReviews rating="4" name="saisagar" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus alias ad tempore repellat similique, delectus odit. Provident sunt dicta pariatur, cum, nemo tempora perferendis delectus sint sapiente temporibus ratione velit!"/>
          <UserReviews rating="4" name="saisagar" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus alias ad tempore repellat similique, delectus odit. Provident sunt dicta pariatur, cum, nemo tempora perferendis delectus sint sapiente temporibus ratione velit!"/>
          <UserReviews rating="4" name="saisagar" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus alias ad tempore repellat similique, delectus odit. Provident sunt dicta pariatur, cum, nemo tempora perferendis delectus sint sapiente temporibus ratione velit!"/>
        </div>

        <section className='pl-20 pr-20 max-md:pl-10 max-md:pr-10' 
     data-aos-easing="linear"
     data-aos-duration="1000">
          <div className='w-full h-45 max-md:flex-col max-md:h-max max-md:pt-5 max-md:pb-5 gap-5  bg-black rounded-2xl flex items-center pl-10 pr-10' data-aos="fade-down">
            <h1 className='text-white text-5xl font-extrabold w-[60%] max-md:text-4xl max-md:w-full'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
            <div className='flex flex-col w-[40%] max-md:w-full'>
              <div className='bg-white w-[100%] h-10 flex items-center rounded-2xl'>
                <i className="fa-regular fa-envelope pl-3"></i>
                <input type="text" className='outline-0 indent-2' placeholder='Enter your email address'/>
              </div>
              <button className='h-10 mt-5 rounded-2xl bg-white font-normal'>Subscribe to Newsletters</button>
            </div>
          </div>
        </section>

        <section className='list-none grid grid-cols-5 mt-10 p-4 ml-20 max-md:grid-cols-2'>
          <div className='box-1 flex flex-col justify-between'>
            <li className='font-extrabold text-4xl' style={{fontSize:"35px"}}>SHOP.CO</li>
            <li className='text-[15px] w-60'>We have clothes that suits your style and which you’re proud to wear. From women to men.</li>
            <div className='flex gap-4 text-2xl'>
              <i class="fa-brands fa-x-twitter"></i>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-github"></i>
            </div>
          </div>
          <div className=''>
            <li>Company</li>
            <li>About</li>
            <li>Features of SHOP.CO</li>
            <li>Works</li>
            <li>Career</li>
          </div>
          <div>
            <li>Help</li>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </div>
          <div>
            <li>FAQ</li>
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </div>
          <div>
            <li>Resources</li>
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </div>
        </section>

        <hr />
      <div className='w-full h-8 flex justify-between pl-10 pr-10 items-center'>
        <p className='text-[14px]'>Shop.co © 2000-2024, All Rights Reserved</p>
        <div className='flex gap-3'>
          <p>a</p>
          <p>b</p>
          <p>c</p>
          <p>d</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Footer
