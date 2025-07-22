import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { handleSuccess } from "../../utils";
import "./Navbar.css";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
import { useSearch } from "../../context/SearchContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const siteSettings = useSiteSettings();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [role, setRole] = useState("");
  const { searchTerm, setSearchTerm } = useSearch();

  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    handleSuccess("User Logged out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/">
        {siteSettings?.siteName || "ShopSwift"}
      </Link>
      <ul className="navbar-links">
        {isHomePage && (
          <div className="search-filter-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {isLoggedIn && (
          <li className="user-dropdown" ref={dropdownRef}>
            <span
              className="user-name"
              onClick={() => setShowDropdown((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              Welcome, {loggedInUser}
            </span>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li onClick={() => navigate("/MyAddressesPage")}>📍Address</li>
                <li onClick={() => navigate("/MyOrdersPage")}>📦 Orders</li>
                <li onClick={handleLogout}>🚪 Logout</li>
              </ul>
            )}
          </li>
        )}

        <li>
          <Link to="/">Home</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to="/cart">🛒 Cart</Link>
          </li>
        )}

        <li>
          <Link to="/Aboutus">About</Link>
        </li>

        {!isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
