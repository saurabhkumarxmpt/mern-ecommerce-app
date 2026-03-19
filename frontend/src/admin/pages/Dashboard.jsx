import { useEffect, useState } from "react";
import { dashboardData } from "../services/AdminData";

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaClock,
  FaCalendarDay,
  FaExclamationTriangle
} from "react-icons/fa";

import DashboardAnalytics from '../components/DashboardCharts'
import DashboardTables from '../components/DashboardTables';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const dashboard = await dashboardData();
      setData(dashboard);
    };

    loadData();
  }, []);

  if (!data) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Loading dashboard...</p>
    </div>
  );
}


  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Products */}

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex items-center justify-between hover:shadow-sm transition">

          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-3xl font-semibold text-gray-700 mt-1">
              {data.totalProducts}
            </h2>
          </div>

          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-sm">
            <FaBox size={20} />
          </div>

        </div>


        {/* Orders */}

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex items-center justify-between hover:shadow-sm transition">

          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-3xl font-semibold text-gray-700 mt-1">
              {data.totalOrders}
            </h2>
          </div>

          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-sm">
            <FaShoppingCart size={20} />
          </div>

        </div>


        {/* Users */}

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex items-center justify-between hover:shadow-sm transition">

          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-3xl font-semibold text-gray-700 mt-1">
              {data.totalUsers}
            </h2>
          </div>

          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-sm">
            <FaUsers size={20} />
          </div>

        </div>


        {/* Revenue */}

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex items-center justify-between hover:shadow-sm transition">

          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-3xl font-semibold text-green-600 mt-1">
              ₹ {data.totalRevenue}
            </h2>
          </div>

          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-sm">
            <FaRupeeSign size={20} />
          </div>

        </div>


        {/* Pending Orders */}

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex items-center justify-between hover:shadow-sm transition">

          <div>
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <h2 className="text-3xl font-semibold text-gray-700 mt-1">
              {data.pendingOrders}
            </h2>
          </div>

          <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-sm">
            <FaClock size={20} />
          </div>

        </div>


        {/* Today Orders */}

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex items-center justify-between hover:shadow-sm transition">

          <div>
            <p className="text-gray-500 text-sm">Today Orders</p>
            <h2 className="text-3xl font-semibold text-gray-700 mt-1">
              {data.todayOrders}
            </h2>
          </div>

          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-sm">
            <FaCalendarDay size={20} />
          </div>

        </div>

      </div>

      {/* charts */}
      <DashboardAnalytics data={data} />

      {/* dashboard tables */}

      <DashboardTables data={data} />
    </div>
  );
};

export default Dashboard;
