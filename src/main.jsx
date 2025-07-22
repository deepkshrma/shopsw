import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { SiteSettingsProvider } from "./context/SiteSettings/SiteSettingsContext.jsx";
import { CartProvider } from "./context/Cart/CartContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteSettingsProvider>
      <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
      </SearchProvider>
    </SiteSettingsProvider>
  </StrictMode>
);
