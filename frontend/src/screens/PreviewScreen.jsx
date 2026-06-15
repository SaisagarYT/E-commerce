import React from 'react'
import ShopingList from '../components/ShopingList'
import RecentlyCreatedProducts from '../components/RecentlyCreatedProducts'

const PreviewScreen = () => {

const brands = [
'Nike',
'Adidas',
'Puma',
'Zara',
'H&M',
'Levi’s',
'Gucci',
'Prada',
'Versace',
'Uniqlo',
]

return ( <div className='overflow-hidden w-screen bg-white pb-16'>
  {/* Brand Showcase Section */}
  <section className='relative bg-[#0A2138] py-8 overflow-hidden'>

    {/* Decorative Gradient */}
    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#0A2138] via-[#122e4a] to-[#0A2138]'></div>

    <div className='relative z-10'>

      <h2 className='text-center text-white text-sm tracking-[6px] uppercase mb-6'>
        Trusted By Global Brands
      </h2>

      <div className='overflow-hidden whitespace-nowrap'>

        <ul className='flex gap-20 text-4xl font-black text-white animate-[scroll_25s_linear_infinite] w-max'>

          {[...brands, ...brands].map((brand, i) => (
            <li
              key={i}
              className='
              cursor-pointer
              transition-all
              duration-300
              hover:text-[#E56627]
              hover:scale-110
              '
            >
              {brand}
            </li>
          ))}

        </ul>

      </div>

    </div>

  </section>

  {/* Product Sections */}
  <section className='mt-16'>

    <div className='mb-20'>
      <ShopingList
        title="TOP SELLINGS"
        type="top"
      />
    </div>

    <div className='mb-20'>
      <ShopingList
        title="ON SALE"
        type="sale"
      />
    </div>

    <RecentlyCreatedProducts />

  </section>

  {/* Trust Section */}
  <section className='mt-20 px-10'>

    <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6'>

      <div
        className='
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-8
        shadow-md
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        '
      >
        <div className='text-[#E56627] text-4xl mb-4'>
          <i className="fa-solid fa-truck-fast"></i>
        </div>

        <h3 className='font-bold text-xl text-[#0A2138]'>
          Fast Delivery
        </h3>

        <p className='text-gray-500 mt-2'>
          Nationwide shipping with lightning-fast delivery.
        </p>
      </div>

      <div
        className='
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-8
        shadow-md
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        '
      >
        <div className='text-[#41EA41] text-4xl mb-4'>
          <i className="fa-solid fa-shield-halved"></i>
        </div>

        <h3 className='font-bold text-xl text-[#0A2138]'>
          Secure Payment
        </h3>

        <p className='text-gray-500 mt-2'>
          100% protected transactions and checkout process.
        </p>
      </div>

      <div
        className='
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-8
        shadow-md
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        '
      >
        <div className='text-[#E56627] text-4xl mb-4'>
          <i className="fa-solid fa-medal"></i>
        </div>

        <h3 className='font-bold text-xl text-[#0A2138]'>
          Premium Quality
        </h3>

        <p className='text-gray-500 mt-2'>
          Carefully selected products from trusted brands.
        </p>
      </div>

      <div
        className='
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-8
        shadow-md
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        '
      >
        <div className='text-[#41EA41] text-4xl mb-4'>
          <i className="fa-solid fa-headset"></i>
        </div>

        <h3 className='font-bold text-xl text-[#0A2138]'>
          24/7 Support
        </h3>

        <p className='text-gray-500 mt-2'>
          Dedicated support whenever you need assistance.
        </p>
      </div>

    </div>

  </section>

</div>

)
}

export default PreviewScreen
