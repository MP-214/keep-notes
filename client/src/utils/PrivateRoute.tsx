// components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const isAuthenticated = () => {
  // ✅ Replace with real check (e.g., check localStorage or cookie)
  return !!localStorage.getItem("token");
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
