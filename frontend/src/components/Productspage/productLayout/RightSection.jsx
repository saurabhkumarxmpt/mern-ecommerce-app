import React from "react";
import ProductGrid from "./ProductGrid";

const RightSection = ({ products=[] }) => {
  return (
    <div className="flex-1">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Showing {products.length} Products
        </h2>

        <select className="border rounded-md p-2 text-sm">
          <option>Sort by</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
          <option>Newest</option>
        </select>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
};

export default RightSection;
