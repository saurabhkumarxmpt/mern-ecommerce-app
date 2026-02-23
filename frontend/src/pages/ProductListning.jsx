import { useEffect,useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import { GetProducts } from "../services/ProductServices";
import FilterSidebar from "../components/productListning/FilterSidebar";
import ProductGrid from "../components/productListning/ProductGrid";

const ProductListning=()=>{

    const[products,setProducts]=useState([]);
    const [searchParams,setSearchParams]= useSearchParams();
    const[filters,setFilters]=useState({});


    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "";
    const min = searchParams.get("min") || "";
    const max = searchParams.get("max") || "";
    const tag = searchParams.get("tag") || "";
 
    const fetchProducts=async()=>{
        try{
            const data=await GetProducts({
                search,
                category,
                sort,
                min,
                max,
                tag
            });
            setProducts(data);
            console.info(data);
        }catch(err){
            console.error(err)
        }
    };

    useEffect(()=>{
        fetchProducts()
    },[searchParams]);

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
                <div className="flex justify-between items-center mb-4 px-10 pt-8">

                    <p className="text-gray-600 text-md">
                        Showing <span className="font-semibold text-green-600">{products.length}</span> products
                    </p>

                    <select
                        value={sort}
                        onChange={(e) => {
                            searchParams.set("sort",e.target.value);
                            setSearchParams(searchParams);
                        }}
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

        </>
    )
}

export default ProductListning;