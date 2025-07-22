import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../utils";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
import { useSearch } from "../../context/SearchContext";

function Home() {
  const settings = useSiteSettings();
  const [products, setProducts] = useState([]);
  const { searchTerm } = useSearch();

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      const result = await response.json();

      if (result.success) {
        setProducts(result.products);
      } else {
        console.log("No products found or unauthorized");
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <h1> Shopswift demo line</h1>
      <div>
        <div className="home-banner">
          {settings?.heroImage && (
            <img
              src={`http://localhost:8080${settings.heroImage}`}
              alt="Hero"
              style={{ width: "100%", height: "75vh", objectFit: "fill" }}
            />
          )}
        </div>

        <ProductCategory products={filteredProducts} />

        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
