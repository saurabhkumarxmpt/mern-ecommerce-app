import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";   // yaha apni logo image ka path rakhna

const Navbar = () => {
  return (
    <nav className="w-full bg-transparent py-4 px-8 flex items-center justify-between shadow-md">
      
      {/* Left - Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
      </div>

      {/* Center - Tabs */}
      <div className="hidden md:flex space-x-8 font-medium">
        <a href="#" className="hover:text-green-600 transition">Home</a>
        <a href="#" className="hover:text-green-600 transition">Products</a>
        <a href="#" className="hover:text-green-600 transition">About</a>
        <a href="#" className="hover:text-green-600 transition">Contact</a>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center space-x-6 text-lg">
        <FaSearch className="cursor-pointer hover:text-green-600 transition" />
        <FaShoppingCart className="cursor-pointer hover:text-green-600 transition" />
        <FaUser className="cursor-pointer hover:text-green-600 transition" />
      </div>

    </nav>
  );
};

export default Navbar;
