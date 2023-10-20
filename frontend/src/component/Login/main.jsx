import React from 'react'
import Signup from './Signup'
import Login1 from './Login1'
import '../../css/login.css'


const Main = () => {
  return (
    <div>
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input className="toggle" type="checkbox" />
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
            <Login1 /> 
            <Signup /> 
          </div>
        </label>
      </div>
    </div>
  </div>

  )
}

export default Main
