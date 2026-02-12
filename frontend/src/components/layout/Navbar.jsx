import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-white sticky top-0 z-50 py-4 px-[160px] flex items-center justify-between">
      
      {/* Left - Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Center - Tabs */}
      <div className="hidden md:flex space-x-14 text-gray-800 font-medium">
        
        {["Home", "Products", "About", "Contact"].map((item, index) => (
          <div key={index} className="relative group cursor-pointer">
            <span className="hover:text-green-600 transition duration-300">
              {item}
            </span>

            {/* Animated Underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </div>
        ))}

      </div>

      {/* Right - Icons */}
      <div className="flex items-center space-x-6 text-lg text-gray-700">
        <FaSearch className="cursor-pointer hover:text-green-600 transition duration-300" />
        <FaShoppingCart className="cursor-pointer hover:text-green-600 transition duration-300" />
        <FaUser className="cursor-pointer hover:text-green-600 transition duration-300" />
      </div>

    </nav>
  );
};

export default Navbar;
