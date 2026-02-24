import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetProducts } from "../services/ProductServices";
import { Category } from "../services/CategoryServices";
import FilterSidebar from "../components/productListning/FilterSidebar";
import ProductGrid from "../components/productListning/ProductGrid";

const ProductListning = () => {
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state 
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    min: "",
    max: "",
    tag: ""
  });

  // Read from URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const tag = searchParams.get("tag") || "";

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const data = await GetProducts({
        search,
        category,
        sort,
        min,
        max,
        tag
      });

      const proCategory = await Category();

      setProducts(data.products);
      setProductsCategory(proCategory.category);
    } catch (err) {
      console.error(err);
    }
  };

  // When URL changes → fetch products
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  // Sync Filters → URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (filters.category)
      params.set("category", filters.category);
    else
      params.delete("category");

    if (filters.sort)
      params.set("sort", filters.sort);
    else
      params.delete("sort");

    if (filters.search)
      params.set("search", filters.search);
    else
      params.delete("search");

    if (filters.min)
      params.set("min", filters.min);
    else
      params.delete("min");

    if (filters.max)
      params.set("max", filters.max);
    else
      params.delete("max");

    if (filters.tag)
      params.set("tag", filters.tag);
    else
      params.delete("tag");

    setSearchParams(params);
  }, [filters]);

  // Clear Filters
  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      sort: "",
      min: "",
      max: "",
      tag: ""
    });
  };

  return (
    <div className="flex gap-6">
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        categories={productsCategory}
      />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 px-10 pt-8">
          <p className="text-gray-600 text-md">
            Showing{" "}
            <span className="font-semibold text-green-600">
              {products.length}
            </span>{" "}
            products
          </p>

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value
              }))
            }
            className="border px-1 py-1 rounded-sm border-gray-200 text-gray-700 text-sm outline-0"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductListning;
