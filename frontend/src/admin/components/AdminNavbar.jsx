import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="w-full bg-white border-b border-gray-300 px-6 py-3 flex items-center justify-between">

      {/* Left */}
      <h1 className="text-lg font-semibold text-gray-700">
        Admin Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Admin Info */}
        <div className="flex items-center gap-2 text-gray-700">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm font-medium">
            {admin?.name || "Admin"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-1.5 rounded-sm hover:bg-green-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default AdminNavbar;
