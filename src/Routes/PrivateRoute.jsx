import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }) => {
  console.log(isAuthenticated, children);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
