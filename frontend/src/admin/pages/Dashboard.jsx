import { useEffect, useState } from "react";
import {dashboardData} from '../services/AdminData';

const Dashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {

    const loadData = async () => {

      const dashboard = await dashboardData();

      setData(dashboard);

    };

    loadData();

  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
     <div className="p-6 space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            {data.totalProducts}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            {data.totalOrders}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            {data.totalUsers}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-sm">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-semibold text-green-600">
            ₹ {data.totalRevenue}
          </h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-sm">

        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-700">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600">
                <th className="p-3">Customer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>

              {data.recentOrders.map((order) => (

                <tr key={order._id} className="border-t">

                  <td className="p-3">
                    <p className="font-medium">{order.user?.name}</p>
                    <p className="text-gray-500 text-xs">
                      {order.user?.email}
                    </p>
                  </td>

                  <td className="p-3">
                    {order.orderItems[0]?.name.slice(0,40)}...
                  </td>

                  <td className="p-3 font-medium">
                    ₹{order.totalPrice}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-sm">
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
