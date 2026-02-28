import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      
      {/* TOP FOOTER */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ECart</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for latest trends, electronics and fashion.
            Quality products with best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/profile" className="hover:text-white transition">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/my-orders" className="hover:text-white transition">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-white transition">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ECart. All rights reserved. | Made by Saurabh
        </div>
      </div>

    </footer>
  );
};

export default Footer;
