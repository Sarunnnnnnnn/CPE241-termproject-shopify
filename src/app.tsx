import React, { FC ,useEffect} from "react";
import Sidebar from "./components/seller/sidebar";
import Navbar from "./components/everyone/navbar";
import SellerHome from "./pages/seller/home";
import Home from "./pages/buyer/homepage";
import Myorder from "./pages/seller/myOrder";
import OrderHistory from "./pages/seller/orderHistory";
import Myaddress from "./pages/seller/myAddress";
import { orders } from "./pages/seller/orderdata";
import { Address } from "./pages/seller/addressData";
import MyBank, { Account } from "./pages/seller/ฺbankAccount";
import CustomerReg from "./pages/seller/signup"
import Customer from "./pages/everyone/signup"
import SellerLoginForm from "./pages/seller/login"
import LoginForm from "./pages/everyone/login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const handleLoginFormSubmit = (user: { email: string, password: string }) => {};

const App: FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Customer />} />
          <Route path="/signupSeller" element={<CustomerReg />} />
          <Route path="/loginSeller" element={<SellerLoginForm onSubmit={handleLoginFormSubmit} />} />
          <Route path="/login" element={<LoginForm onSubmit={handleLoginFormSubmit} />} />
          <Route
            path="/Home"   
            element={
              <div className="flex">
                <Navbar />
                <Home />
              </div>  
            }
          />
          <Route
            path="/*"
            element={
              <div className="flex">
                <Sidebar />
                <Routes>
                  <Route path="/homeSeller" element={<SellerHome />} />
                  <Route path="/myOrder" element={<Myorder orders={orders} />} />
                  <Route path="/orderHistory" element={<OrderHistory orders={orders} />} />
                  <Route path="/myAddress" element={<Myaddress addresses={Address} />} />
                  <Route path="/bankAccount" element={<MyBank addresses={Account} />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
