import React from 'react'
import Homepage from '../screens/Homepage'
import PreviewScreen from '../screens/PreviewScreen'
import Navbar from '../components/Navbar'
import Footer from '../screens/Footer'
import OrderPage from '../screens/OrderPage'

const Pages = () => {
  return (
    <div className='w-screen flex flex-col justify-between'>
        <Navbar/>
        <Homepage/>
        <PreviewScreen/>
        <Footer/>
        {/* <OrderPage/> */}
    </div>
  )
}

export default Pages
