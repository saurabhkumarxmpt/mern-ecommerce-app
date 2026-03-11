import { Routes, Route } from "react-router-dom";

import Login from "../admin/auth/Login";


const AdminRoutes = () => {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/admin" element={<Login />} />

      {/* Admin Panel */}
      {/* <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route> */}

    </Routes>
  );
};

export default AdminRoutes;
