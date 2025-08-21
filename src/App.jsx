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

//context
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/admin/signup' element={<SignupPageAdmin />} />
              <Route path='/forgotpass' element={<ForgotPassPage />} />
              <Route
                path='/reset-password/:token'
                element={<ResetPassPage />}
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
