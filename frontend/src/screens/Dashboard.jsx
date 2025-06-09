import React from 'react'


const Dashboard = () => {
    // const users = async() =>{

    // }
  return (
    <div className='w-screen flex h-screen'>
      <div className='w-[20%] h-full items-center flex flex-col bg-blue-200'>
        <h1 className='text-3xl font-extrabold italic font-mono pt-4 pb-4'>SaiSagar</h1>
        <div className='w-full h-1 bg-white'></div>
        <div className='w-full h-full mt-4'>
            <ul className='w-full h-full flex flex-col items-center gap-5'>
                <li>Dashboard</li>
                <li>Statistics</li>
                <li>Users</li>
                <li>Products</li>
                <li>Profiles</li>
                <li>Settings</li>
            </ul>
        </div>
      </div>
      <div className='w-[80%] h-full pl-20 pr-20 flex flex-col justify-around'>
        <div className='flex w-full justify-center'>
            <h1 className='text-8xl font-extrabold text-shadow-[0px_4px_5px] pt-10 bg-[var(--white-black-diagonal)] text-shadow-stone-300'>SHOP.CO</h1>
        </div>
        <div className='w-full flex justify-between mt-5'>
            <div className='w-52 h-35 bg-blue-400 rounded-2xl p-2 flex flex-col items-center text-white justify-between'>
                <div >
                   <p className='font-bold text-2xl'>30</p> 
                </div>
                <div>
                    <p className='font-medium text-2xl'>Products</p>
                </div>
            </div>
            <div className='w-52 h-35 bg-purple-700 rounded-2xl p-2 flex flex-col items-center text-white justify-between'>
                <div >
                   <p className='font-bold text-2xl'>3</p> 
                </div>
                <div>
                    <p className='font-medium text-2xl'>USERS</p>
                </div>
            </div>
            <div className='w-52 h-35 bg-green-500 rounded-2xl p-2 text-white flex flex-col items-center justify-between'>
                <div>
                   <p className='font-bold text-2xl'>62</p> 
                </div>
                <div>
                    <p className='font-medium text-2xl'>ORDERS</p>
                </div>
            </div>
            <div className='w-52 h-35 bg-red-400 rounded-2xl p-2  text-white flex flex-col items-center justify-between'>
                <div>
                   <p className='font-bold text-2xl'>29%</p> 
                </div>
                <div>
                    <p className='font-medium text-2xl'>GROWTH</p>
                </div>
            </div>
        </div>
        <div className='w-full h-70 bg-orange-300'>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
