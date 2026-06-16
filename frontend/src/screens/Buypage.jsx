import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import BACKEND_BASE_URL from '../../api/api';

const Buypage = () => {
    const {id} = useParams();
    const [data,setData] = useState([]);
    const [remove,setRemove] = useState(false);
    const token = localStorage.getItem('token');
    const handleData = async() =>{
        const response = await Axios.get(`${BACKEND_BASE_URL}/api/cart/get`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
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

            const response = await Axios.delete(`${BACKEND_BASE_URL}/api/cart/delete/${product_id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
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

    const removeAllProduct = async(e) =>{
        e.preventDefault();
        const response = await Axios.delete(`${BACKEND_BASE_URL}/api/cart/remove/all`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response.data);
        handleData();
    } 

    const addProduct = async(item) =>{
        const response = await Axios.post(`${BACKEND_BASE_URL}/api/cart/add`,{
            product:item._id,
            image:item.image,
            name:item.name,
            price:item.price,
            quantity:item.quantity
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        handleData();
        console.log(response.data);
    }

    const deleteComplete = async(id) =>{
        const response = await Axios.delete(`${BACKEND_BASE_URL}/api/cart/complete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(response.status == 200){
            setRemove(true);
            removeNotify();
            handleData();
        }
    }
    if (data.length < 1) {
return ( <div className='w-screen min-h-screen bg-[#fafafa]'> <Navbar />

  <div className='flex flex-col items-center justify-center h-[80vh] px-6'>

    <div className='w-40 h-40 rounded-full bg-[#E56627]/10 flex items-center justify-center mb-8'>

      <i className="fa-solid fa-cart-shopping text-7xl text-[#E56627]"></i>

    </div>

    <h1 className='text-5xl font-black text-[#0A2138] text-center'>
      Your Cart Is Empty
    </h1>

    <p className='text-gray-500 text-lg mt-4 text-center max-w-lg'>
      Looks like you haven't added anything to your cart yet.
      Start exploring our products and find something you'll love.
    </p>

    <Link to='/shop' className='mt-8'>

      <button
        className='
        px-8
        py-4
        bg-[#E56627]
        text-white
        rounded-full
        font-bold
        hover:bg-[#cf5a21]
        transition-all
        '
      >
        Continue Shopping
      </button>

    </Link>

  </div>
</div>

);
}


    let totalPrice = data.reduce((acc,item) => acc + (item.price * item.quantity), 0)
  return (
    <div className='w-screen min-h-screen flex flex-col bg-[#efefef]'>
        <nav>
            <div className='w-full overflow-hidden bg-white'>
            <span className='w-full h-7 overh bg-black text-white text-[13px] justify-end flex items-center' id='discount-banner'>
                <p>Check out <a href='/' className='w-[60%] hover:underline cursor-pointer'>Discount</a> upto 50% and latest deals.</p>
                <div className='w-[40%] flex justify-end pr-10'>
                <p className='text-[18px] cursor-pointer'>x</p>
                </div>
            </span>
            <div className='w-full h-23 flex justify-between pl-5 pr-20 items-center shadow-2xs sticky bg-white'>
                <Link to='/'>
                <h1 className='font-bold text-4xl cursor-pointer'>SHOP.CO</h1>
                </Link>
                <div>
                    <i className="fa-solid fa-user text-2xl border-2 pl-2 pr-2 pt-2 pb-2 rounded-[50%] cursor-pointer"></i>
                </div>
            </div>
        </div>
        </nav>
        <section className='pl-10 pr-10'>
            {
                data.map((item,index) =>{
                    return <div key={index} className='w-full rounded-[5px] mt-0.5 flex items-center justify-between shadow-[0px_4px_2px_2px] shadow-gray-200 bg-[white] overflow-hidden'>
                        <div className='flex items-center w-[50%] justify-between p-4'>
                            <img className='w-30 object-cover'  src={item.image} alt="image" />
                            <div className='flex flex-col gap-4 items-center'>
                                <h3 className='text-center font-bold text-2xl'>{item.name}</h3>
                                <p className='font-bold text-2xl'><i class="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-4'>
                            <i className="fa-solid fa-angle-up cursor-pointer hover:text-2xl transition-all" onClick={() => addProduct(item)}></i>
                            <p>{item.quantity}</p>
                            <i className="fa-solid fa-angle-down cursor-pointer hover:text-2xl transition-all" onClick={() => removeProduct(item._id)}></i>
                        </div>
                        <div onClick={() => deleteComplete(item._id)} className='h-48 flex items-center text-white pl-4 pr-4 bg-black cursor-pointer transition-all hover:bg-red-400'>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                })
            }
            <div className='w-full mt-5 mb-10'>
                <h1 className='font-bold text-2xl text-end mt-4' ><i class="fa-solid fa-indian-rupee-sign"></i>{totalPrice}</h1>
                <div className='flex gap-5 justify-end mt-4'>
                    <Link to='/booking'>
                        <button className='pl-7 pr-7 pt-2 pb-2 border-2 transition-all hover:bg-green-100 hover:border-green-500 hover:text-green-600 rounded-[5px] font-bold cursor-pointer'>Order Now</button>
                    </Link>
                    <button className='pl-7 pr-7 pt-2 pb-2 border-2 transition-all hover:bg-red-100 hover:border-red-500 hover:text-red-600 rounded-[5px] font-bold cursor-pointer' onClick={removeAllProduct} >Remove All</button>
                </div>
            </div>
            {
                remove && <div className='pl-6 pr-6 pt-4 pb-4 relative bg-green-300 text-green-800 rounded-[5px] remove-popup overflow-hidden'>
                    <div className='notify-loading w-full h-3 bg-green-500 absolute top-0 left-0'></div>
                    <p>Successfully Item removed from the cart !</p>
                </div>
            }
        </section>
    </div>
  )
}

export default Buypage
