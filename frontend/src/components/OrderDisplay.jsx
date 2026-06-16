import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import GenericTable from '../reusableComponents/GenericTable'
import BACKEND_BASE_URL from '../../api/api'

const tabs = [
  { label: 'All order', suffix: '240' },
  { label: 'Completed' },
  { label: 'Pending' },
  { label: 'Canceled' },
]

const summaryCards = [
  { label: 'Total Orders', value: '1,240', delta: '+14.4%', deltaTone: 'text-emerald-500' },
  { label: 'New Orders', value: '240', delta: '+20%', deltaTone: 'text-emerald-500' },
  { label: 'Completed Orders', value: '960', delta: '85%', deltaTone: 'text-emerald-500' },
  { label: 'Canceled Orders', value: '87', delta: '-5%', deltaTone: 'text-rose-500' },
]

const OrderDisplay = () => {
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios.get(`${BACKEND_BASE_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setOrders(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.log('error:', error.message)
      }
    }

    fetchOrders()
  }, [token])

  const displayRows = useMemo(() => {
    return orders.map((order, index) => {
      const firstItem = order.orderItems?.[0]
      const productName = firstItem?.name || 'Unknown product'

      return {
        id: order._id,
        index: index + 1,
        orderId: `#${String(order._id || '').slice(0, 7).toUpperCase()}`,
        productName,
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB').replaceAll('/', '-') : '01-01-2025',
        price: typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : '0.00',
        payment: order.isPaid ? 'Paid' : 'Unpaid',
        statusKey: order.isDelivered ? 'delivered' : order.isPaid ? 'paid' : 'pending',
      }
    })
  }, [orders])

  return (
    <div className='w-full mt-5 space-y-5'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-semibold text-slate-900'>Order Management</h2>
          <p className='mt-1 text-sm text-slate-500'>Order List</p>
        </div>

        <div className='flex items-center gap-3'>
          <button className='inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-none transition-colors hover:bg-orange-600'>
            <i className='fa-solid fa-circle-plus' />
            Add Order
          </button>
          <button className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50'>
            More Action
            <i className='fa-solid fa-ellipsis-vertical text-xs' />
          </button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {summaryCards.map((card) => (
          <div key={card.label} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-none'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <h3 className='text-base font-semibold text-slate-900'>{card.label}</h3>
                <div className='mt-3 text-3xl font-bold tracking-tight text-slate-900'>{card.value}</div>
                <p className='mt-2 text-sm text-slate-500'>Last 7 days</p>
              </div>
              <i className='fa-solid fa-ellipsis-vertical text-slate-400' />
            </div>

            <div className='mt-4 flex items-center gap-2 text-sm font-medium'>
              <span className={card.deltaTone}>{card.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-none'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex flex-wrap items-center gap-2 rounded-2xl bg-orange-100 p-1'>
            {tabs.map((tab, index) => {
              const active = activeTab === index
              return (
                <button
                  key={tab.label}
                  type='button'
                  onClick={() => setActiveTab(index)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-white text-orange-600 shadow-none' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {tab.label} {tab.suffix ? <span className='text-orange-500'>({tab.suffix})</span> : null}
                </button>
              )
            })}
          </div>

          <div className='flex items-center gap-2'>
            <label className='flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400'>
              <input
                type='text'
                placeholder='Search order report'
                className='w-56 bg-transparent outline-none placeholder:text-slate-400'
              />
              <i className='fa-solid fa-magnifying-glass ml-4 text-slate-500' />
            </label>
            <button className='flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50'>
              <i className='fa-solid fa-filter' />
            </button>
            <button className='flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50'>
              <i className='fa-solid fa-arrow-up-down' />
            </button>
            <button className='flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50'>
              <i className='fa-solid fa-ellipsis' />
            </button>
          </div>
        </div>

        <GenericTable
          columns={['No.', 'Order Id', 'Product', 'Date', 'Price', 'Payment', 'Status']}
          rows={displayRows}
          emptyMessage={'No orders found'}
          renderRow={(row) => (
            <tr key={row.id} className='border-t border-slate-200 text-slate-800 transition-colors hover:bg-orange-50/60'>
              <td className='px-5 py-4'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-5 w-5 items-center justify-center rounded-sm border border-orange-200 text-orange-400'>
                    <i className='fa-regular fa-square text-[11px]' />
                  </span>
                  <span>{row.index}</span>
                </div>
              </td>

              <td className='px-5 py-4 text-sm font-medium text-slate-900'>{row.orderId}</td>

              <td className='px-5 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-orange-500'>
                    <i className='fa-solid fa-bag-shopping text-sm' />
                  </div>
                  <span className='max-w-[220px] text-sm leading-tight'>{row.productName}</span>
                </div>
              </td>

              <td className='px-5 py-4 text-sm'>{row.date}</td>

              <td className='px-5 py-4 text-sm font-medium'>${row.price}</td>

              <td className='px-5 py-4'>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${row.payment === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                  <span className={`h-2 w-2 rounded-full ${row.payment === 'Paid' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  {row.payment}
                </span>
              </td>

              <td className='px-5 py-4'>
                {row.statusKey === 'delivered' ? (
                  <span className='inline-flex items-center gap-2 text-sm font-medium text-emerald-500'>
                    <i className='fa-regular fa-circle-check' /> Delivered
                  </span>
                ) : row.statusKey === 'paid' ? (
                  <span className='inline-flex items-center gap-2 text-sm font-medium text-orange-500'>
                    <i className='fa-regular fa-clock' /> Shipped
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-2 text-sm font-medium text-rose-500'>
                    <i className='fa-regular fa-circle-xmark' /> Pending
                  </span>
                )}
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

export default OrderDisplay
