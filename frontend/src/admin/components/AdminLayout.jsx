import AdminNavbar from "./AdminNavbar";
import AdminSideBar from "./AdminSideBar";

const AdminLayout=()=>{
    return(
        <div className="flex">
      <AdminSideBar />

      <div className="flex-1">
        <AdminNavbar />
        {children}
      </div>
    </div>
    )
}

export default AdminLayout;