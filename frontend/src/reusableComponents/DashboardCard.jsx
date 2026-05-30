import React from 'react'
import { CustomButton } from './CustomButton'

export const DashboardCard = () => {
  return (
    <section className='w-1/3 rounded-xl shadow border border-gray-200 gap-2 flex flex-col h-60 bg-white p-5'>
      <div className='flex justify-between w-full'>
        <h1 className='text-xl font-medium'>Total Sales</h1>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
        <p className='text-gray-500 pb-2'>Last 7 days</p>

      <div className='w-full flex items-center gap-4'>
        <h1 className='text-3xl font-medium'>$300K</h1> 
        <div>
          Sales <span className='text-green-600'><i className="fa-solid fa-arrow-up"></i> 10.4%</span>
        </div>
      </div>
      <p className='text-sm'>Previous 7days ($235)</p>
      <div className='w-full flex justify-end'>
        <CustomButton 
        type={"card"} 
        title={"Details"} 
        textcolor={"purple-500"} 
        bgcolor={"white"} 
        border={"border"} 
        borderColor={"purple-500"}
        width={6}
        height={1}
      />
      </div>
    </section>
  )
}
