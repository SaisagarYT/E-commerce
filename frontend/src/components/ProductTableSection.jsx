import React, { useMemo, useState } from 'react'

const tabs = [
  { label: 'All Product', count: 145 },
  { label: 'Featured Products' },
  { label: 'On Sale' },
  { label: 'Out of Stock' },
]

const rows = [
  { name: 'Wireless Bluetooth Headphones', date: '01-01-2025', order: 25, color: 'bg-indigo-600', featured: true, onSale: false, outOfStock: false },
  { name: "Men's T-Shirt", date: '01-01-2025', order: 20, color: 'bg-slate-700', featured: false, onSale: true, outOfStock: false },
  { name: "Men's Leather Wallet", date: '01-01-2025', order: 35, color: 'bg-red-800', featured: false, onSale: false, outOfStock: false },
  { name: 'Memory Foam Pillow', date: '01-01-2025', order: 40, color: 'bg-zinc-300', featured: false, onSale: false, outOfStock: true },
  { name: 'Coffee Maker', date: '01-01-2025', order: 45, color: 'bg-neutral-900', featured: true, onSale: true, outOfStock: false },
  { name: 'Casual Baseball Cap', date: '01-01-2025', order: 55, color: 'bg-emerald-300', featured: false, onSale: false, outOfStock: false },
]

const TabButton = ({ active, label, count, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-white text-orange-600 shadow-none' : 'text-slate-600 hover:text-slate-900'}`}
  >
    {label} {count ? <span className='ml-2 text-xs text-orange-500'>({count})</span> : null}
  </button>
)

const ActionButton = ({ icon }) => (
  <button
    type='button'
    className='flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-500 transition-colors hover:bg-slate-50'
  >
    <i className={icon} />
  </button>
)

const ProductTableSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const visibleRows = useMemo(() => {
    // 0 = All, 1 = Featured, 2 = On Sale, 3 = Out of Stock
    switch (activeTab) {
      case 1:
        return rows.filter((r) => r.featured)
      case 2:
        return rows.filter((r) => r.onSale)
      case 3:
        return rows.filter((r) => r.outOfStock)
      default:
        return rows
    }
  }, [activeTab])

  return (
    <section className='w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-none'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex flex-wrap items-center gap-2 rounded-2xl bg-orange-100 p-1'>
          {tabs.map((tab, index) => (
            <TabButton
              key={tab.label}
              active={activeTab === index}
              label={tab.label}
                  count={tab.count}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <label className='flex h-10 items-center rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400'>
            <input
              type='text'
              placeholder='Search your product'
              className='w-48 bg-transparent outline-none placeholder:text-slate-400'
            />
            <i className='fa-solid fa-magnifying-glass ml-4 text-base text-slate-500' />
          </label>
          <ActionButton icon='fa-solid fa-filter' />
          <ActionButton icon='fa-regular fa-square-plus' />
          <ActionButton icon='fa-solid fa-ellipsis' />
        </div>
      </div>

      <div className='mt-6 overflow-hidden rounded-[24px] border border-slate-200'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-200'>
            <thead className='bg-slate-50'>
              <tr className='text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                <th className='px-5 py-4'>No.</th>
                <th className='px-5 py-4'>Product</th>
                <th className='px-5 py-4'>Created Date</th>
                <th className='px-5 py-4'>Order</th>
                <th className='px-5 py-4'>Action</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100 bg-white'>
              {visibleRows.map((row, index) => (
                <tr key={row.name} className='transition hover:bg-orange-50/40'>
                  <td className='px-5 py-4'>
                    <div className='flex items-center gap-3'>
                      <span className='flex h-5 w-5 items-center justify-center rounded-sm border border-slate-200 text-slate-400'>
                        <i className='fa-regular fa-square text-[11px]' />
                      </span>
                      <span>{index + 1}</span>
                    </div>
                  </td>

                  <td className='px-5 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className={`h-12 w-12 rounded-md border border-slate-200 ${row.color}`} />
                      <span className='max-w-[220px] text-sm leading-tight text-slate-900'>{row.name}</span>
                    </div>
                  </td>

                  <td className='px-5 py-4 text-sm text-slate-600'>{row.date}</td>
                  <td className='px-5 py-4 text-sm text-slate-700'>{row.order}</td>
                  <td className='px-5 py-4'>
                    <div className='flex items-center gap-3 text-slate-500'>
                      <button type='button' aria-label='Edit product'>
                        <i className='fa-regular fa-pen-to-square text-lg' />
                      </button>
                      <button type='button' aria-label='Delete product'>
                        <i className='fa-regular fa-trash-can text-lg' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ProductTableSection