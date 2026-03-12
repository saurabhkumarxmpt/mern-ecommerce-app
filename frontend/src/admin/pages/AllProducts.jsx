import { useEffect, useState } from "react";
import { Pencil, Trash2, PackageSearch } from "lucide-react";
import {GetProducts} from '../../services/ProductServices';

const AllProducts = () => {

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchProducts = async ()=>{
    try{
      const data = await GetProducts();
      setProducts(data.products);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const handleDelete = async(id)=>{
    const confirmDelete = window.confirm("Delete this product?");
    if(!confirmDelete) return;

    try{
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
    }catch(err){
      console.log(err);
    }
  }

  return (

    <div className="p-6">

      {/* Page Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-semibold text-gray-700">
            All Products
          </h1>
          <p className="text-sm text-gray-500">
            Manage your store products
          </p>
        </div>

      </div>


      {/* Table */}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        {loading ? (

          <div className="p-8 text-center text-gray-500">
            Loading products...
          </div>

        ) : products.length === 0 ? (

          <div className="p-12 flex flex-col items-center gap-3 text-gray-500">

            <PackageSearch size={40} />

            <p>No products found</p>

          </div>

        ) : (

          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr className="text-left text-gray-600">

                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Actions</th>

              </tr>

            </thead>

            <tbody>

              {products.map((product)=>(
                
                <tr 
                key={product._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
                >

                  {/* Product Info */}

                  <td className="p-4 flex items-center gap-3">

                    <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover border border-gray-200"
                    />

                    <div>

                      <p className="font-medium text-gray-700">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        ID: {product._id.slice(-6)}
                      </p>

                    </div>

                  </td>

                  {/* Category */}

                  <td className="p-4 text-gray-600">
                    {product.category}
                  </td>

                  {/* Price */}

                  <td className="p-4 font-medium text-gray-700">
                    ₹{product.price}
                  </td>

                  {/* Stock */}

                  <td className="p-4">

                    <span className={`text-sm font-medium ${
                      product.stock > 5
                      ? "text-green-600"
                      : "text-red-500"
                    }`}>

                      {product.stock}

                    </span>

                  </td>

                  {/* Actions */}

                  <td className="p-4">

                    <div className="flex justify-end gap-4">

                      <button className="text-green-600 hover:scale-110 transition">

                        <Pencil size={18}/>

                      </button>

                      <button
                      onClick={()=>handleDelete(product._id)}
                      className="text-red-500 hover:scale-110 transition"
                      >

                        <Trash2 size={18}/>

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  )

}

export default AllProducts;
