import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSuccess.css";
import Navbar from "../../components/Navbar/Navbar";

const CheckoutSuccess = () => {
  return (
    <>
    <Navbar />
      <div className="checkout-success">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order is being processed.</p>
        <Link to="/" className="home-btn">
          Go to Homepage
        </Link>
      </div>
      
    </>
  );
};

export default CheckoutSuccess;
