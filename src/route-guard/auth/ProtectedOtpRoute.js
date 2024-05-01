import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedOtpRoute = ({ element }) => {
  const mobile_no = localStorage.getItem("mobile_no");

  return mobile_no ? element : <Navigate to="/" replace={true} />;
};
