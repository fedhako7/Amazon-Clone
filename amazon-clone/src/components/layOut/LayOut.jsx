import React from 'react'
import Header from '../header/Header';

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}

    </div>
  )
}

export default LayOut