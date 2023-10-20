<<<<<<< HEAD
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
=======
import React from 'react'

const Signup = () => {
>>>>>>> fbab32117ade62e73e5e6e346cdf61e50514ee85
  return (
    <div>
      
    </div>
  )
}

export default Signup


