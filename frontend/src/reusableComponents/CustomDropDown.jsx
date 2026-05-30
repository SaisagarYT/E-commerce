import React from 'react'

export const CustomDropDown = ({visibility,dropdownEvent,category}) => {
    const categoryData = ["pants","shoose","shirt","T-shirt","socks","inners","caps"];
    const data = categoryData.filter((item) => item.toLowerCase().includes(category.toLowerCase()));

  return (
    <div className={`w-full ${category == ""? 'hidden':'block'} bg-white ${visibility ? 'block':'hidden'}`}>
        <ul className='w-full h-40 mt-1 flex  border border-gray-300 flex-col shadow items-center rounded-xl overflow-y-scroll'>
            {
                data.map((value,i) =>{
                    return <li key={i} onClick={() => dropdownEvent(value)} className='w-full text-center py-3 hover:bg-gray-200 duration-200 cursor-pointer border-gray-300 rounded-lg'>{value}</li>
                })
            }
        </ul>
    </div>
  )
}
