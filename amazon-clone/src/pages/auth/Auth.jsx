import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classes from './Auth.module.css'
import { auth } from "../../Utilities/firebase.js"
import {signInWithEmailAndPassword as SIGN, createUserWithEmailAndPassword as CREATE
} from 'firebase/auth'
import { dataContext } from "../../dataProvider/DataProvider"
import { Types } from "../../Utilities/action.types";
import { ClipLoader } from "react-spinners";


function SignUp() {
  const [{ user }, dispatch] = useContext(dataContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(
    {
      signIn: false,
      signUp: false
    }
  )
  const navigate = useNavigate()
  const navStateData = useLocation()


  const authHandler = async (e) => {
    e.preventDefault()
    if (e.target.name == 'signin') {
      setIsLoading({ ...isLoading, signIn: true })
      SIGN(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Types.SET_USER,
            user: userInfo.user
          })
          setIsLoading({ ...isLoading, signIn: false })
          navigate(navStateData?.state?.redirect || '/')


        }).catch((err) => {
          setError(err.message)
          console.log(err.message)
          setIsLoading({ ...isLoading, signIn: false })

        })

    } else {
      setIsLoading({ ...isLoading, signUp: true })
      CREATE(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Types.SET_USER,
            user: userInfo.user
          })
          setIsLoading({ ...isLoading, signUp: false })
          navigate(navStateData?.state?.direct || '/')
        }).catch((err) => {
          setError(err.message)
          console.log(err.message)
          setIsLoading({ ...isLoading, signUp: false })

        })

    }
  }



  return (
    <section className={classes.auth__container}>
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
          alt="" />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg &&
          <small style={{
            padding:'5px',
            textAlign: 'center',
            color:'red',
            fontWeight:'bold'
          }}>
            {navStateData.state.msg}
          </small>
        }
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="Email" id='email' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="Password" id='password' />
          </div>
          <button name='signin' type='submit' onClick={authHandler} className={classes.auth__signInButton}>
            {
              isLoading.signIn ? (<ClipLoader color='#000' size={15} />) : ('Sign In')
            }
          </button>

        </form>
        <p>By creating an account,
          you agree to AMAZON FAKE CLONE's Conditions
          of Use and Privacy Notice. </p>
        <button name='register' type='submit' onClick={authHandler} className={classes.auth__registerButton}>
          {
            isLoading.signUp ? (<ClipLoader color='#000' size={15} />) : ("Create your Amazon account")
          }
        </button>
        {error &&
          <small style={{ paddingTop: "5px", color: "red" }}>
            {error}
          </small>}
      </div>
    </section>
  )
}

export default SignUp