import React from 'react'

const PaymentOptions = ({prev}) => {
  return (
     <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Payment Options</h2>
      <div className='flex flex-col gap-4'>
        <label>
          <input type="radio" name="payment" value="paypal" /> PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="cod" /> Cash on Delivery
        </label>
      </div>
      <div className='mt-6'>
        <button className='border px-4 py-2 mr-2 cursor-pointer' onClick={prev}>Back</button>
        <button className='bg-black text-white px-4 py-2 cursor-pointer'>Place Order</button>
      </div>
    </div>
  )
}

export default PaymentOptions
