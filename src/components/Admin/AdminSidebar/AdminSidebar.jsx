import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../../../utils";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    handleSuccess("User Loggedout");
    // use navigate ON LOGIN after 1 sec.
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
        <li>
          <Link to="/admin/products">All Products</Link>
        </li>
        <li>
          <Link to="/admin/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/orders">Manage Orders</Link>
        </li>
        { <li><Link to="/">Go to Website</Link></li> }
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
