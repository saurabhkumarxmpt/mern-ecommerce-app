import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 
      bg-white/70 backdrop-blur-md 
      border-b border-gray-200/50
      shadow-sm py-4 px-[80px]">

      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center w-1/4">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Center Tabs */}
        <div className="hidden md:flex w-2/4 justify-center space-x-14 text-gray-800 font-medium">
          {["Home", "Products", "About", "Contact"].map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <span className="hover:text-green-600 transition duration-300">
                {item}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center justify-end w-1/4 space-x-4">

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center border rounded-sm px-2 py-1 bg-white"
          >
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm w-32"
            />
            <button type="submit" className="text-sm text-green-600 font-medium ml-2">
              Search
            </button>
          </form>


          <Link to="/register">
            <FaUser className="cursor-pointer hover:text-green-600 transition duration-300" />
          </Link>
          <FaShoppingCart className="cursor-pointer hover:text-green-600 transition duration-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
