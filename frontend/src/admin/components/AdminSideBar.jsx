import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaPlus,
  FaChevronDown
} from "react-icons/fa";

const AdminSideBar = () => {

  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />
    },

    {
      name: "Products",
      icon: <FaBox />,
      children: [
        { name: "All Products", path: "/admin/products" },
        { name: "Add Product", path: "/admin/products/add" }
      ]
    },

    {
      name: "Orders",
      icon: <FaShoppingCart />,
      children: [
        { name: "All Orders", path: "/admin/orders" },
        { name: "Pending Orders", path: "/admin/orders/pending" }
      ]
    },

    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />
    },

    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FaTags />
    }
  ];

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-300 p-5">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Admin Panel
      </h2>

      <div className="flex flex-col gap-2">

        {menu.map((item) => (

          <div key={item.name}>

            {/* Normal Menu */}
            {!item.children && (

              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100
                ${
                  location.pathname === item.path
                    ? "bg-green-50 text-green-600"
                    : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>

            )}

            {/* Dropdown Menu */}
            {item.children && (

              <div>

                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >

                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.name}
                  </div>

                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      openMenu === item.name ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {openMenu === item.name && (

                  <div className="ml-8 mt-1 flex flex-col gap-1">

                    {item.children.map((sub) => (

                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`px-3 py-2 text-sm rounded-md hover:bg-gray-100
                        ${
                          location.pathname === sub.path
                            ? "text-green-600 bg-green-50"
                            : "text-gray-600"
                        }`}
                      >
                        {sub.name}
                      </Link>

                    ))}

                  </div>

                )}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminSideBar;
