import React from 'react'
import "./Loading.scss"
export default function Loading() {
  return (
    <>
      <div id='spinner'>
          <div className="spinner-container">
            <p style={{marginLeft:"-28px",color:"#000",fontSize:"25px"}}>Loading...</p>
            <div class="loading-spinner">
          </div>
          </div>
      </div>
    </>
    
  )
}
