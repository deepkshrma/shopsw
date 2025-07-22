import React from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";
import DashboardCards from "../../../components/Admin/DashboardCards/DashboardCards";

const Dashboard = () => {
  return (
    <div className="admin-container" style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="admin-content" style={{ padding: "60px", flex: 1 }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin 👋</p>
        <DashboardCards />
      </div>
    </div>
  );
};

export default Dashboard;
