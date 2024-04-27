import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

const Authe = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication token when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        // If authenticated, render the child routes
        <Outlet />
      ) : (
        // If not authenticated, navigate to the login page
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Authe ;
