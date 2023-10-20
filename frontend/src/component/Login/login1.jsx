<<<<<<< HEAD
import React, { useState } from 'react'
import '../../css/login.css'
import {NavLink,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';



const Login1 = () => {
    const [user,setUser] = useState("");
    const navigate = useNavigate()
    const [loginData , setloginData] = useState({
        loginEmail : "" , loginPassword:""
    })

    const login =async()=>{
       try {
         const response = await fetch(`http://localhost:8000/api/v1/users/login` ,{
             method : 'POST',
             headers : {
                 'Content-Type' : 'application/json'
             },
 
             body: JSON.stringify({
                 
                 email: loginData.loginEmail,
                 password: loginData.loginPassword,
             }),
 
         })
         const responseData = await response.json();
         if (response.ok) {
            await setUser(responseData)
             toast.success('user logged in sucessfully');
            console.log(user)
             localStorage.setItem('token',responseData.token)
         }
         else {
             toast.error("invalid password")
            console.log(response.error)
         }
      }
       
       catch (error) {
        console.log(error)
        
       }

    
        
        
    }



    const handleInputForm =(e)=> {

        const {name , value} = e.target ; 
        setloginData({
            ...loginData , 
            [name] : value
        })

        
    }
    const handleOnSubmit= async(e)=>{
        e.preventDefault();
        await login().then(()=>{
            navigate('/')
        })
        console.log(loginData)

    }
        

    

=======
import React from "react";
import './login.css'
import { NavLink } from "react-router-dom";

const Login1 = () => {
>>>>>>> fbab32117ade62e73e5e6e346cdf61e50514ee85
  return (
    <section className="sign-in">
      <div className="container mt-5">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-2578971-2147152.png" alt="Login pic" />
            </figure>
            <NavLink to="/Signup" className="signup-image-link">
              Create an Account
            </NavLink>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>
            <form className="register-form" id="register-form">
              <div className="form-group">
                <label html For="email">
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="off"
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="off"
                  placeholder="Your Password"
                />
              </div>

              <div className="form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login1;
