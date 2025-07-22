import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import AdminRoute from "./AppRoute";

// admin Route
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Products from "./pages/Admin/Products/Products";
import AddProduct from "./pages/Admin/AddProduct/AddProduct";
import Users from "./pages/Admin/Users/Users";
import AdminSettingsPage from "./pages/Admin/AdminSettingsPage/AdminSettingsPage";
import AdminOrdersPage from "./pages/Admin/AdminOrderPage/AdminOrderPage";

// users Route
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Aboutus from "./pages/Aboutus/Aboutus";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import CartPage from "./context/Cart/Cart";
import PageNotFound from "./pages/404-ERROR/PageNotFound";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess";
import MyAddressesPage from "./pages/MyAddressesPage/MyAddressesPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/CheckoutSuccess" element={<CheckoutSuccess />} />
        <Route path="/MyAddressesPage" element={<MyAddressesPage />} />
        <Route path="/MyOrdersPage" element={<MyOrdersPage />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Route   */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrdersPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
