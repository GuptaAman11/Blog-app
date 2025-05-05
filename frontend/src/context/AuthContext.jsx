// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userinfo, setUserinfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem('token');
  console.log("auth context is called")
  useEffect(() => {
    try {
      if (authToken) {
        const decodedUser = jwtDecode(authToken);
        setUserinfo(decodedUser.user);
        console.log("auth is printing" , userinfo)
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setUserinfo(null);
    } finally {
      setLoading(false); // Stop loading once done
    }
  },[authToken]);

  return (
    <AuthContext.Provider value={{ userinfo, setUserinfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useInfoSupplier = () => useContext(AuthContext);
