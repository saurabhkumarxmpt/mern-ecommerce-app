import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetProducts } from "../services/ProductServices";

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

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">
        Products {search && `for "${search}"`}
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item._id} className="border p-4 rounded">
            <img src={item.images[0]} alt="" className="h-40 w-full object-cover" />
            <h3 className="mt-2 font-medium">{item.name}</h3>
            <p className="text-green-600 font-semibold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
