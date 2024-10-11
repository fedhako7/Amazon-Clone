import React, { useEffect, useState } from 'react'
import classes from './Results.module.css';
import LayOut from '../../components/layOut/LayOut'
import ProductCard from '../../components/product/ProductCard';

import { productUrl } from '../../API/endPoints';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';



function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [])


  return (
    <LayOut>{
      isLoading ? (<Loader />) :
        (<section>
          <h1 style={{ padding: '30px' }}>Results</h1>
          <p style={{ padding: '30px' }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.products__container}>
            {results?.map((product) => {
              console.log(product);
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                />
              )
            })}
          </div>
        </section>)
    }
    </LayOut>
  )
}

export default Results