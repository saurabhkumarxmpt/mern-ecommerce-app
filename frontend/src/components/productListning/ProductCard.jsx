import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < product.rating ? "opacity-100" : "opacity-30"} />
          ))}
          <span className="text-gray-500 text-xs ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>
        </div>

        {/* Button */}
        <button className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
