import React from 'react'
import ShopingList from '../components/ShopingList'

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

  return (
    <div className='overflow-hidden w-screen pb-10'>
      <span className='bg-black h-20 bottom-[-14px] w-full text-white flex items-center overflow-hidden'>
        <ul className='flex gap-10 text-4xl font-bold font-mono animate-marquee'>
          {brands.map((brand,i) => <li className={`y${i+1} animate-marquee`} key={i}>{brand}</li>)}
        </ul>
      </span>

      <ShopingList title="NEW ARRIVALS"/>
      <ShopingList title="TOP SELLINGS"/>
      <ShopingList title="ON SALE"/>
      
    </div>
  )
}

export default PreviewScreen
