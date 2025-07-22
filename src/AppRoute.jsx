import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("role");

    
  // console.log("AdminRoute - token:", token);
  // console.log("AdminRoute - role:", role);
  
  if ( role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
