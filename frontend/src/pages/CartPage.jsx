import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">
          Your Cart is Empty 🛒
        </h2>
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart ({totalItems} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">

                {/* Quantity */}
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span className="px-4">
                    {item.quantity}
                  </span>

                  <button
                    className="px-3 py-1"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="border p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Total Price</span>
            <span className="font-semibold">
              ₹{totalPrice}
            </span>
          </div>

          <button className="w-full bg-black text-white py-2 rounded mb-3">
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full border py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
