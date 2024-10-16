import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Auth from './pages/auth/Auth'
import Payment from './pages/payment/Payment'
import Orders from './pages/orders/Orders'
import Carts from './pages/carts/Carts'
import Results from './pages/results/Results'
import ProductDetail from './pages/productDetail/ProductDetail'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/category/:categoryName' element={<Results />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/carts' element={<Carts />} />
      </Routes>
    </Router>
  )
}

export default Routing