import axios from 'axios';
import React, { useEffect, useState} from 'react'

const ProductDisplay = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://localhost:5000/api/products',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
                setData(response.data);
            }
            catch(err){
                console.log(err.message);
            }
        }
        fetchData()
    },[])

    const removeProduct = async(id) =>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
            console.log(response.status);
            window.alert("Product deleted");
        }
        catch(err){
            console.log("error is:",err.message);
        }
    }

    const sideTab = () =>{
        const tab = document.querySelector('.tab');
        tab.classList.toggle('active');
    }
  return (
    <div className='w-full mt-5'>
      <table className='w-full text-center'>
        <thead>
            <tr className='border-b border-gray-500'>
                <th className='px-4 py-4'>ProductId</th>
                <th className='px-4 py-4'>Name</th>
                <th className='px-4 py-4'>Brand</th>
                <th className='px-4 py-4'>Category</th>
                <th className='px-4 py-4'>Price</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((product,index) =>  <tr className='border-b' key={index}>
            <td className="px-4 py-2">{product._id}</td>
            <td className="px-4 py-2 flex  items-center gap-4"><img className='w-6' src={product.image} alt="" />{product.name}</td>
            <td className="px-4 py-2">{product.brand}</td>
            <td className="px-4 py-2">{product.category}</td>
            <td className="px-4 py-2">{product.price}</td>
            <td>
                <div className='relative cursor-pointer'>
                    <i class="fa-solid fa-grip-lines" onClick={sideTab}></i>
                    <ul className='absolute top-[-30px] shadow-2xl rounded-[8px] overflow-hidden right-10 tab invisible cursor-pointer '>
                        <li className='p-2 bg-white hover:bg-red-400 hover:text-white' onClick={() => removeProduct(product._id)}>Remove</li>
                    </ul>
            </div>
            </td>
            </tr>)
            }
        </tbody>
      </table>
    </div>
  )
}

export default ProductDisplay
