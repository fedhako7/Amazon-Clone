import React from 'react'
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Auth from './pages/auth/Auth'
import Payment from './pages/payment/Payment'
import Orders from './pages/orders/Orders'
import Carts from './pages/carts/Carts'
import Results from './pages/results/Results'
import ProductDetail from './pages/productDetail/ProductDetail'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './protectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51QAoCKJwczfAi1g9Jc306r9MWtigOaps6vehlkfeB4AJNwET8vxaqPQoUs4ys2GheCwV7qkB9XN1RewXsmiXmhos00iJJzEatj');
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />

        <Route path='/payment' element={
          <ProtectedRoute msg={'You must login to pay'} redirect={'/payment'}>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
          } />
        <Route path='/orders' element={
          <ProtectedRoute msg={'Login to access your orders'} redirect={'/orders'}>
            <Elements stripe={stripePromise}>
              <Orders />
            </Elements>
          </ProtectedRoute>
          } />
        <Route path='/category/:categoryName' element={<Results />} />
        <Route path='/products/:productId' element={<ProductDetail />}/>
        <Route path='/carts' element={<Carts />} />
      </Routes>
    </Router>
  )
}

export default Routing