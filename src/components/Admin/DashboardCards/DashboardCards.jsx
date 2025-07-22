import React, { useEffect, useState } from "react";
import "./DashboardCards.css";

const DashboardCards = () => {
  const [counts, setCounts] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("http://localhost:8080/admin/stats", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (data.success) {
          setCounts({
            products: data.products,
            users: data.users,
            orders: data.orders,
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    { title: "Total Products", value: counts.products, color: "#3498db" },
    { title: "Total Users", value: counts.users, color: "#2ecc71" },
    { title: "Total Orders", value: counts.orders, color: "#e67e22" },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div key={index} className="card" style={{ backgroundColor: card.color }}>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
