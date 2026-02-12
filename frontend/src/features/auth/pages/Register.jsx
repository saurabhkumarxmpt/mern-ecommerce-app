import React from "react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-5">
          
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default SignUp;
