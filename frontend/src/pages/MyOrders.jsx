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
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Orders Yet
        </h2>
        <p className="text-gray-500 mt-2">
          You haven't placed any order.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID:
                  <span className="font-semibold ml-1">
                    {order._id}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`mt-3 md:mt-0 px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Items Preview */}
            <div className="space-y-4">
              {order.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-700">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6">
              <p className="text-lg font-bold text-gray-800">
                Total: ₹{order.totalPrice}
              </p>

              <button
                onClick={() => setSelectedOrder(order)}
                className="mt-3 md:mt-0 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Order Details
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              Order ID: {selectedOrder._id}
            </p>

            <div className="space-y-3 mb-4">
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Shipping:</strong>{" "}
                {selectedOrder.shippingAddress.address},{" "}
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.state}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {selectedOrder.paymentMethod}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedOrder.orderStatus}
              </p>

              <p className="text-lg font-bold text-gray-800">
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
