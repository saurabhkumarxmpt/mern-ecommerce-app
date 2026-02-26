import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const MiniCart = () => {
  const {
    isMiniCartOpen,
    setIsMiniCartOpen,
    cart,
    totalPrice,
    removeFromCart,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isMiniCartOpen && (
        <div
          onClick={() => setIsMiniCartOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col
        ${isMiniCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-400 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">
            🛒 Cart Preview
          </h2>
          <button
            onClick={() => setIsMiniCartOpen(false)}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty
            </p>
          )}

          {cart.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="flex gap-3 items-center border-b border-gray-200 pb-3"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-sm border-gray-200 border"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {cart.length > 3 && (
            <p className="text-sm text-gray-500 text-center">
              +{cart.length - 3} more items
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-400 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">Total</span>
            <span className="font-bold text-lg text-green-600">
              ₹{totalPrice}
            </span>
          </div>

          <Link
            to="/cart"
            onClick={() => setIsMiniCartOpen(false)}
            className="block text-center bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-sm font-medium"
          >
            Go To Cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default MiniCart;
