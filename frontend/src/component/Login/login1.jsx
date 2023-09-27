import React, { useState } from 'react'
import '../../css/login.css'

const Login1 = () => {
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
             })
 
         })
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
        await login()
        console.log(loginData)
    }
        

    

  return (
 
        <div className="flip-card__front">
            <div className="title">Log in</div>
            <form action="" className="flip-card__form" onSubmit={handleOnSubmit} >
                <input type="email" placeholder="Email" name="loginEmail" className="flip-card__input" onChange={handleInputForm} />
                <input type="password" placeholder="Password" name="loginPassword" className="flip-card__input" onChange={handleInputForm} />
                <button className="flip-card__btn" type="submit">Let's go!</button>
          </form>
        </div>
      
    
  )
}

export default Login1
