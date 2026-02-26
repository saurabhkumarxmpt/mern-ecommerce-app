import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { totalItems, setIsMiniCartOpen } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="w-full sticky top-0 z-50 
      bg-white/80 backdrop-blur-md 
      border-b border-gray-200
      shadow-sm py-4 px-[80px]"
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center w-1/4">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex w-2/4 justify-center space-x-14 text-gray-800 font-medium">
          {["Home", "Products", "About", "Contact"].map((item, index) => (
            <Link
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group"
            >
              <span className="hover:text-green-600 transition duration-300">
                {item}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end w-1/4 space-x-6">

          {/* Search */}
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
            <button
              type="submit"
              className="text-sm text-green-600 font-medium ml-2"
            >
              Search
            </button>
          </form>

          {/* User Section */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {!user ? (
              <Link to="/login">
                <FaUser
                  className="cursor-pointer hover:text-green-600 transition duration-300"
                  size={20}
                />
              </Link>
            ) : (
              <>
                {/* User Button */}
                <div className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100 transition">
                  
                  {/* Avatar Circle */}
                  <div className="w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full text-xs font-semibold uppercase">
                    {user?.name?.charAt(0)}
                  </div>

                  {/* Name */}
                  <span className="text-sm font-medium whitespace-nowrap max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 rounded-lg text-sm z-50 overflow-hidden">
                    
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-50 transition"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-50 transition"
                    >
                      My Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 transition"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={() => setIsMiniCartOpen(true)}
            className="relative"
          >
            <FaShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-green-600 text-white text-[10px] px-2 py-[2px] rounded-full">
                {totalItems}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
