import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import classes from './Header.module.css'

function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <CiMenuBurger />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader