import './App.css';
import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Barbing from './pages/barbing';
import Shop from "./pages/shop"
import Cart from './pages/cart';
import { CartProvider } from './cartContext';
import Login from './pages/login';
import Signup from './pages/signup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from './admin/addProduct';
import EditProduct from './admin/editProduct';
import AllProduct from './admin/allProduct';
import AdminHome from './admin/adminHome';
import Checkout from './pages/checkout';
import Confirmation from './pages/confirmation';
import Otp from './pages/otp';
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/resetPassword';
import Orders from './pages/orders';
import AllOrders from './admin/allOrders'


function App() {


  return (
  <>
  <ToastContainer />
   <div className="body">
      <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>  
        <Route path="/barbing" element={<Barbing />}/>  
        <Route path="/shop" element={<Shop />}/>  
        <Route path="/cart" element={<Cart />}/>  
        <Route path="/login" element={<Login />}/>  
        <Route path="/signup" element={<Signup />}/>  
        <Route path="/add-product" element={<AddProduct />}/>  
        <Route path="/product/edit/:productId" element={<EditProduct/>}/>
        <Route path="/all-products" element={<AllProduct/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:resetToken" element={<ResetPassword/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/all-orders" element={<AllOrders/>}/>
      </Routes>
    </Router>
    </CartProvider>
  </div>
  </>
   
  );
}

export default App;

