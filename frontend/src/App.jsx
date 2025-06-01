import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Pages from './pages/Pages'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
