import React, { useContext, useState } from 'react'
import LayOut from '../../components/layOut/LayOut'
import classes from './Payment.module.css'
import { dataContext } from '../../dataProvider/DataProvider'
import ProductCard from '../../components/product//ProductCard'
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js'
import CurrencyFormat from '../../components/currencyFormat/CurrencyFormat'
import { axiosInstance } from '../../API/axios'
import { db } from '../../Utilities/firebase'
import { useNavigate } from 'react-router-dom'
import { Types } from '../../Utilities/action.types'
import { ClipLoader } from "react-spinners";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(dataContext)
  const totalItems = basket?.reduce((amount, item) => {
    return amount + item?.price
  }, 0)
  const totalPrice = basket?.reduce((amount, item) => {
    return amount + (item.price * item.amount)
  }, 0)
  const [cardError, setCardError] = useState('')
  const [paymentError, setPaymentError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const element = useElements()
  const navigate = useNavigate()

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError('')
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${totalPrice}`
      })
      const clientSecret = response.data?.clientSecret
      const { paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
          card: element.getElement(CardElement)
          }
        }
      )

      await db
      .collection('users')
      .doc(user.uid)
      .collection('orders')
      .doc(paymentIntent?.id)
      .set({
        basket: basket,
        amount:
        paymentIntent.amount,
        created: paymentIntent.created
      })
      dispatch({type: Types.EMPTY_BASKET})
      navigate("/orders", {state: {msg:"You have placed new order"}})
      setIsLoading(false)

    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      setPaymentError(error)
    }
  }


  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__header}>
        Checkout ({totalItems}) items
      </div>
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email.split('@')[0]}</div>
            <div>Caffe Arara</div>
            <div>Kello M.</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review product and delivery</h3>
          <div>
            {
              basket?.map((item, idx) => (
                <ProductCard product={item} key={idx} flex={true} buttonInvisible={true}/>
              ))
            }
          </div>
        </div>
        <hr />

        {/* card */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handleSubmit}>
                {cardError &&
                  <small style={{ color: 'red' }}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: 'flex', gap: '10px' }}>
                      <p> Total order </p> | <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  {
                    paymentError&&<small style={{color:'red'}}>{paymentError.message}</small>
                  }
                  <button type='submit'>
                    {
                      isLoading?
                      <>
                      <ClipLoader size={15}/>
                      Please Wait
                      </>:
                      <>
                      Pay Now
                      </>
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Payment

