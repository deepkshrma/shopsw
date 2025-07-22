import React, { useEffect, useState } from "react";
import "./AdminOrdersPage.css";
import AdminSidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";

const AdminOrdersPage = () => {
  const [ordersByUser, setOrdersByUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const groupedOrders = Object.values(ordersByUser);
  const totalPages = Math.ceil(groupedOrders.length / ordersPerPage);

  const paginatedUsers = groupedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  useEffect(() => {
    fetch("http://localhost:8080/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const grouped = {};
          data.orders.forEach((order) => {
            const userId = order.user?._id || "unknown";
            if (!grouped[userId]) {
              grouped[userId] = {
                user: order.user,
                orders: [],
              };
            }
            grouped[userId].orders.push(order);
          });
          setOrdersByUser(grouped);
        }
      });
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-orders-container">
      <AdminSidebar />
      <div className="admin-orders-content">
        <h2>Manage Orders</h2>

        {paginatedUsers.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          paginatedUsers.map(({ user, orders }) => (
            <div className="user-section" key={user?._id}>
              <div className="user-info">
                <h3>{user?.name || "Unknown User"}</h3>
                <p>Email: {user?.email || "N/A"}</p>
              </div>

              {orders.map((order) => (
                <div className="order-card" key={order._id}>
                  <div className="order-header">
                    <span>Order #{order._id}</span>
                    <span>Status: <strong>{order.status}</strong></span>
                    <span>Total: ${order.totalAmount.toFixed(2)}</span>
                  </div>

                  {order.address && (
                    <div className="delivery-info">
                      <p><strong>Delivery Address:</strong></p>
                      <p>{order.address.fullName}</p>
                      <p>{order.address.line1}, {order.address.line2}</p>
                      <p>{order.address.city}, {order.address.state}, {order.address.pincode}</p>
                      <p>{order.address.country}</p>
                      <p>Phone: {order.address.phone}</p>
                    </div>
                  )}

                  <div className="items-list">
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index} className="order-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            width="50"
                            height="50"
                          />
                          <div>
                            <p>{item.name}</p>
                            <p>Qty: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
