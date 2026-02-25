import { FaCheckCircle } from "react-icons/fa";

const ProductDescription = ({ product, selectedImage }) => {
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Section Heading */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-green-600">
          Product Description
        </h1>
        <p className="text-gray-500 mt-3  text-sm">
          Discover detailed information about this product
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-14 items-center">

        {/* Left Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={product.images[0]}
            alt={product.name}
            className="rounded-sm shadow-sm w-full max-w-md object-contai border border-gray-200"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6">

          <h2 className="text-2xl font-semibold text-gray-700">
            {product.name}
          </h2>

          {/* Medium Size Description */}
          <p className="text-gray-500 text-base leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          {product.features && (
            <div className="space-y-3 pt-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 mt-1" />
                  <span className="text-gray-700 text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Highlight Box */}
          <div className="bg-green-50 border border-green-200 p-5 rounded-sm">
            <h4 className="font-semibold text-green-700 mb-2 text-lg">
              Why Choose This Product?
            </h4>
            <p className="text-gray-600 text-base">
              {product.highlight ||
                "Trusted by thousands of customers for quality and performance."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
