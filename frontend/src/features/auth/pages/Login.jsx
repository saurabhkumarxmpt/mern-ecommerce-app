import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/AuthService";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {

  const navigate=useNavigate();
  const {login}=useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const data=await loginUser(formData);
      login(data);
      console.log("login sucess");
      alert("login");
      navigate('/');
    }catch(err){
      console.error(err);
    }
    
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white items-center justify-center p-16">
        
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Welcome Back 💚
          </h1>
          <p className="text-lg text-green-100 leading-relaxed">
            Login to access your cart, track orders and enjoy secure checkout.
          </p>

          <div className="mt-10 space-y-3 text-green-100 text-sm">
            <p>✔ Secure Payments</p>
            <p>✔ Fast Delivery</p>
            <p>✔ Easy Returns</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        
        <div className="w-full max-w-md bg-white p-8 rounded-sm shadow-lg border border-gray-200">
          
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-green-600" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-sm hover:bg-green-700 transition duration-300 font-medium"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-center text-gray-500 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;
