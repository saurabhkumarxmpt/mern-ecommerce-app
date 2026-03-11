import { Routes, Route } from "react-router-dom";

import AdminLogin from "../admin/pages/AdminLogin";
import AdminLayout from "../admin/components/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
const AdminRoutes = () => {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Admin Panel */}
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
};

export default AdminRoutes;
