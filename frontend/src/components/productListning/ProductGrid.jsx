import React from "react";
import {Link} from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-12 px-10">
      {products.map((product) => (
        <Link to={`/products/${product._id}`}>
        <ProductCard key={product._id} product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
