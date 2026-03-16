import { useEffect, useState } from "react";
import { getTodayOrdres, updateOrderStatus } from "../../services/OrderServices";

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
  const handleStatusChange = async (id, status) => {

    try {

      await updateOrderStatus(id, {
        orderStatus: status
      });

      fetchOrders();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="p-6">

      <h1 className="text-xl font-semibold text-gray-700 mb-6">
        Today Orders
      </h1>

      {/* Table */}

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">

        <table className="w-full text-sm text-left">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">User</th>
              <th className="p-3">Item</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => {

              const firstItem = order.orderItems?.[0];

              return (

                <tr
                  key={order._id}
                  className="border-t border-gray-300 hover:bg-gray-50 text-gray-600"
                >

                  {/* Order ID */}

                  <td className="p-3 font-medium text-gray-700">
                    #{order._id.slice(-6)}
                  </td>

                  {/* User */}

                  <td className="p-3">
                    {order.shippingAddress?.fullName || "User"}
                  </td>

                  {/* Product */}

                  <td className="p-3">

                    {firstItem && (

                      <div className="flex items-center gap-2">

                        <img
                          src={firstItem.image}
                          className="w-10 h-10 rounded object-cover"
                          alt=""
                        />

                        <span className="text-xs line-clamp-1 w-[200px]">
                          {firstItem.name}
                        </span>

                      </div>

                    )}

                  </td>

                  {/* Total */}

                  <td className="p-3 font-medium">
                    ₹{order.totalPrice}
                  </td>

                  {/* Status */}

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded text-xs
                        ${order.orderStatus === "Processing" && "bg-yellow-100 text-yellow-700"}
                        ${order.orderStatus === "Packed" && "bg-blue-100 text-blue-700"}
                        ${order.orderStatus === "Shipped" && "bg-purple-100 text-purple-700"}
                        ${order.orderStatus === "Delivered" && "bg-green-100 text-green-700"}
                        ${order.orderStatus === "Cancelled" && "bg-red-100 text-red-700"}
                      `}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  {/* Date */}

                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  {/* Actions */}

                  <td className="p-3 flex items-center gap-2">

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs"
                    >
                      Details
                    </button>

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border rounded text-xs px-2 py-1"
                    >

                      <option value="Processing">Processing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>

                    </select>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {selectedOrder && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[700px] rounded-lg shadow-xl p-6 relative">

            <h2 className="text-lg font-semibold mb-4">
              Order Details
            </h2>

            {/* Shipping */}

            <div className="text-sm text-gray-600 space-y-1 mb-4">

              <p>
                <strong>Name:</strong> {selectedOrder.shippingAddress?.fullName}
              </p>

              <p>
                <strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}
              </p>

              <p>
                <strong>City:</strong> {selectedOrder.shippingAddress?.city}
              </p>

              <p>
                <strong>State:</strong> {selectedOrder.shippingAddress?.state}
              </p>

              <p>
                <strong>Postal Code:</strong> {selectedOrder.shippingAddress?.postalCode}
              </p>

            </div>

            <p className="text-sm mb-2">
              <strong>Payment:</strong> {selectedOrder.paymentMethod}
            </p>

            <p className="text-sm mb-2">
              <strong>Total:</strong> ₹{selectedOrder.totalPrice}
            </p>

            <p className="text-sm mb-4">
              <strong>Status:</strong> {selectedOrder.orderStatus}
            </p>

            {/* Products */}

            <h3 className="font-medium mb-2 text-gray-700">
              Products
            </h3>

            <div className="space-y-3">

              {selectedOrder.orderItems?.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center gap-3 border-b border-gray-300 pb-2"
                >

                  <img
                    src={item.image}
                    className="w-12 h-12 rounded object-cover"
                    alt=""
                  />

                  <div className="flex-1">

                    <p className="text-sm">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <p className="text-sm font-medium">
                    ₹{item.price}
                  </p>

                </div>

              ))}

            </div>

            {/* Close */}

            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

          </div>

        </div>

      )}

    </div>

  );
};

export default TodayOrders;
