import React from 'react'

const DeliveryAdddress = ({next}) => {
  return (
    <div className=' h-[400px] pl-4 pr-4 pt-2 ' id='box'>
        <form action="submit" className='grid grid-cols-2 gap-2 w-[80%]'>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="text" placeholder='Name'/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="phone" placeholder='Mobile Number'/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="text" placeholder='Pincode'/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="text" placeholder='Locality'/>
            <textarea className='border outline-0 resize-none h-30 w-132.5 indent-2' placeholder='Address' name="" id=""></textarea>
            <br/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="text" placeholder='City/Distice/Town'/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="text" placeholder='State'/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="text" placeholder='Landmark(Optional)'/>
            <input className='border rounded-[2px] h-11 w-65 outline-0 indent-2' type="phone" placeholder='Alternate Phone(Optional)'/>
            <div className='w-80 h-12 flex justify-between'>
            <button className='bg-black w-60 h-12 text-white font-medium hover:rounded-2xl cursor-pointer transition-all' type='submit'>SAVE AND DELIVER HERE</button>
            <button className='text-[14px] font-medium cursor-pointer' onClick={next}>CANCEL</button>
            </div>
        </form>
    </div>
  )
}

export default DeliveryAdddress
