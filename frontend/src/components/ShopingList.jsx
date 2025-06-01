import React from 'react'

const ShopingList = (props) => {
  let list = [1,2,3,4,5];
  return (
    <section className='w-full flex flex-col justify-center items-center'>
        <h1 className='font-extrabold text-4xl mt-15'>{props.title}</h1>
        <div className='w-full flex gap-8 justify-center mt-5 pt-5 flex-wrap' data-aos="zoom-out-right">
         {
          list.map((item,index) => <div key={index} className='w-55 rounded-2xl h-60 bg-red-300 box' onMouseLeave={(e) => e.currentTarget.classList.remove('rotate-temp')} onMouseEnter={(e) => e.currentTarget.classList.add('rotate-temp')}>

          </div>)
         } 
        </div>
      </section>
  )
}

export default ShopingList
