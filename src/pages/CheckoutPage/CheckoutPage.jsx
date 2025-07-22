import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart/CartContext";
import Navbar from "../../components/Navbar/Navbar";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressInput, setShowNewAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setAddresses(data.addresses);
    };
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAddress),
    });
    const data = await res.json();
    if (data.success) {
      setShowNewAddressInput(false);
      setNewAddress({
        fullName: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
      });
      setAddresses((prev) => [...prev, data.address]);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) return alert("Please select an address");
    localStorage.setItem("selectedAddress", selectedAddress);
    navigate("/PaymentPage");
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1>📦 Select Delivery Address</h1>

        <div className="address-list">
          {addresses.map((addr) => (
            <label key={addr._id} className="address-card">
              <input
                type="radio"
                name="address"
                value={addr._id}
                checked={selectedAddress === addr._id}
                onChange={() => setSelectedAddress(addr._id)}
              />
              <div className="address-details">
                <p>
                  {addr.line1}, {addr.line2}
                </p>
                <p>
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p>{addr.country}</p>
                <p>📞 {addr.phone}</p>
              </div>
            </label>
          ))}
        </div>

        {showNewAddressInput ? (
          <form onSubmit={handleAddAddress} className="new-address-form">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={newAddress.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="line1"
              placeholder="Address Line 1"
              value={newAddress.line1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="line2"
              placeholder="Address Line 2"
              value={newAddress.line2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={newAddress.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={newAddress.country}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={handleChange}
              required
            />
            <button type="submit">📥 Save Address</button>
          </form>
        ) : (
          <button
            className="add-address-btn"
            onClick={() => setShowNewAddressInput(true)}
          >
            ➕ Add New Address
          </button>
        )}

        <div className="checkout-actions">
          <button onClick={() => navigate("/cart")} className="go-back-cart">
            🔙 Back to Cart
          </button>
          <button onClick={handleProceedToPayment} className="proceed-btn">
            💳 Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
