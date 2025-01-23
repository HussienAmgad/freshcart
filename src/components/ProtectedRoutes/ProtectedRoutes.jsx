import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    const navigate = useNavigate(); 
    if (localStorage.getItem("userToken")) {
        return children
    } else {
        return <Navigate to={"/"}/>
    }
}

