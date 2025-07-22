// ProductCategory.jsx
import "./ProductCategory.css";
import Footer from "../Footer/Footer";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
import { useCart } from "../../context/Cart/CartContext";



const ProductCategory = ({ products }) => {
  const { addToCart } = useCart();
  const siteSettings = useSiteSettings();
  const gents = products.filter((p) => p.category === "gents");
  const women = products.filter((p) => p.category === "women");
  const child = products.filter((p) => p.category === "child");

  const renderProductCards = (productList) =>
    productList.map((product) => (
      <div key={product._id} className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    ));

  return (
    <div>
      <div className="landing-container">
        <h1 className="animated-gradient-text">
          {siteSettings?.heroText || "ShopSwift Clothes Collection"}
        </h1>

        <div className="product-section">
          <h2 id="gents">Gent's Collection</h2>
          <div className="product-grid">{renderProductCards(gents)}</div>

          <h2 id="women">Women's Collection</h2>
          <div className="product-grid">{renderProductCards(women)}</div>

          <h2 id="children">Childern's Collection</h2>
          <div className="product-grid">{renderProductCards(child)}</div>
        </div>
      </div>
      <a
        href="https://wa.me/916367007879?text=Hi%20there!%20I%20have%20a%20query"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          alt="Chat on WhatsApp"
        />
      </a>

      <Footer />
    </div>
  );
};

export default ProductCategory;
