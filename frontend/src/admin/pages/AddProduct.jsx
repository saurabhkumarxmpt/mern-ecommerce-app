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
      console.log(productData);

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
  className="bg-white border border-gray-200 rounded-lg p-8 space-y-8 shadow-sm max-w-4xl"
>

  <h2 className="text-lg font-semibold text-gray-800">
    Add New Product
  </h2>


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
      placeholder="Enter product name"
      className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
    />

  </div>


  {/* Price + Stock */}

  <div className="grid grid-cols-2 gap-6">

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
        className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
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
        className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
      />

    </div>

  </div>


  {/* Category + Featured */}

  <div className="flex items-center gap-6">

    <div className="w-52">

      <label className="text-sm text-gray-600">
        Category
      </label>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
      >

        <option value="">Select</option>

        {categories?.map(cat => (

          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>

        ))}

      </select>

    </div>



    {/* Featured Toggle */}

    <div className="flex items-center gap-3 mt-6">

      <span className="text-sm text-gray-600">
        Featured
      </span>

      <label className="relative inline-flex items-center cursor-pointer">

        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition"></div>

        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>

      </label>

    </div>

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
      className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
    />

  </div>


  {/* Tags */}

  <div>

    <label className="text-sm text-gray-600">
      Tags
    </label>

    <input
      type="text"
      name="tags"
      placeholder="phone, apple, new"
      value={formData.tags}
      onChange={handleChange}
      className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
    />

  </div>



  {/* Image Upload */}

  <div>

    <label className="text-sm text-gray-600">
      Product Images
    </label>

    <label className="mt-3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-black transition">

      <UploadCloud className="text-gray-400" size={32} />

      <p className="text-sm text-gray-500 mt-2">
        Click to upload images
      </p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImages}
        className="hidden"
      />

    </label>

  </div>



  {/* Image Preview */}

  {imagePreview.length > 0 && (

    <div className="grid grid-cols-6 gap-4">

      {imagePreview.map((img, index) => (

        <div key={index} className="relative group">

          <img
            src={img}
            alt=""
            className="h-24 w-full object-cover rounded-md border"
          />

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100"
          >

            <X size={14} />

          </button>

        </div>

      ))}

    </div>

  )}



  {/* Submit */}

  <div className="pt-4">

    <button
      type="submit"
      className="bg-green-600 text-white px-6 py-2 rounded-md hover:opacity-90"
    >

      Add Product

    </button>

  </div>

</form>


      </div>

    </div>

  );

};

export default AddProduct;
