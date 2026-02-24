import React from "react";

const FilterSidebar = ({
  filters,
  setFilters,
  clearFilters,
  categories
}) => {

  //  Category Toggle
  const handleCategory = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? "" : cat
    }));
  };

  // Price Change
  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <aside className="w-72 hidden lg:block">
      <div className="sticky top-18 bg-white border border-gray-200 rounded-md p-5 space-y-6 shadow-sm">

        {/* Title */}
        <h2 className="text-lg font-semibold text-green-600">
          Filters
        </h2>

        {/* ================= CATEGORY ================= */}
        <div>
          <h3 className="font-medium mb-3">Featured Categorys</h3>
          <div className="space-y-2">
            {categories?.slice(0, 8).map((cat) => (
              <button
                key={cat._id || cat.name}
                onClick={() => handleCategory(cat.name)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  filters.category === cat.name
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= PRICE RANGE ================= */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>

          <div className="flex gap-3">
            {/* Min Price */}
            <input
              type="number"
              placeholder="Min"
              value={filters.min || ""}
              onChange={(e) =>
                handlePriceChange("min", e.target.value)
              }
              className="w-full border px-2 py-1 rounded-md text-sm outline-none focus:ring-1 focus:ring-green-500"
            />

            {/* Max Price */}
            <input
              type="number"
              placeholder="Max"
              value={filters.max || ""}
              onChange={(e) =>
                handlePriceChange("max", e.target.value)
              }
              className="w-full border px-2 py-1 rounded-md text-sm outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
        </div>

        {/* ================= CLEAR BUTTON ================= */}
        <button
          onClick={clearFilters}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Clear Filters
        </button>

      </div>
    </aside>
  );
};

export default FilterSidebar;
