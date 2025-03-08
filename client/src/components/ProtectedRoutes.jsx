import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const role = localStorage.getItem("role");

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoutes;
