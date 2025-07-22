import React from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar/AdminSidebar";
import ProductTable from "../../../components/Admin/ProductTable/ProductTable";


const Products = () => {
  return (
    <div className="admin-container" style={{ display: "flex" }}>
      <AdminSidebar />
      <div className="admin-content" style={{ padding: "60px", flex: 1 }}>
        <h2>All Products</h2>
        <ProductTable />
      </div>
    </div>
  );
};

export default Products;
