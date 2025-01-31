import React from 'react'
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const MainAdminRoute = () => {
    const { user } = useSelector((state) => state.auth);

    const navigate=useNavigate();
    
    useEffect(() => {
        if ( !user?.isAdmin || Object.keys(user).length === 0) {
        
          navigate("/");
        }
      }, [user, navigate]);
    
     
      return (user?.isAdmin )  && Object.keys(user).length > 0 ? <Outlet /> : null;
    
    
}

export default MainAdminRoute;
