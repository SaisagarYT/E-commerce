import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BACKEND_BASE_URL from '../../api/api'

const RecentlyCreatedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/products?sort=latest&limit=8`)
        setProducts(response.data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentProducts()
  }, [])

  const ratingDetails = (value) => Array.from({ length: Math.floor(Number(value) || 0) })

  if (loading) {
    return (
      <section className='w-full px-10 py-12'>
        <h2 className='text-2xl font-bold'>NEWLY CREATED PRODUCTS</h2>
        <p className='mt-4 text-sm text-slate-500'>Loading latest additions...</p>
      </section>
    )
  }

  return (
    <section className='w-full px-10 py-12'>
      <div className='flex items-end justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-orange-500'>Fresh arrivals</p>
            <h2 className='mt-2 text-3xl font-extrabold text-slate-900'>JUST DROPPED</h2>
            <p className='mt-2 max-w-2xl text-sm text-slate-500'>Discover the newest additions to our store, updated as soon as they go live.</p>
        </div>
      </div>

      <div className='mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {products.map((item) => (
          <Link key={item._id} to={`/product/detail/${item._id}`} className='group'>
            <article className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg'>
              <div className='relative aspect-[4/3] overflow-hidden bg-slate-100'>
                <img src={item.image} alt={item.name} className='h-full w-full object-cover transition duration-300 group-hover:scale-105' />
                <div className='absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white'>
                  New
                </div>
              </div>

              <div className='space-y-2 p-4'>
                <div>
                  <h3 className='truncate text-base font-semibold text-slate-900'>{item.name}</h3>
                  <p className='text-xs text-slate-500'>{item.brand}</p>
                </div>

                <div className='flex items-center gap-2'>
                  {ratingDetails(item.rating).map((_, index) => (
                    <i key={index} className='fa-solid fa-star text-[12px] text-yellow-500' />
                  ))}
                  <p className='text-xs text-slate-500'>{item.rating}/5</p>
                </div>

                <div className='flex items-center justify-between pt-1'>
                  <p className='text-xs text-slate-500'>{item.numReviews} reviews</p>
                  <p className='text-sm font-bold text-slate-900'>
                    {item.price}
                    <i className='fa-solid fa-indian-rupee-sign ml-1 text-[11px]' aria-hidden='true' />
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RecentlyCreatedProducts