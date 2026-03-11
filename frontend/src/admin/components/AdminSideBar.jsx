import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTags
} from "react-icons/fa";

const AdminSideBar = () => {

  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Categories", path: "/admin/categories", icon: <FaTags /> },
  ];

  return (
    <div className="w-60 h-screen bg-white border-r p-4">

      {/* Logo / Title */}
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Admin Panel
      </h2>

      {/* Menu */}
      <div className="flex flex-col gap-2">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition
            ${
              location.pathname === item.path
                ? "bg-gray-100 text-green-600"
                : ""
            }`}
          >

            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>

          </Link>

        ))}

      </div>

    </div>
  );
};

export default AdminSideBar;
