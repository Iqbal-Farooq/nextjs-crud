'use client';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/components/Auth';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authToken, loading,email} = useContext(AuthContext);
  useEffect(() => {
    if (!loading && !authToken && !['/login', '/register'].includes(pathname)) {
      router.replace('/login');
    }else if(!loading && authToken &&['/login','/register'].includes(pathname)){
      router.replace('/');
    }
  }, [authToken, loading, pathname, router]);

  if (loading) {
    return <div className='flex h-screen w-full justify-center items-center'>Verifying...</div>; 
  }

  if (!authToken && !['/login', '/register'].includes(pathname)) {
    return null; 
  }

  return (
    <>
      {authToken && <Navbar />}
      {children}
    </>
  );
};

export default ProtectedRoute;
