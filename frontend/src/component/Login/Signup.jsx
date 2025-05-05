import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
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
            toast.success(responseData.message);
               
           }
           else {
            toast.error(responseData.message);
          }
        }
        catch(error){
           toast.error("Registration failed. Please try again.");
           console.error(error)
        }
     }
  
     const handleInputChange = (e) => {
  
  
  
        const { name, value } = e.target;
        setregisterFormData({
          ...registerFormData,
          [name]: value,
        });
      };
  
      const handleOnSubmit =async(e)=>{
  
        e.preventDefault()
        await register()
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 p-4">
        <div className="bg-purple-100 w-full max-w-4xl rounded-lg p-4 md:p-5">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Image container with overlay text */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="relative">
                        <img 
                            src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" 
                            alt="signup illustration" 
                            className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/50 to-transparent rounded-lg"></div>
                        <h1 className="absolute top-4 left-4 text-2xl sm:text-3xl font-bold text-white">
                            SignUp
                        </h1>
                    </div>
                </div>

                {/* Form container */}
                <div className="w-full lg:w-1/2">
                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <div>
                            <label 
                                htmlFor="Username" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Username
                            </label>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                name="registerName"
                                value={registerFormData.registerName}
                                onChange={handleInputChange} 
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                name="registerEmail"
                                value={registerFormData.registerEmail}
                                onChange={handleInputChange} 
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                name="registerPassword"
                                value={registerFormData.registerPassword}
                                onChange={handleInputChange} 
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Submit
                        </button>

                        <div className="text-center">
                            <Link 
                                to="/login" 
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                            >
                                Already have an account? Login here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}

export default Signup