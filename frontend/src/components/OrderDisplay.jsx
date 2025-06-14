import React from 'react'

const OrderDisplay = () => {
  return (
    <div className='w-full bg-red-200 mt-5'>
      <table className='w-full'>
        <thead>
            <tr className='border-b border-gray-500'>
                <th className='px-4 py-4'>OrderId</th>
                <th className='px-4 py-4'>Customer</th>
                <th className='px-4 py-4'>Status</th>
                <th className='px-4 py-4'>Total</th>
                <th className='px-4 py-4'>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="px-4 py-2">#12345</td>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">Shipped</td>
            <td className="px-4 py-2">$250.00</td>
            <td className="px-4 py-2">2025-06-14</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrderDisplay
