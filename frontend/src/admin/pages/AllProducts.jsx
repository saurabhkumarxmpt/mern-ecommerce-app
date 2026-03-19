import { useEffect, useState } from "react";
import { Pencil, Trash2, PackageSearch, Eye, X } from "lucide-react";
import { Allproducts, deleteProduct, updateProduct } from "../../services/ProductServices";
import {Category} from '../../services/CategoryServices';
import tost, { toast } from 'react-hot-toast';
const AllProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);

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

  const fetchCategories = async () => {
        try {
          const data = await Category();
          setCategories(data.category);
        } catch (err) {
          console.log(err);
        }
      };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) {
      toast.error("Deletion cancelled by user");
     return;
      }
    try {
      await deleteProduct(id);
      toast.success("🗑️ Product deleted successfully!",{id:toastId});
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product. Please try again.");
    }
  };

 const handleImageChange = (e, index) => {
  const file = e.target.files[0];

  const updatedImages = [...editProduct.images];

  updatedImages[index] = file;

  setEditProduct({
    ...editProduct,
    images: updatedImages
  });
};



  const handleUpdate = async () => {
    const toastId = toast.loading("Updating product...");
  try {

    const formData = new FormData();

    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category._id || editProduct.category);
    formData.append("isFeatured", editProduct.isFeatured);
    formData.append("stock", editProduct.stock);

    // multiple images
    editProduct.images.forEach((img,index)=>{
       if (img instanceof File) {
          formData.append(`image_${index}`, img);
        }
    })

    const res = await updateProduct(editProduct._id, formData);
    console.log(res);
    
    setProducts(
      products.map((p) =>
        p._id === editProduct._id ? res.product : p
      )
    );

    setEditProduct(null);

    toast.success("Changes saved successfully.",{
      id:toastId
    });

  } catch (err) {
    console.log(err);
    toast.error("Failed to update product. Try again!");
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

   <div className="w-[50%] p-6 border-r border-gray-200 flex flex-col items-center">

  {/* MAIN IMAGE */}

  <div className="w-full flex justify-center bg-gray-50 p-4 rounded-sm shadow-sm border border-gray-300">
    <img
      src={selectedImage || viewProduct.images[0]}
      alt={viewProduct.name}
      className="w-full max-w-[320px] h-[260px] object-contain rounded-md"
    />
  </div>


  {/* THUMBNAILS */}

  <div className="flex flex-wrap justify-center gap-3 mt-5">

    {viewProduct.images?.map((img, index) => (

      <img
        key={index}
        src={img}
        onClick={() => setSelectedImage(img)}
        className={`w-16 h-16 object-cover rounded-md border cursor-pointer transition-all duration-200
        hover:scale-110 hover:shadow-md
        ${selectedImage === img ? "border-green-600" : "border-gray-300"}`}
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

      <p className="text-xs text-gray-500 mt-2">
        Product ID : {viewProduct._id}
      </p>
      
      {/* PRODUCT TAGS */}

      <div className="flex flex-wrap gap-2 mt-3">
  {viewProduct.tags?.map((tag, index) => (
    <span
      key={index}
      className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium"
    >
      #{tag}
    </span>
  ))}
</div>


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

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

  <div className="bg-white w-[950px] max-h-[90vh] overflow-y-auto rounded-sm shadow-xl p-6 relative">

    {/* Close Button */}
    <button
      onClick={() => setEditProduct(null)}
      className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
    >
      <X size={18} />
    </button>

    <h2 className="text-lg font-semibold mb-5">
      Edit Product
    </h2>

    <div className="grid grid-cols-2 gap-6">

      {/* LEFT SIDE IMAGES */}
      <div>

        <p className="text-xs text-gray-500 mb-3">
          Product Images
        </p>

        <div className="grid grid-cols-3 gap-3">

          {editProduct.images?.map((img, index) => (
            <div
              key={index}
              className="relative h-[90px] rounded-sm overflow-hidden border border-gray-300 group"
            >

              <img
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                className="w-full h-full object-cover"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white text-[10px]">
                  Change
                </span>
              </div>

              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImageChange(e, index)}
              />

            </div>
          ))}

        </div>

      </div>


      {/* RIGHT SIDE FORM */}
      <div className="space-y-3 text-sm">

        {/* Product Name */}
        <div>
          <label className="text-xs text-gray-500">
            Product Name
          </label>

          <input
            type="text"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                name: e.target.value
              })
            }
            className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none"
          />
        </div>


        {/* Description */}
        <div>
          <label className="text-xs text-gray-500">
            Description
          </label>

          <textarea
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                description: e.target.value
              })
            }
            className="w-full border border-gray-300 rounded-sm p-2 text-sm h-[70px] focus:outline-none"
          />
        </div>


        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-3">

          <div>
            <label className="text-xs text-gray-500">
              Price
            </label>

            <input
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">
              Stock
            </label>

            <input
              type="number"
              value={editProduct.stock}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  stock: e.target.value
                })
              }
              className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none"
            />
          </div>

        </div>


        {/* Category */}
        <div>
          <label className="text-xs text-gray-500">
            Category
          </label>

          <select
            value={editProduct.category.name}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                category: e.target.value
              })
            }
            className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none"
          >
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}

          </select>
        </div>


        {/* Tags */}
        <div>
          <label className="text-xs text-gray-500">
            Tags
          </label>

          <input
            type="text"
            value={editProduct.tags}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                tags: e.target.value
              })
            }
            className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:outline-none"
            placeholder="mobile, electronics"
          />
        </div>


        {/* Featured */}
        <div className="flex items-center gap-2 pt-1">

          <input
            type="checkbox"
            checked={editProduct.isFeatured}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                isFeatured: e.target.checked
              })
            }
          />

          <span className="text-xs text-gray-600">
            Featured Product
          </span>

        </div>


        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-2 rounded-sm text-sm hover:bg-gray-800 transition mt-2"
        >
          Update Product
        </button>

      </div>

    </div>

  </div>

      </div>

      )}

    </div>
  );
};

export default AllProducts;
