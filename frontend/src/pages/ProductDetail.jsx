import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSingleProduct } from "../services/ProductServices";
import ProductBreadcrumb from "../components/productdetails/ProductBreadcrumb";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await GetSingleProduct(id);
        setProduct(res);
        setSelectedImage(res.images[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;
  console.log(product)

  return (
    <>
    <ProductBreadcrumb name={product.name} />
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50">
  {/* LEFT SIDE */}
  <div>
    {/* Main Image */}
    <div className="w-full max-w-md mb-4">
      <img
        src={selectedImage}
        alt="Product"
        className="w-full h-[400px] object-cover rounded-lg shadow-lg"
      />
    </div>

    {/* Thumbnails */}
    <div className="flex gap-3 mt-4">
      {product.images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="thumb"
          onClick={() => setSelectedImage(img)}
          className={`w-20 h-20 object-cover rounded cursor-pointer border-2 
          ${
            selectedImage === img
              ? "border-black"
              : "border-gray-300"
          }`}
        />
      ))}
    </div>
  </div>

  {/* RIGHT SIDE DETAILS */}
  <div className="space-y-5">
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <p className="text-gray-500">Category: {product.category}</p>
    <p className="text-2xl font-semibold text-green-600">
      ₹{product.price}
    </p>
    <p>{product.description}</p>
  </div>

</div>

</>
  );
};

export default ProductDetails;
