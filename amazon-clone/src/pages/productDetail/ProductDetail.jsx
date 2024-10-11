import React, { useEffect, useState } from 'react'
import LayOut from '../../components/layOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../API/endPoints';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res) => {
      console.log(res.data);
      setIsLoading(false)
      setProduct(res.data);
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  }, [])

  return (
    <LayOut>
        {
          isLoading?(<Loader/>):
          (<div>
            <ProductCard 
            product={product}
            flex={true}
            productDesc={true}
            />
          </div>)
        }
    </LayOut>
  )
}

export default ProductDetail









