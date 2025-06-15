import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Buypage = () => {
    const {id} = useParams();
    const [data,setData] = useState([]);
    const [remove,setRemove] = useState(false);
    const handleData = async() =>{
        const response = await Axios.get(`http://localhost:5000/api/cart/get`);
        setData(response.data);
    }
    useEffect(() =>{
        handleData();
    },[id])

    const removeNotify = async() =>{
        setTimeout(() => {
            setRemove(false)
        }, 3000);
    }

    const removeProduct = async(product_id) =>{
        try{

            const response = await Axios.delete(`http://localhost:5000/api/cart/delete/${product_id}`);
            console.log(response.status);
            if(response.status == 200){
                setRemove(true);
                removeNotify();
                handleData();
            }
        }
        catch(err){
            console.log("error in the backend is:",err.message);
        }
    }

    const removeAllProduct = async() =>{
        const response = await Axios.delete(`http://localhost:5000/api/cart/delete/all`)
        console.log(response.statusText)
        handleData();
    } 
    if(data.length < 1){
        return(
            <div className='w-screen h-screen items-center flex justify-center flex-col'>
                <Navbar/>
                <div className='w-screen h-screen items-center flex justify-center flex-col'>
                    <h1 className='pl-10 pr-10 pt-2 pb-4 bg-black text-white text-8xl font-extrabold rounded-tl-2xl rounded-br-2xl'>EMPTY</h1>
                    <p className='mt-4 text-2xl'>Please don't Keep me empty....</p>
                </div>
            </div>
        );
    }
  return (
    <section className='w-screen h-max flex flex-col pl-10 pr-10'>
        <Navbar/>
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
                    <div onClick={() => removeProduct(item._id)} className='h-47 flex items-center text-white pl-4 pr-4 bg-red-400 cursor-pointer'>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                 </div>
            })
        }
        <div className='w-full mt-5'>
            <hr />
            <h1 className='font-bold text-2xl text-end mt-4 text-red-400' >Total Cost:10000</h1>
            <div className='flex gap-5 justify-end mt-4'>
                <button className='pl-5 pr-4 pt-2 pb-2 bg-green-500 text-white rounded-[5px] font-bold cursor-pointer'>Order Now</button>
                <button className='pl-7 pr-7 pt-1 pb-1 border-2 bg-red-200 border-red-500 text-red-500 rounded-[5px] font-bold cursor-pointer' onClick={removeAllProduct} >Remove All</button>
            </div>
        </div>
        {
            remove && <div className='pl-6 pr-6 pt-4 pb-4 relative bg-green-300 text-green-800 rounded-[5px] remove-popup overflow-hidden'>
                <div className='notify-loading w-full h-3 bg-green-500 absolute top-0 left-0'></div>
                <p>Successfully Item removed from the cart !</p>
            </div>
        }
    </section>
  )
}

export default Buypage
