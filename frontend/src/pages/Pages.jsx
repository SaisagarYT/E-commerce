import React from 'react'
import Homepage from '../screens/Homepage'
import PreviewScreen from '../screens/PreviewScreen'
import Navbar from '../components/Navbar'
import Footer from '../screens/Footer'

const Pages = () => {
  return (
    <div className='w-screen'>
        <Navbar/>
        <Homepage/>
        <PreviewScreen/>
        <Footer/>
    </div>
  )
}

export default Pages
