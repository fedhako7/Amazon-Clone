import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import CorouselEffect from './components/corousel/CorouselEffect'
import Category from './components/category/Category'

function App() {

  return (
    <>
    < Header />
    <CorouselEffect />
    < Category />
    </>
  )
}

export default App
