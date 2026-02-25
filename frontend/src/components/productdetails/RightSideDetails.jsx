import { useState } from "react";

const RightSideDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="space-y-6 py-6">

      {/* Product Name */}
      <h1 className="text-xl font-semibold text-gray-700">
        {product.name}
      </h1>

      {/* Category */}
      <p className="text-green-600 text-sm font-medium">
        Category: {product.category}
      </p>

      {/* Tags */}
      {product.tags && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Stock Badge */}
      <div>
        {product.stock > 0 ? (
          <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            ✅ In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
            ❌ Out of Stock
          </span>
        )}
      </div>

      {/* Fancy Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-green-600">
          ₹{product.price}
        </span>
        <span className="text-sm text-gray-400 line-through">
          ₹{product.price + 500}
        </span>
        <span className="text-xs text-red-500 font-semibold">
          20% OFF
        </span>
      </div>

      {/* Delivery Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>🚚 Free Delivery</p>
        <p>📦 Delivery in 3-5 working days</p>
        <p>🔄 7 Days Replacement Policy</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantity:</span>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={decreaseQty}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>

          <span className="px-4 py-1 text-sm text-green-600">{quantity}</span>

          <button
            onClick={increaseQty}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
  <button className="flex-1 px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 transition">
    Add to Cart
  </button>

  <button className="flex-1 px-6 py-3 border border-green-600 text-green-600 text-sm font-medium rounded-lg hover:bg-green-50 transition">
    Buy Now
  </button>
</div>

    </div>
  );
};

export default RightSideDetails;
