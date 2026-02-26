import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[65vh] text-center">
        <h2 className="text-xl font-medium mb-4 text-gray-800">
          Your Cart is Empty 🛒
        </h2>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 text-sm rounded-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-8 text-gray-800">
        Shopping Cart ({totalItems} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 p-4 rounded-sm bg-white"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-sm border border-gray-400"
                />

                <div>
                  <h2 className="text-base font-medium text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">

                {/* Quantity Control */}
                <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                  <button
                    className="px-2 py-1 text-sm hover:bg-gray-100 transition"
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span className="px-3 text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    className="px-2 py-1 text-sm hover:bg-gray-100 transition"
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-400 hover:text-red-500 transition text-sm"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="border border-gray-200 p-5 rounded-sm h-fit">
          <h2 className="text-lg font-medium mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between mb-4 text-base font-medium text-gray-800">
            <span>Total Price</span>
            <span className="text-green-600">
              ₹{totalPrice}
            </span>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 text-sm rounded-sm mb-3">
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full border border-green-600 text-green-600 hover:bg-green-50 transition py-2 text-sm rounded-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
