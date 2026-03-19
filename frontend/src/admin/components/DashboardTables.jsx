import { FaUser } from "react-icons/fa";

const DashboardTables = ({ data }) => {

  const statusStyles = {
    Processing: "bg-yellow-100 text-yellow-700",
    packed: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };


  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Recent Orders */}

      <div className="bg-white border border-gray-200 rounded-sm">

        <div className="p-4 border-b border-gray-200">

          <h2 className="text-lg font-semibold text-gray-700">
            Recent Orders
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">

              <tr>
                <th className="p-3 text-left font-medium">Customer</th>
                <th className="p-3 text-left font-medium">Product</th>
                <th className="p-3 text-left font-medium">Price</th>
                <th className="p-3 text-left font-medium">Status</th>
              </tr>

            </thead>

            <tbody>

              {data.recentOrders?.map(order => (

                <tr
                  key={order._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >

                  <td className="p-3">

                    <p className="font-medium text-gray-700">
                      {order.user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {order.user?.email}
                    </p>

                  </td>

                  <td className="p-3 text-gray-700">
                    {order.orderItems[0]?.name?.slice(0,25)}...
                  </td>

                  <td className="p-3 font-medium text-gray-700">
                    ₹{order.totalPrice}
                  </td>

                  <td className="p-3">

                    <span className={`px-2 py-1 text-xs rounded-sm ${
                          statusStyles[order.orderStatus] || "bg-gray-100 text-gray-700"
                          }`}>
                      {order.orderStatus}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* Recent Users */}

      <div className="bg-white border border-gray-200 rounded-sm">

        <div className="p-4 border-b border-gray-200">

          <h2 className="text-lg font-semibold text-gray-700">
            Recent Users
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">

              <tr>
                <th className="p-3 text-left font-medium">User</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Joined</th>
              </tr>

            </thead>

            <tbody>

              {data.recentUsers?.map(user => (

                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >

                  <td className="p-3 flex items-center gap-2">

                    <div className="bg-green-100 text-green-600 p-2 rounded-sm">
                      <FaUser size={12}/>
                    </div>

                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>

                  </td>

                  <td className="p-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-3 text-gray-500">

                    {new Date(user.createdAt).toLocaleDateString()}

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

export default DashboardTables;
