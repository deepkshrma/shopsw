import React from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";
import AddProductForm from "../../../components/Admin/AddProductForm/AddProductForm";

const AddProduct = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content" style={{ padding: "60px", flex: 1 }}>
        <h1>Add Product</h1>
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProduct;
