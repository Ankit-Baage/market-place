import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, ...rest }) => {
  const authToken = Cookies.get("authToken");
  return authToken ? <Outlet /> : <Navigate to="/" replace={true} />;
};
