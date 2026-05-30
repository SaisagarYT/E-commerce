import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { CustomButton } from '../reusableComponents/CustomButton';
import { CustomInput } from '../reusableComponents/CustomInput';
import { CustomDropDown } from '../reusableComponents/CustomDropDown';
import CategoryScroller from './CategoryScroller';

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [popup, isPopup] = useState(false);
    const [category, setCategory] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [sendProduct, setSendProduct] = useState({
        user:"",
        name:"",
        image:"",
        brand:"",
        category:"",
        description:"",
        price:0,
        countInStock:"",
        raring:0,
        numReviews:0,
        productType:"",
    })
    const token = localStorage.getItem('token');
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://localhost:5000/api/products',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
                setProducts(response.data);
            }
            catch(err){
                console.log(err.message);
            }
        }
        fetchData()
    },[token])

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

    const addProduct = async() =>{
        try{
            const response = await axios.post('http://localhost:5000/api/products/',sendProduct,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            setSendProduct(response);
        }
        catch(err){
            console.log('error:',err);
        }
    }

    const setPopup = () =>{
        isPopup((x) => x === false ? true : false);
        console.log(popup);
    }

    const handleCategoryChange = (e) =>{
        setCategory(e.target.value);
        setShowDropdown(true);
    }

    const handleCustomDropDown = (value) =>{
        setCategory(value);
        setShowDropdown(false);

        setSendProduct(prev => ({
            ...prev,
            category: value
        }));
    }

    const handleAllInputs = (e) =>{
        const {name, value} = e.target;
        setSendProduct(prev => ({
            ...prev,
            [name]:value
        }));
        console.log(name,value)
    }

  return (
    <div className='w-full h-full flex flex-col gap-2 mt-5 relative'>
        {
            popup &&
            <div className='popup w-full h-full flex justify-center bg-[#0000003f] items-center absolute top-0 right-0'>
                <div className='w-2/5 flex flex-col gap-6  bg-white shadow-lg p-5 rounded-2xl'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-lg font-bold'>Add Product</h1>
                        <i onClick={setPopup} className="fa-regular text-2xl cursor-pointer duration-200 hover:bg-gray-200 p-2 rounded-full fa-circle-xmark"></i>
                    </div>
                    <div className='w-full flex gap-3 h-full'>
                        <CustomInput
                        type={"adminDashboardInput"}
                            width={"w-1/2"}
                            height={"h-10"}
                            title={"Name"}
                            border={"border-2"}
                            borderColor={"border-gray-400"}
                            placeholder={"Product Name"}
                            onchange={handleAllInputs}
                            value={sendProduct.name}
                        />
                        <CustomInput
                        type={"adminDashboardInput"}
                            width={"w-1/2"}
                            height={"h-10"}
                            title={"Brand"}
                            border={"border-2"}
                            borderColor={"border-gray-400"}
                            placeholder={"Brand Name"}
                            onchange={handleAllInputs}
                            value={sendProduct.brand}
                        />
                    </div>
                    <div className='w-full flex gap-3 h-full'>
                        <CustomInput
                        type={"adminDashboardInput"}
                        fieldType={"text"}
                            width={"w-1/2"}
                            height={"h-10"}
                            title={"Product"}
                            border={"border-2"}
                            borderColor={"border-gray-400"}
                            placeholder={"Product Type"}
                            onchange={handleAllInputs}
                            value={sendProduct.productType}
                        />
                        <div className='w-1/2'>
                            <CustomInput
                            type={"adminDashboardInput"}
                                width={"w-full"}
                                height={"h-10"}
                                title={"Category"}
                                border={"border-2"}
                                borderColor={"border-gray-400"}
                                placeholder={"Category Name"}
                                onchange={handleCategoryChange}
                                value={category}
                            />
                            <CustomDropDown category={category} visibility={showDropdown} dropdownEvent={handleCustomDropDown} />
                        </div>

                    </div>
                    <div className='w-full'>
                        <CustomInput
                        type={"adminDashboardImageUpload"}
                        fieldType={"file"}
                            width={"w-full"}
                            height={"h-40"}
                            title={"Image"}
                            border={"border-2"}
                            bgcolor={"bg-green-100"}
                            borderColor={"border-gray-400"}
                            placeholder={"Product Name"}
                            onchange={handleAllInputs}
                            value={sendProduct.image}
                        />
                    </div>
                    <div className='w-full flex gap-3 h-full'>
                        <CustomInput
                        type={"adminDashboardInput"}
                        fieldType={"Number"}
                            width={"w-1/2"}
                            height={"h-10"}
                            title={"Stock"}
                            border={"border-2"}
                            borderColor={"border-gray-400"}
                            placeholder={"Stock Count"}
                            onchange={handleAllInputs}
                            value={sendProduct.countInStock}
                        />
                        <CustomInput
                            type={"adminDashboardInput"}
                            fieldType={"Number"}
                            width={"w-1/2"}
                            height={"h-10"}
                            title={"Price"}
                            border={"border-2"}
                            borderColor={"border-gray-400"}
                            placeholder={"Price Tag"}
                            onchange={handleAllInputs}
                            value={sendProduct.category}
                        />
                    </div>
                    <div className='w-full flex-col flex gap-3 h-full'>
                        <textarea className='w-full indent-2 h-25 border border-dashed outline-0 focus:ring-3 ring-blue-300 rounded-xl' placeholder='Description' name="" id=""></textarea>
                    </div>
                    <CustomButton clickEvent={addProduct} type={"add"} title={"Submit"}/>
                </div>
            </div>
        }

        <div className='w-full flex items-center'>
            <h1 className='text-xl font-medium'>Discover</h1>
            <div className='w-full flex justify-end gap-3'>
                <CustomButton clickEvent={setPopup} type={"add"}  bgcolor={"green-600"} title={"Add product"} height={4}/>
                <CustomButton type={"add"} textcolor={"black"} bgcolor={"white"} border={"border"} height={4} borderColor={"gray-300"} title={"More Action"}/>
            </div>
        </div>

        <div className='w-full'>
            <CategoryScroller />
        </div>

        
        <table className='w-full text-center'>
            <thead>
                <tr className=' border-gray-500 text-white'>
                    <th className='px-4 py-4 bg-gray-800'>ProductId</th>
                    <th className='px-4 py-4 bg-gray-800'>Name</th>
                    <th className='px-4 py- bg-gray-800'>Brand</th>
                    <th className='px-4 py-4 bg-gray-800'>Category</th>
                    <th className='px-4 py-4 bg-gray-800'>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product,index) =>  <tr className='border-b' key={index}>
                <td className="px-4 py-2">{product._id}</td>
                <td className="px-4 py-2 flex  items-center gap-4"><img className='w-6' src={product.image} alt="" />{product.name}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td>
                    <div className='relative cursor-pointer'>
                        <i class="fa-solid fa-grip-lines"></i>
                        <ul className='absolute top-[-30px] shadow-2xl rounded-[8px] overflow-hidden right-10 tab invisible cursor-pointer '>
                            <li className='p-2 bg-white hover:bg-red-400 hover:text-white' onClick={() => removeProduct(product._id)}>Remove</li>
                        </ul>
                    </div>
                </td>
                </tr>)
                }
            </tbody>
        </table>
        {
            products.length === 0 && <div className='w-full flex items-center justify-center h-10 bg-white'>
                <h1>No products found</h1>
            </div>
        }
    </div>
  )
}

export default ProductDisplay
