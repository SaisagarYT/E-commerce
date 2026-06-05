import React from 'react'
import { DashboardCard } from '../reusableComponents/DashboardCard'
import { CustomButton } from '../reusableComponents/CustomButton'
import GenericTable from '../reusableComponents/GenericTable'
import ReportGraphCard from '../reusableComponents/ReportGraphCard'

const countryData = [
  { name: 'US', value: '30k', progress: 76, delta: '+25.8%', deltaClass: 'text-green-500' },
  { name: 'Brazil', value: '30k', progress: 64, delta: '-15.8%', deltaClass: 'text-red-500' },
  { name: 'Australia', value: '25k', progress: 48, delta: '+35.8%', deltaClass: 'text-green-500' },
]

const topProducts = [
  { name: 'Apple iPhone 13', category: 'Smartphone', price: '$999.00', tone: 'bg-purple-500' },
  { name: 'Nike Air Jordan', category: 'Shoes', price: '$724.00', tone: 'bg-slate-800' },
  { name: 'T-shirt', category: 'Clothing', price: '$53.40', tone: 'bg-pink-500' },
  { name: 'Assorted Cross Bag', category: 'Accessories', price: '$80.00', tone: 'bg-amber-700' },
]

const weeklyBars = [
  { label: 'M', value: 10 },
  { label: 'T', value: 14 },
  { label: 'W', value: 18 },
  { label: 'T', value: 26 },
  { label: 'F', value: 22 },
  { label: 'S', value: 20 },
  { label: 'S', value: 24 },
]

const UsersCard = () => (
  <div className='flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-none min-w-0'>
    <div className='flex items-start justify-between'>
      <div>
        <p className='text-sm font-medium text-orange-600'>Users in last 30 minutes</p>
        <div className='mt-1 text-4xl font-bold text-slate-900'>21.5K</div>
        <p className='mt-2 text-sm text-slate-500'>Users per minute</p>
      </div>
      <i className='fa-solid fa-ellipsis-vertical text-slate-400' />
    </div>

    <div className='mt-4 w-full min-w-0 rounded-2xl bg-orange-50 px-2 py-2'>
      <div className='flex h-[150px] items-end gap-3 rounded-xl bg-orange-50 px-3 py-3'>
        {weeklyBars.map((bar) => {
          const height = Math.max((bar.value / 30) * 100, 18)

          return (
            <div key={bar.label} className='flex h-full flex-1 flex-col items-center justify-end gap-2'>
              <div className='flex h-full w-full items-end justify-center'>
                <div
                  className='w-full max-w-[18px] rounded-t-full bg-orange-500'
                  style={{ height: `${height}%` }}
                  aria-label={`${bar.label} users`}
                />
              </div>
              <span className='text-xs font-medium text-slate-500'>{bar.label}</span>
            </div>
          )
        })}
      </div>
    </div>

    <div className='mt-5 border-t border-slate-200 pt-4'>
      <div className='flex items-center justify-between text-sm font-medium text-slate-700'>
        <span>Sales by Country</span>
        <span>Sales</span>
      </div>

      <div className='mt-4 space-y-4'>
        {countryData.map((country) => (
          <div key={country.name} className='grid grid-cols-[auto,1fr,auto] items-center gap-3'>
            <div className='flex items-center gap-3'>
              <div className='h-8 w-8 rounded-full bg-orange-500' />
              <div>
                <div className='text-sm font-medium text-slate-900'>{country.name}</div>
                <div className='text-xs text-slate-400'>{country.value}</div>
              </div>
            </div>
            <div className='h-2 rounded-full bg-slate-100'>
              <div className='h-2 rounded-full bg-orange-500' style={{ width: `${country.progress}%` }} />
            </div>
            <div className={`text-sm font-medium ${country.deltaClass}`}>{country.delta}</div>
          </div>
        ))}
      </div>

      <button className='mt-5 w-full rounded-full border border-orange-500 py-2 font-medium text-orange-600'>View Insight</button>
    </div>
  </div>
)

const TopProductsCard = () => (
  <div className='flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-none'>
    <div className='flex items-center justify-between'>
      <h3 className='text-xl font-semibold text-slate-900'>Top Products</h3>
      <button className='text-sm font-medium text-orange-600'>All product</button>
    </div>

    <label className='mt-4 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-slate-400'>
      <i className='fa-solid fa-magnifying-glass text-slate-400' />
      <input type='text' placeholder='Search' className='w-full bg-transparent outline-none placeholder:text-slate-400' />
    </label>

    <div className='mt-4 space-y-4'>
      {topProducts.map((product) => (
        <div key={product.name} className='flex items-center gap-3 rounded-2xl border border-slate-100 p-3'>
          <div className={`h-12 w-12 rounded-xl ${product.tone}`} />
          <div className='min-w-0 flex-1'>
            <div className='truncate text-sm font-semibold text-slate-900'>{product.name}</div>
            <div className='text-xs text-slate-400'>{product.category}</div>
          </div>
          <div className='text-sm font-semibold text-slate-900'>{product.price}</div>
        </div>
      ))}
    </div>
  </div>
)

const HomeDisplay = () => {
  const tableData = [];
  return (
    <section className='w-full flex flex-col gap-4 mt-5'>
      <div className='flex gap-4'>
        <DashboardCard/>
        <DashboardCard/>
        <DashboardCard/>
      </div>
      
      <div className='grid w-full grid-cols-[minmax(0,1.9fr)_minmax(360px,1fr)] gap-4'>
        <ReportGraphCard />
        <UsersCard />
      </div>

      <div className='grid w-full grid-cols-[minmax(0,1.75fr)_minmax(320px,1fr)] gap-4'>
        <div className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-none'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-2xl font-semibold text-slate-900'>Transaction</h1>
            <CustomButton
             type={"filter"} 
             title={"Filter"} 
             textcolor={"white"} 
             bgcolor={"orange-500"} 
             border={"border"} 
             borderColor={"orange-500"}
             width={"4"}
             height={"2"}
             icon={<i class="fa-solid fa-arrow-down-wide-short"></i>} 
            />
          </div>
          <div className='w-full h-full gap-4 items-end flex flex-col'>
            <GenericTable
              columns={['OrderId','Customer','Items','Status','Country','Total','Date']}
              rows={tableData}
              emptyMessage={'No Data'}
            />
            <CustomButton 
              type={"card"} 
              title={"Details"} 
              textcolor={"orange-500"} 
              bgcolor={"white"} 
              border={"border"} 
              borderColor={"orange-500"}
              width={6}
              height={1}
            />
          </div>
        </div>
        <TopProductsCard />
      </div>
    </section>
  )
}

export default HomeDisplay