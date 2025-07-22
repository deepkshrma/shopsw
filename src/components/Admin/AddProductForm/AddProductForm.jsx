import React, { useState } from "react";
import "./AddProductForm.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";


const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "gents",
    price: "",
    stock: "",
    image: null,
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("image", image); // for multer

      const response = await fetch("http://localhost:8080/products/add", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess("Product added successfully!");
      } else {
        handleError("Failed to add product.");
      }
    } catch (error) {
      console.error("Add product error:", error);
      handleError("Server error.");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
      />
      <select name="category" onChange={handleChange}>
        <option value="gents">Gents</option>
        <option value="women">Women</option>
        <option value="child">Child</option>
      </select>
      <input
        name="price"
        placeholder="Price ₹"
        type="number"
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        placeholder="Stock"
        type="number"
        onChange={handleChange}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">Add Product</button>
      <p>{message}</p>
      <ToastContainer />
    </form>
  );
};

export default AddProductForm;
