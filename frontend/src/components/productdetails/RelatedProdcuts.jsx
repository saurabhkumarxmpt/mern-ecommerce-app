import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Section Heading */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Related Products
        </h2>
        <p className="text-gray-500 mt-2 text-base">
          You may also like these products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/products/${item._id}`)}
            className="cursor-pointer bg-white border rounded-2xl p-4 hover:shadow-xl transition duration-300 group"
          >
            {/* Product Image */}
            <div className="h-40 flex items-center justify-center mb-4 overflow-hidden">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="h-full object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-medium text-gray-700 line-clamp-2">
              {item.name}
            </h3>

            {/* Price */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-green-600 font-semibold text-base">
                ₹{item.price}
              </span>

              {item.oldPrice && (
                <span className="text-gray-400 text-sm line-through">
                  ₹{item.oldPrice}
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RelatedProducts;
