'use client';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const[email,setEmail]=useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email=localStorage.getItem('email');
    setAuthToken(token);
    setEmail(email)
    setLoading(false);
  }, []);
  const logout=()=>{
    localStorage.removeItem('authToken')
    localStorage.removeItem('email')
    setAuthToken(null)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, loading,logout,email,setEmail}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
