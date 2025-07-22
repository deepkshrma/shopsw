import React from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";
import AdminSettingsForm from "../../../components/Admin/AdminSettingsForm/AdminSettingsForm"

function AdminSettingsPage() {
  return (
    <div className="admin-container" style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="admin-content" style={{ padding: "20px", flex: 1 }}>
        <AdminSettingsForm />
      </div>
    </div>
  );
}

export default AdminSettingsPage;
