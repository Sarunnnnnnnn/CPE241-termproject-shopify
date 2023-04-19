import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import cart from '../../assets/cart.svg';
import search from '../../assets/search.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="flex items-center px-[70px] pt-[5px] h-[70px]">
        <Link to="/" className="mr-[20px]">
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
        <Link to="/cart" className="pr-[25px]">
          <img src={cart} alt="Cart" className="h-[35px]" />
        </Link>
        <Link to="/login" className="pr-[20px] font-poppins">Login</Link>
        <span className="pr-[20px] font-poppins">|</span>
        <Link to="/signup" className="font-poppins">Signup</Link>
      </div>
      <div className="border-b border-[#48466D] mx-[56px]">
      </div>
    </nav>
  );
};

export default Navbar;
