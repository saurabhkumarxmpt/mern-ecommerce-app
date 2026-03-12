import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {

  return (

    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}

      <div className="w-64 border-r border-gray-200 bg-white">

        <AdminSideBar />

      </div>


      {/* Right Section */}

      <div className="flex-1 flex flex-col">

        {/* Navbar */}

        <div className="h-16  border-gray-200 bg-white flex items-center ">

          <AdminNavbar />

        </div>


        {/* Page Content */}

        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;
