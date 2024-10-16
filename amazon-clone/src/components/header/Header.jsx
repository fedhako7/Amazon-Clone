import React, { useContext } from 'react'
import classes from './Header.module.css'
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { dataContext } from '../../dataProvider/DataProvider';
import { auth } from '../../Utilities/firebase';


function Header() {
    const [{ user, basket }, dispatch] = useContext(dataContext)
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)

    return (
        <>
            <section className={classes.fixed}>
                <section>
                    <div className={classes.header__container}>
                        {/* Logo logo__container */}
                        <div className={classes.logo__container}>
                            <Link to="/">
                                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
                            </Link>
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
                            <FaSearch size={28}/>
                        </div>
                        {/* order */}
                        <div className={classes.order__container}>
                            <div className={classes.language}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6RfPYR75HnUJnGVpWQJ8u_6XMCuPBUgFRCLQsWwgutF3v9BrvN4czQsSuA&s" alt="" />
                                <select name="" id="">
                                    <option value="">EN</option>
                                </select>
                            </div>
                            <Link to={!user && "/auth"}>
                                {user ? <>
                                    <p>Hello, {user.email.split("@")[0]}</p>
                                    <span onClick={() => auth.signOut()}>Sign Out</span></> :
                                    <>
                                        <p>Hello, Sign In</p>
                                        <span>Account and Lists</span>
                                    </>
                                }
                            </Link>
                            <Link to="/orders">
                                <p>Return</p>
                                <span>& Orders</span>
                            </Link>
                            <Link to="/carts" className={classes.cart}>
                                <BsCart3 size={35} />
                                <span>{totalItem}</span>
                            </Link>
                        </div>
                    </div>
                </section>
                <LowerHeader />
            </section>
        </>
    )
}

export default Header