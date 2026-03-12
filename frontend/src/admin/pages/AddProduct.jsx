import { useEffect, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Category } from "../../services/CategoryServices";
import { createProduct } from "../../services/ProductServices";

const AddProduct = () => {

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    tags: "",
    isFeatured: false,
    images: []
  });


  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const data = await Category();
        setCategories(data.category);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();

  }, []);



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };



  const handleImages = (e) => {

    const files = Array.from(e.target.files);

    const previews = files.map(file => URL.createObjectURL(file));

    setImagePreview(previews);

    setFormData({
      ...formData,
      images: files
    });

  };



  const removeImage = (index) => {

    const newPreview = imagePreview.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);

    setImagePreview(newPreview);

    setFormData({
      ...formData,
      images: newImages
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.images.length < 1) {
      alert("Please upload at least one image");
      return;
    }

    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("category", formData.category);
    productData.append("description", formData.description);
    productData.append("isFeatured", formData.isFeatured);

    productData.append("tags", formData.tags);

    formData.images.forEach(img => {
      productData.append("images", img);
    });

    try {

      await createProduct(productData);

      alert("Product added successfully");

    } catch (err) {
      console.log(err);
    }

  };



  return (

    <div className="p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-xl font-semibold text-gray-700 mb-6">
          Add New Product
        </h1>


        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-sm p-6 space-y-6 shadow-sm"
        >


          {/* Product Name */}

          <div>

            <label className="text-sm text-gray-600">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-black"
            />

          </div>



          {/* Price + Stock */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-gray-600">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full mt-2 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-black"
              />

            </div>


            <div>

              <label className="text-sm text-gray-600">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full mt-2 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-black"
              />

            </div>

          </div>



          {/* Category */}

          <div>

            <label className="text-sm text-gray-600">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-2 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-black"
            >

              <option value="">Select Category</option>

              {categories && categories.map(cat => (

                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>

              ))}

            </select>

          </div>



          {/* Description */}

          <div>

            <label className="text-sm text-gray-600">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-black"
            />

          </div>



          {/* Tags */}

          <div>

            <label className="text-sm text-gray-600">
              Tags (comma separated)
            </label>

            <input
              type="text"
              name="tags"
              placeholder="phone, apple, new"
              value={formData.tags}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-black"
            />

          </div>



          {/* Featured */}

          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />

            <label className="text-sm text-gray-600">
              Featured Product
            </label>

          </div>



          {/* Image Upload */}

          <div>

            <label className="text-sm text-gray-600">
              Product Images
            </label>

            <div className="mt-3 border border-dashed border-gray-300 rounded-sm p-6 text-center">

              <UploadCloud className="mx-auto text-gray-400" size={30} />

              <p className="text-sm text-gray-500 mt-2">
                Upload multiple product images
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="mt-4"
              />

            </div>

          </div>



          {/* Image Preview */}

          {imagePreview.length > 0 && (

            <div className="grid grid-cols-5 gap-3">

              {imagePreview.map((img, index) => (

                <div key={index} className="relative">

                  <img
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover rounded-sm border"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>

                </div>

              ))}

            </div>

          )}



          {/* Submit */}

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-sm hover:opacity-90"
          >

            Add Product

          </button>


        </form>

      </div>

    </div>

  );

};

export default AddProduct;
