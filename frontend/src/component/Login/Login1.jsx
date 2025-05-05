import React, { useState } from 'react'
import {Link, NavLink,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const Login1 = () => {
    const [user,setUser] = useState("");
    const navigate = useNavigate()
    const [loginData , setloginData] = useState({
        loginEmail : "" , loginPassword:""
    })

    const login =async()=>{
       try {
         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/login` ,{
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
            setUser(responseData)
            localStorage.setItem('token', responseData.token)
            toast.success('User logged in successfully')
            navigate('/home')
         }
         else {
             toast.error(responseData.message)
         }
      }
       
       catch (error) {
        console.log(error)
        toast.error(error.message || 'An error occurred during login')
        
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
        

    }
        

    

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 p-4">
      <div className="bg-purple-100 w-full max-w-4xl rounded-lg p-4 md:p-5 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <div className="relative">
            <img 
              src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" 
              alt="login illustration" 
              className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/50 to-transparent rounded-lg"></div>
            <h1 className="absolute top-4 left-4 text-2xl sm:text-3xl font-bold text-white">
              Login
            </h1>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-4">
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="text" 
                placeholder="Email" 
                name="loginEmail" 
                onChange={handleInputForm} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input 
                type="password" 
                placeholder="Password" 
                name="loginPassword" 
                onChange={handleInputForm} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Login
            </button>

            <div className="text-center">
              <Link 
                to="/signup" 
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >
                Not a member? Click here for Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login1