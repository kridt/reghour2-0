import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};
