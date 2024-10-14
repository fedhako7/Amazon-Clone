import React from 'react'
import LayOut from '../../components/layOut/LayOut'
import Category from '../../components/category/Category'
import Product from '../../components/product/Product'
import CorouselEffect from '../../components/corousel/CorouselEffect'

function Landing() {
  return (
    <LayOut>
      <CorouselEffect />
      <Category />
      <Product />
    </LayOut>
  )
}

export default Landing