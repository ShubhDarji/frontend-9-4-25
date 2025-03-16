import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("sellerToken");

  return token ? <Outlet /> : <Navigate to="/seller/login" />;
};

export default ProtectedRoute;
