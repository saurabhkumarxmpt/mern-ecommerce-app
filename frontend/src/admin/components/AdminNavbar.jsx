import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">

      {/* Left */}
      <h1 className="text-lg font-semibold text-gray-700">
        Admin Dashboard
      </h1>

      {/* Center Search */}
      <div className="w-1/3 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border px-3 py-1.5 rounded-sm focus:outline-none focus:border-green-600"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <FaUserCircle className="text-2xl text-gray-600" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border px-3 py-1.5 rounded-sm hover:border-green-600 hover:text-green-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default AdminNavbar;
