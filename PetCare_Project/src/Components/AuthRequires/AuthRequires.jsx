import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const AuthRequires = ({ allowedRoles, children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const tokenRoles = decodedToken.role;
        setRoles(Array.isArray(tokenRoles) ? tokenRoles : [tokenRoles]);
      } catch (error) {
        console.error("Invalid token", error);
        setRoles([]);
      }
    } else {
      setRoles([]);
    }
    setLoading(false); // Set loading to false after processing the token
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while processing the token
  }

  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  return hasAccess ? (
    children || <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRequires;
