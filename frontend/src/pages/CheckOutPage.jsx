import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    alert("Order Placed Successfully 🎉");
    clearCart();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-600">
      <h1 className="text-2xl font-medium mb-8 text-gray-800">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* Shipping Information */}
          <div className="border border-gray-200 rounded-sm p-6">
            <h2 className="text-lg font-medium mb-5 text-gray-800">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number *"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="City *"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode *"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />

              <input
                type="text"
                name="apartment"
                placeholder="Apartment, Suite (Optional)"
                className="border border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />
            </div>

            <textarea
              name="address"
              placeholder="Full Address *"
              rows="3"
              className="border border-gray-200 p-2 rounded-sm w-full mt-4 text-sm"
              onChange={handleChange}
            />
          </div>

          {/* Payment Method */}
          <div className="border border-gray-200 rounded-sm p-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              Payment Method
            </h2>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  onChange={handleChange}
                />
                Online Payment (Coming Soon)
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="border border-gray-200 rounded-sm p-6 h-fit">
          <h2 className="text-lg font-medium mb-6 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-72 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border-b border-gray-200 pb-4"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-sm border border-gray-200"
                />

                <div className="flex-1 text-sm">
                  <p className="font-medium text-gray-800 line-clamp-1">
                    {item.name}
                  </p>
                  <p>
                    Qty: {item.quantity}
                  </p>
                  <p className="mt-1 font-medium text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-5 pt-4 text-sm space-y-3">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between font-medium text-gray-800">
              <span>Total Price</span>
              <span className="text-green-600">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-sm text-sm mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
