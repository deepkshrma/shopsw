import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, popup } from "../../utils";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/cart", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ fix here
        },
      });

      const data = await res.json();
      if (data.success) {
        setCartItems(data.cart);
      } else {
        console.warn("Fetch cart failed:", data.message || data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Add to cart failed:", data.message || data);
      } else {
        popup("Item added");
        await fetchCart(); // ✅ update UI
      }
    } catch (err) {
      console.error("Add to cart error:", err.message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      // console.log("🛠️ Sending PUT with token:", token);

      const res = await fetch(
        `http://localhost:8080/cart/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      const data = await res.json();
      // console.log("🛠️ Response:", data);

      fetchCart();
    } catch (err) {
      console.error("❌ updateQuantity error:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      // console.log("🧹 Sending DELETE with token:", token);

      const res = await fetch(
        `http://localhost:8080/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      // console.log("🧹 Response:", data);

      if (data.success) {
        // 👇 Update UI immediately without needing full refetch
        setCartItems((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
      }
    } catch (err) {
      handleError("❌ removeItem error:");
    }
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/cart/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Checkout failed:", data.message || data);
        return false;
      }

      // Empty cart
      setCartItems([]);

      return true;
    } catch (err) {
      console.error("Checkout error:", err);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
