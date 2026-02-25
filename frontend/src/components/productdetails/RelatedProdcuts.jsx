import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-3 py-16">

      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          Related Products
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          You may also like these products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/products/${item._id}`)}
            className="cursor-pointer bg-white border border-gray-200 rounded-sm w-full h-[300px] p-4 hover:shadow-sm transition duration-300 group"
          >
            {/* Product Image */}
            <div className="h-40 flex items-center justify-center mb-4 overflow-hidden ">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="h-full object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Product Name */}
            <h3 className="text-md font-medium text-gray-700 line-clamp-3 mb-4">
              {item.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-green-600">
                ₹{item.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                ₹{item.price + 500}
                </span>
                <span className="text-xs text-red-500 font-semibold">
                20% OFF
                </span>
      </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RelatedProducts;
