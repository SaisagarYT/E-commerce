import React from 'react'
import gsap from 'gsap';


const PaymentOptions = ({prev}) => {
  const t1 = gsap.timeline();
  const submitEffect = async() =>{
    t1.to("#popup",{
      width:"2000px",
      height:"2000px",
      left:"50%",
      top:"50%",
      x:"-50%",
      y:"-50%",
      borderRadius:0,
      backgroundColor:"black",
      duration:0.2,
    }),
    t1.to("#gif",{
      opacity:1,
      y:20,
      duration:0.5,
    })
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }
  return (
     <div className='p-6 overflow-hidden'>
      <div className='w-0 h-0 bg-transparent absolute top-[50%] left-[50%] flex flex-col justify-center items-center translate-x-[-50%] translate-y-[50%] rounded-full overflow-hidden' id='popup'>
        <h1 className='text-3xl text-white font-medium opacity-0' id='gif'>YOUR ORDER PLACED SUCCESSFULLY</h1>
      </div>
      <h2 className='text-xl font-bold mb-4'>Payment Options</h2>
      <div className='flex flex-col gap-4'>
        <label>
          <input type="radio" name="payment" value="paypal" /> PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="cod" /> Cash on Delivery
        </label>
      </div>
      <div className='mt-6'>
        <button className='border px-4 py-2 mr-2 cursor-pointer' onClick={prev}>Back</button>
        <button className='bg-black text-white px-4 py-2 cursor-pointer' onClick={submitEffect}>Place Order</button>
      </div>
    </div>
  )
}

export default PaymentOptions
