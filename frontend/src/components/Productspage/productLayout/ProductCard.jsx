import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-xl p-3 hover:shadow-lg transition">
      
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="font-medium mt-3">{product.name}</h3>

      <p className="text-sm text-gray-500">{product.category}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-semibold text-lg">₹{product.price}</span>
        <span className="text-sm text-yellow-500">⭐ {product.rating}</span>
      </div>

      <button className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
