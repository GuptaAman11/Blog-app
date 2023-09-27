import React from 'react'
import Signup from './signup'
import Login1 from './login1'
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
            <Login1 /> {/* Render the Login component */}
            <Signup /> {/* Render the Register component */}
          </div>
        </label>
      </div>
    </div>
  </div>

  )
}

export default Main
