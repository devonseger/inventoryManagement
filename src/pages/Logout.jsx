import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token
    localStorage.removeItem('token');
    setAuthToken(null);
    // Redirect to the home page
    navigate('/');
  }, [navigate, setAuthToken]);

  return null; // Optionally, you can show a loading spinner or message here
};

export default Logout;