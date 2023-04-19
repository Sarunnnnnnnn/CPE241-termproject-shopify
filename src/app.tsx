import React, { FC } from "react";
import Sidebar from "./components/sideBar";
import Home from "./pages/seller/home";
import Myorder from "./pages/seller/myOrder";
import OrderHistory from "./pages/seller/orderHistory";
import Myaddress from "./pages/seller/myAddress";
import { orders } from "./pages/seller/orderdata";
import { Address } from "./pages/seller/addressData";
import { BrowserRouter as Rounter, Route, Routes } from "react-router-dom";
import MyBank,{Account} from "./pages/seller/ฺbankAccount";
import CustomerReg from "./pages/everyone/signup"
import CustomerLoginForm,{handleLoginFormSubmit} from "./pages/everyone/login"

const App: FC = () => {

  return (
    <>
      <Rounter>
        <Routes>
          <Route path="/Reg" element={<CustomerReg />} />
          <Route path="/log" element={<CustomerLoginForm onSubmit={handleLoginFormSubmit} />} />
          <Route
            path="/*"
            element={
              <div className="flex">
                <Sidebar />
                <Routes>
                  <Route path="/Home" element={<Home />} />
                  <Route path="/myorder" element={<Myorder orders={orders} />} />
                  <Route path="/orderHistory" element={<OrderHistory orders={orders} />} />
                  <Route path="/MyAddress" element={<Myaddress addresses={Address} />} />
                  <Route path="/Bankaccount" element={<MyBank addresses={Account} />} />
                </Routes>
              </div>
            }
          />
        </Routes>   
      </Rounter>
    </>
  );
};

export default App;
