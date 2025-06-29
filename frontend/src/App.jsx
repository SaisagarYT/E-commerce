import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Pages from './pages/Pages';
import OrderPage from './screens/OrderPage';
import Buypage from './screens/Buypage';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';
import Booking from './screens/Booking';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Admin from './Adminroute.jsx/Admin';
import Profile from './screens/Profile';
import NewArrivels from './screens/NewArrivels';
import TopSelling from './screens/TopSelling';
import OnSale from './OnSale';
import Shop from './screens/Shop';

const App = () => {
  return (
    <div className='overflow-hidden'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages/>}/>
        <Route path='/product/detail/:id' element={<OrderPage/>}/>
        <Route path='/product/cart/:id' element={<Buypage/>}/>
        <Route path='/admin/*' element={<Admin><PrivateRoute>
          <Dashboard/>
        </PrivateRoute></Admin>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/booking' element={<PrivateRoute><Booking/></PrivateRoute>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/newarrivel' element={<NewArrivels/>}/>
        <Route path='/topselling' element={<TopSelling/>}/>
        <Route path='/onsale' element={<OnSale/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
