import { useEffect, useState } from "react";
import "./MyOrdersPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Fetched orders:", data);

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
        setError("Failed to load orders.");
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setError("Something went wrong. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!Array.isArray(orders)) {
    return (
      <>
        <Navbar />
        <div className="my-orders-container">
          <h2>📦 My Orders</h2>
          <p>Something went wrong. Orders not available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="my-orders-container">
        <h2>📦 My Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul className="order-items-list">
                {Array.isArray(order.items) &&
                  order.items.map((item, idx) => (
                    <li key={idx} className="order-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{item.price * item.quantity}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
