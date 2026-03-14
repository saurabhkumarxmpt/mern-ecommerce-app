import { useEffect, useState } from "react";
import { getTodayOrdres, updateOrderStatus } from '../../services/OrderServices'
import { FaEye } from "react-icons/fa";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const TodayOrders = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await getTodayOrdres();
      setOrders(res.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (orderId, status) => {
    try {

      await updateOrderStatus(orderId, status);

      const updated = orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: status } : order
      );

      setOrders(updated);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-semibold text-gray-800">
          Today Orders
        </h1>

        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
          {orders.length} Orders
        </span>

      </div>

      {/* Table */}

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Change Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>

          </thead>

          <tbody className="divide-y">

            {orders.map((order) => (

              <tr key={order._id} className="hover:bg-gray-50">

                <td className="px-4 py-3">
                  {order._id.slice(-6)}
                </td>

                <td className="px-4 py-3">
                  {order.user?.name}
                </td>

                <td className="px-4 py-3">
                  ₹{order.totalAmount}
                </td>

                {/* STATUS BADGE */}

                <td className="px-4 py-3">

                  <span
                    className={`px-2 py-1 rounded text-xs ${statusStyles[order.orderStatus]}`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                {/* STATUS DROPDOWN */}

                <td className="px-4 py-3">

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded text-sm"
                  >

                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>

                  </select>

                </td>

                {/* VIEW BUTTON */}

                <td className="px-4 py-3">

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* VIEW ORDER MODAL */}

      {selectedOrder && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[500px] rounded-sm p-6 relative">

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-4 top-4 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Order Details
            </h2>

            <div className="space-y-3 text-sm">

              <p>
                <strong>Customer:</strong>{" "}
                {selectedOrder.user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedOrder.user?.email}
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {selectedOrder.totalAmount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedOrder.orderStatus}
              </p>

            </div>

            {/* PRODUCTS */}

            <div className="mt-4">

              <h3 className="font-semibold mb-2">
                Products
              </h3>

              <div className="space-y-2">

                {selectedOrder.products?.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >

                    <span>
                      {item.product?.name}
                    </span>

                    <span>
                      Qty : {item.quantity}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default TodayOrders;
