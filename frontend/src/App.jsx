import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Pages from './pages/Pages';
import OrderPage from './screens/OrderPage';
import Buypage from './screens/Buypage';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import Booking from './screens/Booking';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages/>}/>
        <Route path='/product/detail/:id' element={<OrderPage/>}/>
        <Route path='/product/cart/:id' element={<Buypage/>}/>
        <Route path='/admin/*' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/booking' element={<Booking/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
