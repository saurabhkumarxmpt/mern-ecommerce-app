import { useState } from "react";
import { FaUserShield } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-[380px] p-8 rounded-sm shadow-md border">

        {/* Icon */}
        <div className="flex justify-center mb-4 text-green-600 text-3xl">
          <FaUserShield />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Admin Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border mt-1 p-2.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border mt-1 p-2.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-sm hover:bg-green-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;
