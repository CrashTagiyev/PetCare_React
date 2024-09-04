import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

const AuthRequires = ({ allowedRoles, children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const {user} = useAuth()
  useEffect(() => {
    if (user && user.roles) {
      try {
        setRoles(user.roles);
      } catch (error) {
        console.error("Invalid role", error);
        setRoles([]);
      }
    } else {
      setRoles([]);
    }
    setLoading(false); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const hasAccess = roles == allowedRoles;

  return hasAccess ? (
    children || <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRequires;
