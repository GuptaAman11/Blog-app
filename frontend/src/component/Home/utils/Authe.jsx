import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Authe = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    setIsAuthenticated(!!authToken); // Set to true if token exists
    setLoading(false); // Stop loading once authentication status is determined
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Authe;
