import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Layout from "./Layouts/Layout";
import Orders from "./Pages/Orders";
import InventoryPage from "./Pages/InventoryPage";
import ProductsPage from "./Pages/ProductsPage";
import ImageUploadPage from "./Pages/ImageUploadPage";
import LoginPage from "./Pages/LoginPage";
import { useDispatch } from "react-redux";
import { verifyAuth } from "./Features/auth/AuthSlice";
import PrivateRoute from "./Components/PrivateRoutes"; // Import PrivateRoute
import ProtectedRoute from "./Components/ProtectedRoutes"; // Import ProtectedRoute
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Verify authentication on initial load
    dispatch(verifyAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Protect the login route */}
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Homepage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Layout>
                <Orders />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Layout>
                <InventoryPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Layout>
                <ProductsPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <PrivateRoute>
              <Layout>
                <ImageUploadPage />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;