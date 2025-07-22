import React, { useEffect, useState } from "react";
import "./ProductTable.css";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    fetch("http://localhost:8080/products", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Handle delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8080/products/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProducts(products.filter((product) => product._id !== id));
          }
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  // Handle opening edit modal
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditedData({ ...product });
    setImageFile(null);
  };

  // Handle updating product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editedData.name);
    formData.append("category", editedData.category);
    formData.append("price", editedData.price);
    formData.append("stock", editedData.stock);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`http://localhost:8080/products/update/${editProduct._id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      alert("✅ Product updated successfully!");
      setEditProduct(null);
      // Refresh list
      const refreshed = await fetch("http://localhost:8080/products", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const refreshedData = await refreshed.json();
      setProducts(refreshedData.products);
    } else {
      alert("❌ Update failed");
    }
  };

  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="editbtn" onClick={() => handleEdit(product)}>Edit</button>
                <button className="deletebtn"
                  onClick={() => handleDelete(product._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editProduct && (
        <div className="modal">
          <form className="edit-form" onSubmit={handleUpdate}>
            <h3>Edit Product</h3>
            <input
              type="text"
              value={editedData.name}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
              placeholder="Name"
              required
            />
            <select
              value={editedData.category}
              onChange={(e) =>
                setEditedData({ ...editedData, category: e.target.value })
              }
            >
              <option value="gents">Gents</option>
              <option value="women">Women</option>
              <option value="child">Child</option>
            </select>
            <input
              type="number"
              value={editedData.price}
              onChange={(e) =>
                setEditedData({ ...editedData, price: e.target.value })
              }
              placeholder="Price"
              required
            />
            <input
              type="number"
              value={editedData.stock}
              onChange={(e) =>
                setEditedData({ ...editedData, stock: e.target.value })
              }
              placeholder="Stock"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <div>
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProductTable;
