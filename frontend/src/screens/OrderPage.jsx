import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'

const OrderPage = () => {
const { id } = useParams()
const [data, setData] = useState(null);
const token = localStorage.getItem('token');
const [selectedColor, setSelectedColor] = useState('#0A2138');
const [selectedSize, setSelectedSize] = useState('M');
const [quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState('');


useEffect(() => {
  const finalData = async () => {
  const response = await Axios.get(
  `http://localhost:5000/api/products/${id}`
  );

  setData(response.data);
  setSelectedImage(response.data.image);

  };

  finalData();
}, [id]);


const insertIntoCart = async () => {
  const productData = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    quantity: 1,
  }

  const response = await Axios.post(
      'http://localhost:5000/api/cart/add',
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.statusText)
  }

  if (!data) {
  return ( <div className='w-screen h-screen flex items-center justify-center'> <h1 className='text-2xl font-bold text-[#0A2138]'>
  Loading Product... </h1> </div>
  )
  }

  return ( <div className='w-screen min-h-screen bg-white'> <Navbar />
    <section className='px-20 py-10 max-md:px-6'>

      {/* Breadcrumb */}
      <div className='flex items-center gap-2 text-sm text-gray-500 mb-8'>
        <a href='/'>Home</a>
        <i className="fa-solid fa-chevron-right text-xs"></i>
        <a href='/shop'>Shop</a>
        <i className="fa-solid fa-chevron-right text-xs"></i>
        <p className='text-[#0A2138] font-semibold'>
          {data.name}
        </p>
      </div>

      <div className='flex gap-12 max-md:flex-col'>

        {/* Product Image */}

        <div className='w-[55%] max-md:w-full'>

          <div className='bg-[#f8f8f8] border border-gray-200 rounded-3xl overflow-hidden'>
        <img
          src={selectedImage}
          alt={data.name}
          className='w-full h-[700px] object-cover hover:scale-105 transition-all duration-700'
        />

          </div>

          <div className='flex gap-3 mt-4 overflow-x-auto'>
        {data.images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className='
            min-w-[90px]
            h-[90px]
            rounded-2xl
            overflow-hidden
            border-2
            hover:border-[#E56627]
            transition-all
            '
          >
            <img
              src={img}
              alt=''
              className='w-full h-full object-cover'
            />
          </button>
        ))}

            <div
              className='
              min-w-[90px]
              h-[90px]
              bg-[#0A2138]
              text-white
              rounded-2xl
              flex
              items-center
              justify-center
              font-bold
              text-xl
              '
            >
              +4
            </div>

          </div>

        </div>


        {/* Product Details */}
        <div className='w-[45%] max-md:w-full'>

          <h1 className='text-5xl font-black text-[#0A2138] leading-tight'>
            {data.name}
          </h1>

          {/* Rating */}
          <div className='flex items-center gap-3 mt-5'>

            <div className='flex text-[#E56627]'>

              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>

            </div>

            <span className='font-semibold text-[#0A2138]'>
              {data.rating}
            </span>

            <span className='text-gray-500'>
              (120 Reviews)
            </span>

          </div>

          {/* Price */}
          <div className='flex items-center gap-4 mt-6'>

            <h2 className='text-4xl font-black text-[#E56627]'>
              ₹{data.price}
            </h2>

            <span className='bg-[#41EA41]/20 text-[#0A2138] px-4 py-1 rounded-full text-sm font-semibold'>
              In Stock
            </span>

          </div>

          {/* Description */}
          <p className='mt-6 text-gray-600 leading-8'>
            Crafted with premium materials and designed for
            maximum comfort. This product combines durability,
            quality, and modern style for everyday use.
          </p>

          {/* Colors */}
          <div className='mt-10 border-t border-gray-200 pt-8'>

            <h3 className='font-bold text-[#0A2138] mb-4'>
              Select Color
            </h3>

            <div className='flex gap-4'>

              <div className='mt-10 border-t border-gray-200 pt-8'>

            <h3 className='font-bold text-[#0A2138] mb-4'>
              Select Color
            </h3>

          <div className='flex gap-4'>
            {[
              '#0A2138',
              '#E56627',
              '#41EA41',
              '#000000'
              ].map((color) => (

                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className='w-11 h-11 rounded-full transition-all duration-300'
                  style={{
                    backgroundColor: color,
                    border:
                      selectedColor === color
                        ? '3px solid #E56627'
                        : '2px solid #e5e7eb'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className='mt-10 border-t border-gray-200 pt-8'>

            <h3 className='font-bold text-[#0A2138] mb-4'>
              Choose Size
            </h3>

            <div className='flex flex-wrap gap-3'>

              <div className='flex gap-4'>
            {[
              'S',
              'L',
              'XL',
              'XXL'
              ].map((size) => (

                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className='w-11 h-11 rounded-full transition-all duration-300'
                  style={{
                    backgroundColor: "white",
                    border:
                      selectedSize === size
                        ? '3px solid #E56627'
                        : '2px solid #e5e7eb'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

            </div>

          </div>

          {/* Quantity */}
          <div className='mt-10 border-t border-gray-200 pt-8'>

            <h3 className='font-bold text-[#0A2138] mb-4'>
              Quantity
            </h3>

            <div className='flex items-center border border-gray-300 rounded-full w-fit overflow-hidden'>

              <button onClick={() => setQuantity( quantity - 1)} className='w-12 h-12 hover:bg-gray-100'>
                -
              </button>

              <span className='w-12 text-center font-bold'>
                {quantity}
              </span>

              <button onClick={() => setQuantity(quantity + 1)} className='w-12 h-12 hover:bg-gray-100'>
                +
              </button>

            </div>

          </div>

          {/* Buttons */}
          <div className='flex gap-4 mt-10'>

            <Link
              to={`/product/cart/${id}`}
              className='w-[65%]'
            >
              <button
                onClick={insertIntoCart}
                className='
                w-full
                h-14
                bg-[#E56627]
                text-white
                rounded-full
                font-bold
                hover:bg-[#cf5a21]
                transition-all
                cursor-pointer
                '
              >
                Add To Cart
              </button>
            </Link>

            <button
              className='
              w-[35%]
              h-14
              border-2
              border-[#0A2138]
              text-[#0A2138]
              rounded-full
              font-bold
              hover:bg-[#0A2138]
              hover:text-white
              transition-all
              cursor-pointer
              '
            >
              Buy Now
            </button>

          </div>

          {/* Trust Section */}
          <div className='mt-10 border border-gray-200 rounded-3xl p-5'>

            <div className='flex items-center gap-3 mb-4'>
              <i className="fa-solid fa-truck-fast text-[#41EA41]"></i>
              <p>Free delivery on orders above ₹999</p>
            </div>

            <div className='flex items-center gap-3 mb-4'>
              <i className="fa-solid fa-arrow-rotate-left text-[#E56627]"></i>
              <p>7 Days Easy Returns</p>
            </div>

            <div className='flex items-center gap-3'>
              <i className="fa-solid fa-shield-halved text-[#0A2138]"></i>
              <p>100% Secure Payments</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  </div>

  )
}

export default OrderPage
