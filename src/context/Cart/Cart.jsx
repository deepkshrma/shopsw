import React from "react";
import { useCart } from "../../context/Cart/CartContext";
import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    navigate("/CheckoutPage");
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h2> 🛒 Cart Item</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">
            Your cart is empty.
            <br />
            Go for shopping 👻👻
            <br />
            <button className="go-back-btn1" onClick={() => navigate("/")}>
              Go Back
            </button>
          </p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <img src={`${item.image}`} alt={item.name} width="50" />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="qty-control">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity > 1 ? item.quantity - 1 : 1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => removeItem(item.productId)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <button className="go-back-btn" onClick={() => navigate("/")}>
                Go Back
              </button>
              <div className="checkoutdetail">
                <h3>Total: ${total}</h3>
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
