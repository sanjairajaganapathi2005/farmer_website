import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');

    if (loginTime) {
      const parsedLoginTime = Number(loginTime);
      const timeElapsed = Date.now() - parsedLoginTime;

      if (timeElapsed > 43200000) { // 12 hours in milliseconds
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        setIsAuthenticated(false);  // Trigger re-render
        navigate('/login');
      }
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
