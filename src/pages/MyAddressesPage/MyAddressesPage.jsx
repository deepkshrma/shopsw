import { useEffect, useState } from "react";
import "./MyAddresses.css";
import Navbar from "../../components/Navbar/Navbar";

const MyAddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
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

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) setAddresses(data.addresses);
  };

  const deleteAddress = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/address/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

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
      setAddresses((prev) => [...prev, data.address]);
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
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
    <Navbar />
      <div className="my-addresses-container">
        
        <h2>📍 My Saved Addresses</h2>

        {addresses.length === 0 ? (
          <p>No addresses saved yet.</p>
        ) : (
          addresses.map((addr) => (
            <div key={addr._id} className="address-card">
              <p>
                <strong>{addr.fullName}</strong> — {addr.phone}
              </p>
              <p>
                {addr.line1}, {addr.line2 && `${addr.line2}, `}
                {addr.city}, {addr.state}, {addr.pincode}, {addr.country}
              </p>
              <button
                className="delete-btn"
                onClick={() => deleteAddress(addr._id)}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}

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
            <button type="submit" className="save-btn">
              📥 Save Address
            </button>
          </form>
        ) : (
          <button
            className="add-address-btn"
            onClick={() => setShowNewAddressInput(true)}
          >
            ➕ Add New Address
          </button>
        )}
      </div>
    </>
  );
};

export default MyAddressesPage;
