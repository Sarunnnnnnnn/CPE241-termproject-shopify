import React, { FC } from "react";
import Sidebar from "./components/seller/sidebar";
import SellerHome from "./pages/seller/home";
import Myorder from "./pages/seller/myOrder";
import OrderHistory from "./pages/seller/orderHistory";
import Myaddress from "./pages/seller/myAddress";
import { orders } from "./pages/seller/orderdata";
import { Address } from "./pages/seller/addressData";
import MyBank, { Account } from "./pages/seller/ฺbankAccount";
import CustomerReg from "./pages/everyone/signup"
import CustomerLoginForm, { handleLoginFormSubmit } from "./pages/everyone/login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/everyone/navbar";
import Home from "./pages/everyone/home";
import Product from './pages/everyone/product';

const App: FC = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
