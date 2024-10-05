import React from 'react'
import classes from './Header.module.css'
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import LowerHeader from './LowerHeader';


function Header() {
  return (
    <>
    <section>
        <div className={classes.header__container}>
            {/* Logo logo__container */}
            <div className={classes.logo__container}>
                <a href="">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
                </a>
                <div className={classes.delivery}>
                    <span>
                        <CiLocationOn />
                    </span>
                    <div>
                        <p>Deliver to</p>
                        <span>Ethiopia</span>
                    </div>
                </div>
            </div>
            {/* search container */}
            <div className={classes.search}> 
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" placeholder='Search product' />
                <FaSearch />
            </div>
            {/* order */}
            <div className={classes.order__container}>
                <div className={classes.language}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6RfPYR75HnUJnGVpWQJ8u_6XMCuPBUgFRCLQsWwgutF3v9BrvN4czQsSuA&s" alt="" />
                    <select name="" id="">
                        <option value="">EN</option>
                    </select>
                </div>
                <a href="">
                    <p>Sign In</p>
                    <span>Account and Lists</span>
                </a>
                <a href="">
                    <p>Return</p>
                    <span>& Orders</span>
                </a>
                <a href="" className={classes.cart}>
                    <BsCart3 size={35}/>
                    <span>0</span>
                </a>
            </div>
        </div>
    </section>
    <LowerHeader/>

    
    
    </>
  )
}

export default Header