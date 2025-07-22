import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler( { setIsAuthenticated }) {
    const location = useLocation(); 
    const Navigate = useNavigate(); 

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup')
            {
                Navigate('/home' , {replace: false});
            }
        }
    }, [location,Navigate, setIsAuthenticated])

  return (
    null
  )
}

export default RefreshHandler