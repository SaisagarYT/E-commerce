import React from 'react'
import { DashboardCard } from '../reusableComponents/DashboardCard'
import { CustomButton } from '../reusableComponents/CustomButton'

const HomeDisplay = () => {
  const tableData = [];
  return (
    <section className='w-full flex flex-col gap-4 mt-5'>
      <div className='flex gap-4'>
        <DashboardCard/>
        <DashboardCard/>
        <DashboardCard/>
      </div>
      
      <div className='w-full gap-4 h-120 flex'>
        <div className='flex-3/9 h-full bg-white shadow border border-gray-200 rounded-xl'>

        </div>
        <div className='flex flex-1 h-full bg-white shadow border border-gray-200 rounded-xl'>

        </div>
      </div>

      <div className='w-full gap-4 h-120 flex'>
        <div className='flex-3/9 flex flex-col gap-4 h-full p-6 bg-white shadow border border-gray-200 rounded-xl'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-2xl font-medium'>Transaction</h1>
            <CustomButton
             type={"filter"} 
             title={"Filter"} 
             textcolor={"white"} 
             bgcolor={"orange-500"} 
             border={"border"} 
             borderColor={"orange-500"}
             width={"4"}
             height={"2"}
             icon={<i class="fa-solid fa-arrow-down-wide-short"></i>}
            />
          </div>
          <div className='w-full h-full gap-4 items-end flex flex-col'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-500'>
                    <th className='px-4 py-4'>OrderId</th>
                    <th className='px-4 py-4'>Customer</th>
                    <th className='px-4 py-4'>Items</th>
                    <th className='px-4 py-4'>Status</th>
                    <th className='px-4 py-4'>Country</th>
                    <th className='px-4 py-4'>Total</th>
                    <th className='px-4 py-4'>Date</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>

            </table>
            {
              tableData.length === 0 && <div className='w-full bg-gray-200 flex items-center justify-center h-full'>No Data</div> 
            }
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
        </div>
        <div className='flex flex-1 h-full bg-white shadow border border-gray-200 rounded-xl'>
            
        </div>
      </div>

      <div className='w-full gap-4 h-120 flex'>
        <div className='flex-3/9 flex flex-col gap-4 h-full p-6 bg-white shadow border border-gray-200 rounded-xl'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-2xl font-medium'>Transaction</h1>
            <CustomButton
             type={"filter"} 
             title={"Filter"} 
             textcolor={"white"} 
             bgcolor={"orange-500"} 
             border={"border"} 
             borderColor={"orange-500"}
             width={"4"}
             height={"2"}
             icon={<i class="fa-solid fa-arrow-down-wide-short"></i>}
            />
          </div>
          <div className='w-full h-full gap-4 items-end flex flex-col'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-500'>
                    <th className='px-4 py-4'>OrderId</th>
                    <th className='px-4 py-4'>Customer</th>
                    <th className='px-4 py-4'>Items</th>
                    <th className='px-4 py-4'>Status</th>
                    <th className='px-4 py-4'>Country</th>
                    <th className='px-4 py-4'>Total</th>
                    <th className='px-4 py-4'>Date</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>

            </table>
            {
              tableData.length === 0 && <div className='w-full bg-gray-200 flex items-center justify-center h-full'>No Data</div> 
            }
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
        </div>
        <div className='flex flex-1 h-full bg-white shadow border border-gray-200 rounded-xl'>
            
        </div>
      </div>
    </section>
  )
}

export default HomeDisplay