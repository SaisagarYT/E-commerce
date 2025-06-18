import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import DeliveryAddress from '../components/DeliveryAdddress.jsx'
import PaymentOptions from '../components/PaymentOptions';
import OrderSummary from '../components/OrderSummary';

const Booking = () => {

  const [box, setBox] = useState(null);
  const tabs = [
    {id:1,title:"DELIVERY ADDRESS",content:<DeliveryAddress next={() => setBox(2)}/>},
    {id:2,title:"ORDER SUMMERY",content:<OrderSummary next={() => setBox(3)} prev={()=> setBox(1)}/>},
    {id:3,title:"PAYMENT OPTIONS",content:<PaymentOptions prev={() => setBox(2)}/>}
  ];

  return (
    <section className='w-screen h-screen overflow-scroll'>
      <nav className='w-full h-20 shadow flex justify-between items-center pl-10 pr-10'>
        <Link to='/'>
          <h1 className='text-3xl font-bold'>SHOP.CO</h1>
        </Link>
        <p className='font-medium'>Account</p>
      </nav>
      <div className='w-full min-h-screen flex justify-center mt-4 gap-4'>
        <div className='w-[50%] rounded-[4px] overflow-hidden flex flex-col gap-4'>
          {
            tabs.map((tab) =>{
              return <>
                <div className='w-full h-12 bg-black font-bold flex justify-between items-center text-white pl-3 pr-5'>
                  < div className='flex gap-3'>
                    <p className='w-6 text-center rounded-[2px] text-black h-6 bg-white'>{tab.id}</p>
                    <p>{tab.title}</p>
                  </div>
                  <button className='text-white font-medium cursor-pointer' id='show' onClick={() => setBox(tab.id)}>SHOW</button>
                </div>
                {
                  tab.id == box && tab.content
                }
              </>
            })
          }
        </div>
        <div className='w-[25%] h-80 shadow-2xl border border-gray-400 rounded-[4px]'>
          <h1 className='p-2 font-bold text-gray-600'>PRICE DETAILS</h1>
          <hr />
          <div>
            <p>Price (2 items)</p>
            <p>price</p>
          </div>
          <p>Discount 5%</p>
          <hr />
          <div>
            <h1>Total Payable</h1>
            <p>2,056</p>
          </div>
          <p>Your total savings on the order 2000</p>
        </div>
      </div>
    </section>
  )
}

export default Booking
