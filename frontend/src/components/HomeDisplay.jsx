import React from 'react'

const HomeDisplay = () => {
  return (
    <section className='w-full mt-5'>
      <ul className='flex w-full justify-between'>
        <li className='w-60 h-40 overflow-hidden flex justify-center flex-col bg-black rounded-2xl items-center'>
          <h1 className='text-white text-3xl font-medium pb-2'>USERS</h1>
          <p className='text-white text-2xl'>20</p>
        </li>
        <li className='w-60 h-40 overflow-hidden flex justify-center flex-col bg-black rounded-2xl items-center'>
          <h1 className='text-white text-3xl font-medium pb-2'>PRODUCTS</h1>
          <p className='text-white text-2xl'>8</p>
        </li>
        <li className='w-60 h-40 overflow-hidden flex justify-center flex-col bg-black rounded-2xl items-center'>
          <h1 className='text-white text-3xl font-medium pb-2'>ORDERS</h1>
          <p className='text-white text-2xl'>38</p>
        </li>
        <li className='w-60 h-40 overflow-hidden flex justify-center flex-col bg-black rounded-2xl items-center'>
          <h1 className='text-white text-3xl font-medium pb-2'>PROFIT</h1>
          <p className='text-white text-2xl'>70%</p>
        </li>
      </ul>
      <div className='w-full h-100 mt-6 bg-red-100'>

      </div>
    </section>
  )
}

export default HomeDisplay
