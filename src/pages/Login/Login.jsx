import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";

function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const settings = useSiteSettings();
  const Navigate = useNavigate(); // after login navigate to home
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log('logininfo ->', logininfo);

  const handleLogin = async (e) => {
    e.preventDefault(); // refresh ko rokne ke liye
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError(" email and password are required !");
    }

    //api call
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });
      const result = await response.json();

      // redirect to home page if success
      const { success, message, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", result.role);

        setTimeout(() => {
          if (result.role === "admin") {
            Navigate("/admin/dashboard"); // Redirect admin
          } else {
            Navigate("/home"); // Redirect user
          }
        }, 1000);
      } else if (!response.ok || !success) {
        console.error("Login failed:", result);
        const errorMessage =
          result?.error?.details?.[0]?.message || "Login failed!";
        handleError(errorMessage);
        return;
      }

     
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-image">
            {settings?.loginImage && (
              <img
                src={`http://localhost:8080${settings.loginImage}`}
                alt="Login"
              />
            )}
          </div>
          <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter Your Email..."
                  autoComplete="username"
                  value={LoginInfo.email}
                />
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter Your Password..."
                  autoComplete="current-password"
                  value={LoginInfo.password}
                />
              </div>
              <button type="submit">Login</button>
              <span>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
