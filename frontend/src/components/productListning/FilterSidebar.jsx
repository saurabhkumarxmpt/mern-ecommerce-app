import React from "react";
import { useSearchParams } from "react-router-dom";

const brands = ["Nike", "Adidas", "Puma", "Apple", "Samsung"];
const ratings = [4, 3, 2, 1];

const FilterSidebar = ({ filters, setFilters, clearFilters,categories }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange=(category)=>{
    searchParams.set("category",category);
    setSearchParams(searchParams);
  }

  const handleCategory = (cat) => {
    setFilters({ ...filters, category: cat });
  };

  const handleBrand = (brand) => {
    setFilters({ ...filters, brand });
  };

  const handleRating = (rating) => {
    setFilters({ ...filters, rating });
  };

  return (
    <aside className="w-72 hidden lg:block">
      <div className="sticky top-18 bg-gray-50 border border-gray-200  rounded-sm p-5 space-y-6">

        {/* Title */}
        <h2 className="text-lg font-semibold text-green-600">Filters</h2>

        {/* Category */}
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                  filters.category === cat
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat._id} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="5000"
            value={filters.price || 0}
            onChange={(e) =>
              setFilters({ ...filters, price: e.target.value })
            }
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">
            Up to ₹{filters.price || 0}
          </p>
        </div>

        {/* Brand */}
        <div>
          <h3 className="font-medium mb-2">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand}
                  onChange={() => handleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h3 className="font-medium mb-2">Rating</h3>
          <div className="space-y-2">
            {ratings.map((r) => (
              <button
                key={r}
                onClick={() => handleRating(r)}
                className={`block text-sm px-3 py-1 rounded-md ${
                  filters.rating === r
                    ? "bg-yellow-400 text-black"
                    : "hover:bg-gray-100"
                }`}
              >
                ⭐ {r} & up
              </button>
            ))}
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
