import React, { useEffect, useMemo, useRef, useState } from 'react'

const categories = [
  { title: 'Electronics', color: 'bg-slate-900' },
  { title: 'Fashion', color: 'bg-emerald-500' },
  { title: 'Accessories', color: 'bg-sky-500' },
  { title: 'Home & Kitchen', color: 'bg-orange-500' },
  { title: 'Sports & Outdoors', color: 'bg-red-500' },
  { title: 'Toys & Games', color: 'bg-indigo-500' },
  { title: 'Health & Fitness', color: 'bg-lime-500' },
  { title: 'Books', color: 'bg-yellow-500' },
  { title: 'Beauty', color: 'bg-pink-500' },
  { title: 'Grocery', color: 'bg-teal-500' },
  { title: 'Watches', color: 'bg-stone-700' },
  { title: 'Travel', color: 'bg-cyan-500' },
  { title: 'Baby Care', color: 'bg-fuchsia-500' },
  { title: 'Pet Supplies', color: 'bg-amber-500' },
  { title: 'Stationery', color: 'bg-violet-500' },
  { title: 'Footwear', color: 'bg-rose-500' },
]

const PAGE_SIZE = 8

const CategoryCard = ({ title, color }) => (
  <div className='flex w-full items-center gap-4 h-24 rounded-xl border border-gray-200 bg-white shadow-sm px-4'>
    <div className={`w-14 h-14 rounded-md flex-shrink-0 ${color}`} />
    <p className='text-lg font-medium leading-tight'>{title}</p>
  </div>
)

const CategoryScroller = () => {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const pages = useMemo(() => {
    const result = []

    for (let index = 0; index < categories.length; index += PAGE_SIZE) {
      result.push(categories.slice(index, index + PAGE_SIZE))
    }

    return result
  }, [])

  const updateArrows = () => {
    const container = scrollRef.current
    if (!container) {
      return
    }

    const isAtStart = container.scrollLeft <= 0
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1

    setShowLeft(!isAtStart)
    setShowRight(!isAtEnd)
  }

  useEffect(() => {
    updateArrows()
    const container = scrollRef.current

    if (!container) {
      return undefined
    }

    container.addEventListener('scroll', updateArrows)
    window.addEventListener('resize', updateArrows)

    return () => {
      container.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollPage = (direction) => {
    const container = scrollRef.current
    if (!container) {
      return
    }

    const distance = container.clientWidth * direction
    container.scrollBy({ left: distance, behavior: 'smooth' })
  }

  return (
    <div className='relative w-full'>
      <div ref={scrollRef} className='flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar'>
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className='min-w-full shrink-0 snap-start'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {page.map((item) => (
                <CategoryCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {showLeft && (
        <button
          type='button'
          onClick={() => scrollPage(-1)}
          className='absolute left-0 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md'
          aria-label='Scroll categories left'
        >
          <i className='fa-solid fa-angle-left text-xl text-slate-700' />
        </button>
      )}

      {showRight && (
        <button
          type='button'
          onClick={() => scrollPage(1)}
          className='absolute right-0 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md'
          aria-label='Scroll categories right'
        >
          <i className='fa-solid fa-angle-right text-xl text-slate-700' />
        </button>
      )}
    </div>
  )
}

export default CategoryScroller