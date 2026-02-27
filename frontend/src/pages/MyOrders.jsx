import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/OrderServices";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Processing":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading orders...</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-lg font-medium text-gray-700">
          No Orders Yet
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          You haven't placed any order.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-sm border border-gray-200 p-4 hover:shadow-sm transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs text-gray-500">
                  Order ID:
                  <span className="font-medium text-gray-700 ml-1">
                    {order._id.slice(-6)}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-2 py-1 text-xs rounded-sm font-medium ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Items Compact */}
            <div className="space-y-3">
              {order.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border-b border-gray-100 pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-sm"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm font-semibold text-gray-800">
                ₹{order.totalPrice}
              </p>

              <button
                onClick={() => setSelectedOrder(order)}
                className="text-xs px-3 py-1.5 border border-green-600 text-green-600 rounded-sm hover:bg-green-50 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* GLASS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-sm shadow-lg w-full max-w-xl p-6 relative">

            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-4 text-gray-500 text-sm"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Details
            </h2>

            <div className="space-y-3 mb-4">
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-800 font-medium">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="space-y-2 text-xs text-gray-600">
              <p>
                <span className="font-medium text-gray-700">
                  Shipping:
                </span>{" "}
                {selectedOrder.shippingAddress.address},{" "}
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.state}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Payment:
                </span>{" "}
                {selectedOrder.paymentMethod}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Status:
                </span>{" "}
                {selectedOrder.orderStatus}
              </p>

              <p className="text-sm font-semibold text-green-600 pt-2">
                Total: ₹{selectedOrder.totalPrice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
