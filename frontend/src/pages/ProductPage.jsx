import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetProducts } from "../services/ProductServices";
import FilterSidebar from "../components/Productspage/FilterSidebar";
import RightSection from "../components/Productspage/productLayout/RightSection";

const demoProducts = [
  {
    _id: 1,
    name: "Nike Shoes",
    price: 1999,
    rating: 4.5,
    category: "Shoes",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
  {
    _id: 2,
    name: "Smart Watch",
    price: 2999,
    rating: 4.2,
    category: "Electronics",
    image: "https://via.placeholder.com/300",
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetProducts(search);
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [search]);

   const [filters, setFilters] = useState({
    category: "",
    price: 10000,
    rating: "",
    inStock: false,
  });

  const clearFilters = () => {
    setFilters({
      category: "",
      price: 10000,
      rating: "",
      inStock: false,
    });
  };

  return (
    <>
    <div className="max-w-7xl p-4">
      <div className="flex items-start gap-6">
    <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />
      <RightSection products={demoProducts}/>
      </div>
      </div>
    </>
  );
};

export default ProductsPage;
