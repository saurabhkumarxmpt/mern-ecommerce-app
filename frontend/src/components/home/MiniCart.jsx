import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const MiniCart = ({ isOpen, setIsOpen }) => {

  const { cart, totalPrice } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >

      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Cart Preview</h2>
        <button onClick={() => setIsOpen(false)}>✕</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[70%]">

        {cart.length === 0 && <p>Cart is empty</p>}

        {cart.slice(0, 3).map((item) => (
          <div key={item._id} className="flex gap-3">
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-14 h-14 object-cover rounded"
            />
            <div>
              <h3 className="text-sm font-medium">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}

      </div>

      <div className="p-4 border-t">
        <p className="font-semibold mb-3">
          Total: ₹{totalPrice}
        </p>

        <Link
          to="/cart"
          onClick={() => setIsOpen(false)}
          className="block text-center bg-black text-white py-2 rounded"
        >
          Go To Cart
        </Link>
      </div>
    </div>
  );
};

export default MiniCart;
