import React, { useState , useEffect} from 'react';
import '../../css/login.css';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Auth = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });
    useEffect(() => {
        if (location.pathname === "/login") {
            setIsLogin(true);
        } else if (location.pathname === "/signup") {
            setIsLogin(false);
        }
      }, [location]);
    
      return null; // This component doesn't render anything to the UI
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(isLogin ? {
                    email: formData.email,
                    password: formData.password,
                } : {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const responseData = await response.json();
            
            if (response.ok) {
                toast.success(responseData.msg);
            } else {
                toast.error(responseData.msg);
            }
        } catch (error) {
            toast.error(`${isLogin ? "Login" : "Registration"} failed. Please try again.`);
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-700 p-4">
            <div className="bg-purple-100 w-full max-w-4xl rounded-lg p-4 md:p-5">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image section */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative">
                            <img 
                                src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" 
                                alt="auth illustration" 
                                className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/50 to-transparent rounded-lg"></div>
                            <h1 className="absolute top-4 left-4 text-2xl sm:text-3xl font-bold text-white">
                                {isLogin ? 'Login' : 'SignUp'}
                            </h1>
                        </div>
                    </div>

                    {/* Form section */}
                    <div className="w-full lg:w-1/2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input 
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            )}

                            {/* Email and Password fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                >
                                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth; 