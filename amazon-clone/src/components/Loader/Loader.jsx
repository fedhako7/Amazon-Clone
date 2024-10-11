import React from 'react'
import {HashLoader } from 'react-spinners'


function Loader() {
  return (
    <div
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh"
    }}
    >
        <HashLoader color='blue' />
    </div>
  )
}

export default Loader