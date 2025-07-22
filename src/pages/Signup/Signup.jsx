import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import "./Signup.css";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
import Navbar from "../../components/Navbar/Navbar";

function Signup() {
  const settings = useSiteSettings();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required!");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message } = result;

      if (response.ok && success) {
        handleSuccess(message);
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      } else {
        // Display Joi or custom server error
        const errorMessage =
          result?.error?.details?.[0]?.message || // Joi error
          result?.message || // General server error
          "Signup failed!";

        console.error("Signup failed:", result);
        handleError(errorMessage);
      }
    } catch (error) {
      handleError("Something went wrong! Please try again.");
      console.error("Signup error:", error.message);
    }
  };

  return (
    <>
    <Navbar />
      <div className="signup-wrapper">
        <div className="signup-container">
          <div className="signup-image">
             {settings?.loginImage && (
              <img
                src={`http://localhost:8080${settings.loginImage}`}
                alt="signup"
              />
            )}
            </div>
          <div className="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  autoFocus
                  autoComplete="name"
                  placeholder="Enter Your Name..."
                  value={signupInfo.name}
                />
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter Your Email..."
                  value={signupInfo.email}
                />
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Enter Your Password..."
                  value={signupInfo.password}
                />
              </div>

              <button type="submit">Sign Up</button>
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
