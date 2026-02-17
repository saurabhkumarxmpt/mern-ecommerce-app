import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetProducts } from "../services/ProductServices";
import FilterSidebar from "../components/productListning/FilterSidebar";
import ProductGrid from "../components/productListning/ProductGrid";

const ProductListning=()=>{

    const[products,setProducts]=useState([]);
    const [searchParams]= useSearchParams();
    const[filters,setFilters]=useState({});

    const search=searchParams.get("search")  || "";
 
    const fetchProducts=async()=>{
        try{
            const data=await GetProducts(search);
            setProducts(data);
            console.info(data);
        }catch(err){
            console.error(err)
        }
    };

    useEffect(()=>{
        fetchProducts()
    },[search]);

    const clearFilters=()=>{
        setFilters({});
    }


    return(
        <>
        <div className="flex gap-6">
        <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            />
            <div className="flex-1">
            <ProductGrid products={products} />
            </div>

            </div>

        </>
    )
}

export default ProductListning;