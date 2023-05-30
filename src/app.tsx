import React, { FC ,useEffect} from "react";
import Sidebar from "./components/seller/sidebar";
import SidebarBuy from "./components/buyer/sidebar";
import Navbar from "./components/everyone/navbar";
import NavbarSeller from "./components/seller/navbar";
import SellerHome from "./pages/seller/home";
//import Home from "./pages/buyer/homepage";
import Myorder from "./pages/seller/myOrder";
import OrderHistory from "./pages/seller/orderHistory";
import Myaddress from "./pages/seller/myAddress";
import { orders } from "./pages/seller/orderdata";
import MyBank, {  } from "./pages/seller/bankAccount";
import CustomerReg from "./pages/seller/signup"
import Customer from "./pages/everyone/signup"
import SellerLoginForm from "./pages/seller/login"
import LoginForm from "./pages/everyone/login"
import Shopprofile from "./pages/seller/shopProfile"
import { BrowserRouter as Router, Routes, Route , } from 'react-router-dom';
import MyProfile from "./pages/buyer/profile";
import MyAddress from "./pages/buyer/address";
import Chart from "./pages/seller/saleOverview";
import AddNewProduct from "./pages/seller/addProduct";
import MyPayment from "./pages/buyer/myPayment";
import Home from "./pages/everyone/home";
import Product from "./pages/everyone/product";
import CartPage from "./pages/buyer/cartPage";
import CheckoutPage from "./pages/buyer/Checkout";
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
          <Route path="/Home" element={ <div> <Navbar /> <Home /> </div> }/>
          <Route path="/product/:productId" element={<div> <Navbar /> <Product /> </div> } />
          <Route path="/cart" element={<div> <Navbar /> <CartPage /> </div> } />
          <Route path="/checkout" element={<div> <Navbar /> <CheckoutPage /> </div> } />
          <Route path="/CustomerProfile" element={ <div className="flex"> <Navbar /> <SidebarBuy/> <MyProfile/> </div> }/>
          <Route path="/CustomerAddress" element={ <div className="flex"> <Navbar /> <SidebarBuy/> <MyAddress/> </div> }/>
          <Route path="/CustomerPayment" element={ <div className="flex"> <Navbar /> <SidebarBuy/> <MyPayment/> </div> }/>
         
          <Route
            path="/*"
            element={
              <div className="flex">
                < NavbarSeller />
                <Sidebar />
                <Routes>
                  <Route path="/homeSeller" element={<SellerHome />} />
                  <Route path="/myOrder" element={<Myorder orders={orders} />} />
                  <Route path="/orderHistory" element={<OrderHistory orders={orders} />} />
                  <Route path="/myAddress" element={<Myaddress/>} />
                  <Route path="/bankAccount" element={<MyBank />} />
                  <Route path="/shopProfile" element={<Shopprofile />} />
                  <Route path="/salesOverview" element={<Chart />   } />
                  <Route path="/addNewProduct" element={<AddNewProduct onProductAdd={() => { }} />} />
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
