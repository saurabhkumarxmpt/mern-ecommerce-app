import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-700 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">{product.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-700">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {product.oldPrice}
          </span>
        </div>

        {/* Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
