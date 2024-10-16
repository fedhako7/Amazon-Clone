import { useContext, useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import CorouselEffect from './components/corousel/CorouselEffect'
import Category from './components/category/Category'
import Product from './components/product/Product'
import Routing from './Routing'
import { dataContext } from './dataProvider/DataProvider'
import { auth } from './Utilities/firebase'
import { Types } from './Utilities/action.types'

function App() {
  
  const [{user}, dispatch] = useContext(dataContext)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch({
          type: Types.SET_USER,
          user: authUser
        })
      }else{
        dispatch({
          type: Types.SET_USER,
          user: null
        })
      }
    })
  }, [])


  return (
    <>
      <Routing />
    </>
  )
}

export default App
