import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg";
import search from "../../assets/search.svg";

const Navbar: React.FC = () => {
  const [customerData, setCustomerData] = useState({
    customer_firstname: "",
    customer_lastname: "",
    customer_email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/get_user_customer",
          null,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCustomerData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [localStorage.getItem("access_token")]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="flex items-center px-[70px] pt-[5px] h-[70px]">
        <Link to="/Home" className="mr-[20px]">
          <img src={logo} alt="Logo" className="w-[230px]" />
        </Link>
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center rounded border border-[#48466D] w-[565px]">
            <span className="ml-[15px] font-lightgray">Search...</span>
            <div className="flex flex-grow justify-end my-[3px] mr-[3px]">
              <div className="rounded-[5px] bg-[#48466D] py-[3px] px-[7px]">
                <img src={search} alt="Search" className="w-[20px]" />
              </div>
            </div>
          </div>
        </div>
        
        <span className="font-poppins">
          {customerData.customer_firstname}
        </span>
        <span className=" pl-2 font-poppins pr-5">
          {customerData.customer_lastname}
        </span>
      

        <Link to="/cart" className="pr-[25px] ">
          <img src={cart} alt="Cart" className="h-[35px] " />
        </Link>
        <Link to="/CustomerProfile" className="pr-[20px] font-poppins">Setting</Link>
        <span className="pr-[20px] font-poppins">|</span>
      </div>
      <div className="border-b border-[#48466D] mx-[56px]"></div>
    </nav>
  );
};

export default Navbar;
