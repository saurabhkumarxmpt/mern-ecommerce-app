import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="flex">

      <AdminSideBar />

      <div className="flex-1">
        <AdminNavbar />

        <div className="p-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;
