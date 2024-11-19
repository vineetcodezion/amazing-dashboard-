import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Layout from './Layouts/Layout';
import Orders from './Pages/Orders';
import InventoryPage from './Pages/InventoryPage';
import ProductsPage from './Pages/ProductsPage';
import ImageUploadPage from './Pages/ImageUploadPage';
import LoginPage from './Pages/LoginPage';
import { useDispatch } from 'react-redux';
import { verifyAuth } from './Features/auth/AuthSlice';
import PrivateRoute from './Components/PrivateRoutes'; // Import PrivateRoute
import ProtectedRoute from './Components/ProtectedRoutes'; // Import ProtectedRoute
import { useEffect } from 'react';
import CreateCategoryPage from './Pages/CreateCategoryPage';
import CreateSubcategoryPage from './Pages/CreateSubcategoryPage';
import PageManager from './Pages/ManagePages';
import BlogTabComponents from './Pages/BlogTabComponents';
import BlogDetailAdmin from './Pages/BlogDetailsPage';
import InvoiceSettings from './Pages/GstInfo';
import CustomerDetails from './Pages/CustomerDeatilsPage';
import CustomerList from './Pages/Customers';
import PaymentDashboard from './Pages/ManagePayments';
import CouponPage from './Pages/CouponPage';

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
        <Route
          path="/category-creation"
          element={
            <PrivateRoute>
              <Layout>
                <CreateCategoryPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-subcategory"
          element={
            <PrivateRoute>
              <Layout>
                <CreateSubcategoryPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-pages"
          element={
            <PrivateRoute>
              <Layout>
                <PageManager />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-blogs"
          element={
            <PrivateRoute>
              <Layout>
                <BlogTabComponents />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/blog-details/:id"
          element={
            <PrivateRoute>
              <Layout>
                <BlogDetailAdmin />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/gst-info"
          element={
            <PrivateRoute>
              <Layout>
                <InvoiceSettings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Layout>
                <CustomerList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/customer-details"
          element={
            <PrivateRoute>
              <Layout>
                <CustomerDetails />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-pays"
          element={
            <PrivateRoute>
              <Layout>
                <PaymentDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-discount"
          element={
            <PrivateRoute>
              <Layout>
                <CouponPage />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
