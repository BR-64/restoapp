import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';

// import Navbar from './nav/Navbar';
import AddProductForm from './Admin/AddProductPage.jsx';
import ProductListPage from './Customer/ProductList.jsx';
import AdminPage from './Admin/AdminPage.jsx';
import HomePage from './HomePage.jsx';
import NavbarRes from './nav/NavbarRes.jsx';
import ProductsPage from './Admin/ProductsPage.jsx';
import EditproductPage from './Admin/EditProductPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SignupPageAdmin from './pages/SignupPage_admin.jsx';
import ForgotPassPage from './pages/ForgotPassPage.jsx';
import ResetPassPage from './pages/ResetPassPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ReceiptPage from './pages/ReceiptPage.jsx';
import CustomerPage from './pages/CustomerPage.jsx';
import CheckoutSummaryPage from './pages/CheckoutSummaryPage.jsx';
import OrderSubmittedPage from './pages/OrderSubmittedPage.jsx';
// import LiffLoginPage from './components/LiffLogin.jsx';
import LiffLoginPage from './components/LiffLogin_hybrid.jsx';

//context
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//routes
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <CartProvider>
          <ToastContainer position='top-right' autoClose={3000} />
          <Router>
            <NavbarRes />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route
                path='/login'
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path='/lifflogin'
                element={
                  <PublicRoute>
                    <LiffLoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path='/signup'
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />
              {/* <Route path='/admin/signup' element={<SignupPageAdmin />} /> */}
              <Route
                path='/forgotpass'
                element={
                  <PublicRoute>
                    <ForgotPassPage />
                  </PublicRoute>
                }
              />
              <Route
                path='/reset-password/:token'
                element={
                  <PublicRoute>
                    <ResetPassPage />
                  </PublicRoute>
                }
              />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/addproduct' element={<AddProductForm />} />
              <Route path='/edit/:id' element={<EditproductPage />} />
              <Route path='/productsAdmin' element={<ProductsPage />} />
              <Route path='/products' element={<ProductListPage />} />
              <Route path='/customer' element={<CustomerPage />} />
              {/* // checkout step pages*/}
              <Route path='/cart' element={<CartPage />} />
              <Route path='/chkoutsummary' element={<CheckoutSummaryPage />} />
              <Route path='/ordersubmitted' element={<OrderSubmittedPage />} />
              <Route path='/receipt' element={<ReceiptPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
