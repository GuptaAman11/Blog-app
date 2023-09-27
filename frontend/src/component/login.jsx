import React, { Component, useState } from 'react'
import '../css/login.css'


const Login = () => {
   const [registerFormData, setregisterFormData] = useState({
      registerEmail:"" , registerName : ""  , registerPassword : ""
   })

   const register = async()=> {

      
  
      try {
         const response = await fetch(`http://localhost:8000/api/v1/users/register`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             } , 
             body: JSON.stringify({
               name: registerFormData.registerName,
               email: registerFormData.registerEmail,
               password: registerFormData.registerPassword,

           }),
         });
         const responseData = await response.json();
         
         if (response.ok) {
            //  toast.success('user created');
            console.log(responseData)
             
         }
         else {
            //  toast.error(response.error)
            console.log(response.error)
         }
      }
      catch(error){
         console.log(error)
      }
   }

   const handleInputChange = (e) => {



      const { name, value } = e.target;
      setregisterFormData({
        ...registerFormData,
        [name]: value,
      });
    };

    const handleOnSumbit =async(e)=>{

      e.preventDefault()
      await register()
      console.log(registerFormData)
    }
  return (
    <div>
      <div className="wrapper">
        <div className="card-switch">
            <label className="switch">
               <input className="toggle" type="checkbox" />
               <span className="slider"></span>
               <span className="card-side"></span>
               <div className="flip-card__inner">
                  <div className="flip-card__front">
                     <div className="title">Log in</div>
                     <form action="" className="flip-card__form">
                        <input type="email" placeholder="Email" name="email" className="flip-card__input"/>
                        <input type="password" placeholder="Password" name="password" className="flip-card__input"/>
                        <button className="flip-card__btn">Let`s go!</button>
                     </form>
                  </div>
                  <div className="flip-card__back">
                     <div className="title">Sign up</div>
                     <form action="" className="flip-card__form" onSubmit={handleOnSumbit}>
                        <input type="name" onChange={handleInputChange}  placeholder="Name" className="flip-card__input" name ="registerName" />
                        <input type="email"  onChange={handleInputChange} placeholder="Email" name="registerEmail" className="flip-card__input" />
                        <input type="password" onChange={handleInputChange} placeholder="Password" name="registerPassword" className="flip-card__input"/>
                        <button className="flip-card__btn" type='submit'>Confirm!</button>
                     </form>
                  </div>
               </div>
            </label>
        </div>   
   </div>
      
    </div>
  )
}



export default Login 


