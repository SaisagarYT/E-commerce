import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

const ShopingList = (props) => {
  const [data,setData] = useState([])
  useEffect(() =>{
    Axios.get('http://localhost:5000/api/products')
    .then((res) => setData(res.data));
  },[]);

  let ratingDetails = (x) =>{
    let rate = Number(x);
    let roundedRate = Math.floor(rate);
    let list = [];
    for(let i = 0;i < roundedRate;i++){
      list.push(i);
    }
    return list;
  }
  return (
    <section className='w-full flex flex-col justify-center items-center'>
        <h1 className='font-extrabold text-4xl mt-15'>{props.title}</h1>
        <div className='w-full flex gap-8 justify-center mt-5 pt-5 flex-wrap cursor-pointer' data-aos="zoom-out-right">
         {
          data.map((item,index) => item.productType == props.type && index < 30? <Link key={index} to={`/product/detail/${item._id}`}>
            <div  className='w-50 rounded-2xl h-70 box overflow-hidden border border-gray-400 shadow-2xl' onMouseLeave={(e) => e.currentTarget.classList.remove('rotate-temp')} onMouseEnter={(e) => e.currentTarget.classList.add('rotate-temp')}>
              <img className='w-full h-[60%] object-cover' src={item.image} alt="" />
              <div className='w-full p-2'>
                <p className='font-medium text-[16px]'>{item.name}</p>
                <div className='flex gap-2 items-center'>
                  {
                    ratingDetails(item.rating).map((x,index) => <i key={index} className="fa-solid fa-star text-[12px] text-yellow-500"></i>)
                  }
                  <p className='text-gray-500 text-[12px]'>{item.rating}/5</p>
                </div>
                <div className='flex w-full justify-between items-center pl-1 pr-4'>
                  <p className='text-gray-500 text-[12px]'>{item.numReviews}reviews</p>
                  <p className='font-bold'>{item.price}<i className="fa-solid fa-indian-rupee-sign text-[12px]"></i></p>
                </div>
              </div>
          </div>
          </Link> : "")
         } 
        </div>
      </section>
  )
}

export default ShopingList
