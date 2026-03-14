import { useEffect, useState } from "react";
import { Pencil, Trash2, PackageSearch, Eye, X } from "lucide-react";
import { Allproducts, deleteProduct, updateProduct } from "../../services/ProductServices";

const AllProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
  if(viewProduct){
    setSelectedImage(viewProduct.images[0]);
  }
}, [viewProduct]);


  const fetchProducts = async () => {
    try {
      const data = await Allproducts();
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await updateProduct(editProduct._id, editProduct);

      setProducts(
        products.map((p) =>
          p._id === editProduct._id ? res.product : p
        )
      );

      setEditProduct(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          All Products
        </h1>
        <p className="text-sm text-gray-500">
          Manage your store products
        </p>
      </div>

      {/* Table */}

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">

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

              {products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >

                  {/* Product */}

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
                    {product.category?.name}
                  </td>

                  {/* Price */}

                  <td className="p-4 font-medium text-gray-700">
                    ₹{product.price}
                  </td>

                  {/* Stock */}

                  <td className="p-4">

                    <span
                      className={`text-sm font-medium ${
                        product.stock > 5
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="p-4">

                    <div className="flex justify-end gap-4">

                      {/* View */}

                      <button
                        onClick={() => setViewProduct(product)}
                        className="text-blue-600 hover:scale-110 transition"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}

                      <button
                        onClick={() => setEditProduct(product)}
                        className="text-green-600 hover:scale-110 transition"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* VIEW MODAL */}

      {viewProduct && (

       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

  <div className="bg-white w-[1000px] max-w-[95%] rounded-sm shadow-2xl border border-gray-200 flex relative">

    {/* Close Button */}

    <button
      onClick={() => setViewProduct(null)}
      className="absolute right-5 top-5 text-gray-500 hover:text-red-500"
    >
      <X size={20}/>
    </button>


    {/* LEFT IMAGE SECTION */}

    <div className="w-[50%] p-6 border-r border-gray-200">

      {/* MAIN IMAGE */}

      <img
        src={selectedImage || viewProduct.images[0]}
        alt={viewProduct.name}
        className="w-full h-[350px] object-cover rounded-sm border"
      />


      {/* THUMBNAILS */}

      <div className="flex gap-3 mt-4">

        {viewProduct.images?.map((img, index) => (

          <img
            key={index}
            src={img}
            onClick={() => setSelectedImage(img)}
            className="w-20 h-20 object-cover rounded-sm border cursor-pointer hover:scale-105 transition"
          />

        ))}

      </div>

    </div>


    {/* RIGHT DETAILS SECTION */}

    <div className="w-[50%] p-8">

      {/* PRODUCT NAME */}

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {viewProduct.name}
      </h2>


      {/* CATEGORY BADGE */}

      <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-sm">
        {viewProduct.category?.name}
      </span>


      {/* PRICE */}

      <p className="text-2xl font-semibold text-green-600 mt-4">
        ₹{viewProduct.price}
      </p>


      {/* STOCK */}

      <p className="text-sm text-gray-600 mt-2">
        Stock :
        <span className="ml-1 font-medium text-gray-800">
          {viewProduct.stock}
        </span>
      </p>


      {/* PRODUCT ID */}

      <p className="text-xs text-gray-400 mt-2">
        Product ID : {viewProduct._id}
      </p>


      {/* DIVIDER */}

      <div className="border-t border-gray-200 my-5"></div>


      {/* DESCRIPTION */}

      <p className="text-sm text-gray-600 leading-relaxed">
        {viewProduct.description}
      </p>

    </div>

  </div>

</div>




      )}

      {/* EDIT MODAL */}

      {editProduct && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px] relative">

            <button
              onClick={() => setEditProduct(null)}
              className="absolute right-4 top-4"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Edit Product
            </h2>

            <input
              type="text"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  name: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="number"
              value={editProduct.stock}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  stock: e.target.value,
                })
              }
              className="w-full border p-2 mb-4 rounded"
            />

            <button
              onClick={handleUpdate}
              className="bg-black text-white px-4 py-2 rounded w-full"
            >
              Update Product
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default AllProducts;
