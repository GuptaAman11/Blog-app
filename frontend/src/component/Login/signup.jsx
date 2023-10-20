import React, { Component, useState } from 'react'
import '../../css/login.css'
import { toast } from 'react-toastify';



const Signup = () => {
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
               toast.success('user created');
               console.log(responseData)
               
           }
           else {
               toast.error(response.error)
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
    <div className="flip-card__back">
        <div className="title">Sign up</div>
        <form action="" className="flip-card__form" onSubmit={handleOnSumbit}>
            <input type="name" placeholder="Name" name="registerName" className="flip-card__input" onChange={handleInputChange} />
            <input type="email" placeholder="Email" name="registerEmail" className="flip-card__input" onChange={handleInputChange} />
            <input type="password" placeholder="Password" name="registerPassword" className="flip-card__input" onChange={handleInputChange} />
            <button className="flip-card__btn" type="submit">Confirm!</button>
        </form>
  </div>



  )
}

export default Signup
