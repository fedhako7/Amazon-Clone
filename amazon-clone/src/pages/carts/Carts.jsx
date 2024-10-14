import React, { useContext } from 'react'
import LayOut from '../../components/layOut/LayOut'
import { dataContext } from '../../dataProvider/DataProvider'
import ProductCard from '../../components/product/ProductCard'
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from './Carts.module.css'
import { Types } from '../../Utilities/action.types'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";




function Carts() {
  const [{ basket, user }, dispatch] = useContext(dataContext)

  const total = basket?.reduce((amount, item) => {
    return item?.price * item?.amount + amount
  }, 0)

  const increment = (item) => {
    dispatch({
      type: Types.ADD_TO_BASKET,
      item
    })
  }

  const deacrement = (itemId) => {
    dispatch({
      type: Types.REMOVE_FROM_BASKET,
      itemId
    })
  }



  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket </h3>

          <hr />

          {
            basket?.length === 0 ? (<p>Opps ! No item</p>) : (
              basket?.map((item, i) => {
                return (
                  <section className={classes.cart__product}>
                    <ProductCard
                      product={item}
                      key={i}
                      productDesc={true}
                      flex={true}
                      buttonInvisible={true}
                    />
                    <div className={classes.buttons}>
                      <button className={classes.btn} onClick={() => { increment(item) }}>
                        <IoIosArrowUp size={20} />
                      </button>
                      <span>{item.amount}</span>
                      <button className={classes.btn} onClick={() => { deacrement(item.id) }}>
                        <IoIosArrowDown size={20} />
                      </button>
                    </div>
                  </section>
                )
              })
            )
          }
        </div>

        {basket?.length !== 0 &&
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} item)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to='/payment'>Continue to checkout</Link>
          </div>

        }
      </section>
    </LayOut>
  )
}

export default Carts