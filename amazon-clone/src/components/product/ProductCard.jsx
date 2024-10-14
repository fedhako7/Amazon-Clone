import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../currencyFormat/CurrencyFormat';
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
import { dataContext } from '../../dataProvider/DataProvider';
import { Types } from '../../Utilities/action.types';

function ProductCard({ product, flex, productDesc, buttonInvisible }) {
    const [{ basket }, dispatch] = useContext(dataContext)

    const addToCart = (e) => {
        dispatch({ type: Types.ADD_TO_BASKET, item: product })
    }

    return (
        <div className={`${classes.card__container} ${flex && classes.product__flexed}`}>
            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt="" />
            </Link>
            <div>
                <h3>{product.title}</h3>
                {productDesc &&
                    <div
                        style={{ maxWidth: "750px" }}>
                        {product.description}
                    </div>}
                <div className={classes.rating}>
                    <Rating value={product?.rating?.rate} precision={0.2} />
                    <small>{product?.rating?.count}</small>

                </div>
                <div>
                    <CurrencyFormat amount={product.price} />
                </div>

                {(!buttonInvisible) &&
                    <button className={classes.button} onClick={() => { addToCart() }}>
                        Add to cart
                    </button>
                }
            </div>
        </div>
    )
}

export default ProductCard