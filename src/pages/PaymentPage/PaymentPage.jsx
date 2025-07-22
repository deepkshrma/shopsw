import React, { useEffect, useState } from "react";
import { useCart } from "../../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./PaymentPage.css";


const PaymentPage = () => {
  const { cartItems ,checkout} = useCart();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const addrId = localStorage.getItem("selectedAddress");
    if (!addrId) return navigate("/checkout");

    setSelectedAddress(addrId);

    // Fetch address details from backend
    const fetchAddress = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const addr = data.addresses.find((a) => a._id === addrId);
        setAddressData(addr);
      }
    };
    fetchAddress();
  }, [navigate]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addressId: selectedAddress,
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: total,
        paymentMethod: selectedMethod,
      }),
    });

    const data = await res.json();
    if (data.success) {
      checkout();
      navigate("/CheckoutSuccess");
    } else {
      alert("❌ Failed to place order");
    }
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <h1>💳 Payment Summary</h1>

        <div className="payment-summary">
          <div className="address-box">
            <h3>📍 Delivery Address</h3>
            {addressData ? (
              <p>
                {addressData.fullName}, {addressData.phone}
                <br />
                {addressData.line1},{" "}
                {addressData.line2 && `${addressData.line2}, `}
                {addressData.city}, {addressData.state}, {addressData.pincode},{" "}
                {addressData.country}
              </p>
            ) : (
              <p className="loading">Loading address...</p>
            )}
          </div>

          <div className="product-list">
            <h3>🛒 Products</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <img src={item.image} alt={item.name} width="50" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="payment-method-box">
              <h3>💳 Select Payment Method</h3>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={selectedMethod === "card"}
                  onChange={() => setSelectedMethod("card")}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={selectedMethod === "upi"}
                  onChange={() => setSelectedMethod("upi")}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={selectedMethod === "cod"}
                  onChange={() => setSelectedMethod("cod")}
                />
                Cash on Delivery (COD)
              </label>
            </div>

            <div className="total-box">
              <strong>Total: ${total}</strong>
            </div>
          </div>

          <div className="payment-actions">
            <button
              className="cancel-btn"
              onClick={() => navigate("/CheckoutPage")}
            >
              Cancel
            </button>
            <button className="pay-btn" onClick={handlePayment}>
              ✅ Pay & Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
