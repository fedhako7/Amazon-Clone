import React, { useContext, useEffect } from 'react'
import { dataContext } from '../dataProvider/DataProvider'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute({children, msg, redirect}) {
    const navigate = useNavigate()
    const [{user}, dispatch] = useContext(dataContext)
    useEffect(()=>{
        if(!user){
            navigate('/auth', {state: {msg, redirect}})
        }

    }, [user])
  return( 
    children
)
  
}

export default ProtectedRoute