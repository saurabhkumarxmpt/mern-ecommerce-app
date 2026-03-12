import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { FaExclamationTriangle } from "react-icons/fa";

const DashboardAnalytics = ({ data }) => {

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const chartData = data.monthlyRevenue?.map(item => ({
    month: months[item._id - 1],
    revenue: item.revenue
  }));

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Revenue Chart */}

      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-lg font-semibold text-gray-700">
            Revenue Overview
          </h2>

          <span className="text-xs text-gray-400">
            Monthly Revenue
          </span>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >

            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />

            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />

            <Tooltip
              contentStyle={{
                borderRadius: "6px",
                border: "1px solid #e5e7eb"
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* Low Stock Products */}

      <div className="bg-white border border-gray-200 rounded-sm p-6">

        <div className="flex items-center gap-2 mb-5">

          <FaExclamationTriangle className="text-red-500 text-sm"/>

          <h2 className="text-lg font-semibold text-gray-700">
            Low Stock Products
          </h2>

        </div>


        {data.lowStockProducts?.length === 0 ? (

          <div className="text-sm text-gray-500">
            All products have sufficient stock
          </div>

        ) : (

          <div className="overflow-hidden">

            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">

                <tr>
                  <th className="p-2 text-left font-medium">
                    Product
                  </th>

                  <th className="p-2 text-right font-medium">
                    Stock
                  </th>
                </tr>

              </thead>

              <tbody>

                {data.lowStockProducts.map(product => (

                  <tr
                    key={product._id}
                    className="border-t border-gray-200"
                  >

                    <td className="p-2 font-medium text-gray-700">
                      {product.name}
                    </td>

                    <td className="p-2 text-right">

                      <span className="px-2 py-1 text-xs rounded-sm bg-red-100 text-red-600 font-medium">
                        {product.stock}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
};

export default DashboardAnalytics;
