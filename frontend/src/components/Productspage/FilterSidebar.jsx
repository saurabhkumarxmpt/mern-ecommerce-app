import React from "react";

const categories = ["Men", "Women", "Electronics", "Shoes", "Accessories"];


const FilterSidebar = ({
  filters,
  setFilters,
  clearFilters,
}) => {
  return (
    <aside className="w-72 hidden lg:block">
      <div className="sticky top-20 bg-white border p-5 border-gray-200 shadow-sm rounded-xl">
        
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-green-600">Filters</h2>

        {/* Category */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 ">Category</h3>
          <div className="space-y-2 mt-5">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center text-gray-700 gap-2 text-sm">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() =>
                    setFilters({ ...filters, category: cat })
                  }
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: e.target.value })
            }
            className="w-full"
          />
          <p className="text-sm mt-1">Up to ₹{filters.price}</p>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Rating</h3>
          <select
            value={filters.rating}
            onChange={(e) =>
              setFilters({ ...filters, rating: e.target.value })
            }
            className="w-full border rounded-sm text-gray-700 p-2 text-sm"
          >
            <option value="">All</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
          </select>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  inStock: e.target.checked,
                })
              }
            />
            In Stock Only
          </label>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
