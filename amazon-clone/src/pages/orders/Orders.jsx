import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../components/layOut/LayOut'
import classes from './Orders.module.css'
import { dataContext } from '../../dataProvider/DataProvider'
import { db } from '../../Utilities/firebase'
import ProductCard from '../../components/product/ProductCard'

function Orders() {
  const [{ user }, dispatch] = useContext(dataContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        })
    } else {
      setOrders([])
    }

  }, [])

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {
            (!orders.length) &&
            <div>You don't have orders yet.</div>
          }
          <div>
            {
              orders?.map((order, idx) => {
                return (
                  <div key={idx}>
                    <hr />
                    <p>Order ID: <span>{order?.id}</span></p>
                      {
                        order?.data?.basket?.map((eachBasket) => {
                          return (<ProductCard
                            key={eachBasket.id}
                            product={eachBasket}
                            flex={true} 
                            buttonInvisible={true}/>)
                        })
                      }
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Orders