import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Buypage = () => {
    const {id} = useParams();
    const [data,setData] = useState([{}]);
    useEffect(() =>{
        const handleData = async() =>{
            const response = await Axios.get(`http://localhost:5000/api/cart/get`);
            setData(response.data);
        }
        handleData();
    },[id])

    const removeProduct = async() =>{
        const response = await Axios.delete(`http://localhost:5000/api/cart/delete/${id}`);
        console.log(response.statusText);
    }

    if(data.length < 1){
        return <div>Loading...</div>
    }
  return (
    <section className='w-screen h-max p-10'>
        {
            data.map((item,index) =>{
                return <div key={index} className='w-full rounded-[5px] mt-10 flex items-center justify-between bg-red-200'>
                    <div className='flex items-center w-[50%] justify-between p-4'>
                        <img className='w-30 object-cover'  src={item.image} alt="image" />
                        <div className='flex flex-col gap-4 items-center'>
                            <h3 className='text-center font-bold text-2xl'>{item.name}</h3>
                            <p className='font-bold text-2xl'><i class="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <i className="fa-solid fa-angle-up"></i>
                        <p>{item.quantity}</p>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div onClick={removeProduct} className='h-47 flex items-center text-white pl-4 pr-4 bg-red-400 cursor-pointer'>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                 </div>
            })
        }
        <div className='w-full mt-5'>
            <hr />
            <h1 className='font-bold text-2xl text-end mt-4 text-red-400' >Total Cost:10000</h1>
            <div className='flex gap-5 justify-end mt-4'>
                <button className='pl-5 pr-4 pt-4 pb-4 bg-green-500 text-white rounded-[5px] font-bold'>Order Now</button>
                <button className='pl-7 pr-7 pt-4 pb-4 border-2 bg-red-200 border-red-500 text-red-500 rounded-[5px] font-bold'>Remove All</button>
            </div>
        </div>
    </section>
  )
}

export default Buypage
