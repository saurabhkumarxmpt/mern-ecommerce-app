import { Link } from "react-router-dom";

const ProductBreadcrumb = ({ name }) => {
  return (
    <div className="text-sm text-gray-500 my-10 mx-[80px]">
      <Link to="/" className="hover:text-green-600 hover:underline transition">
        Home
      </Link>

      <span className="mx-2">/</span>

      <Link to="/products" className="hover:text-green-600 hover:underline transition">
        Products
      </Link>

      <span className="mx-2">/</span>

      <span className="text-green-600 font-medium truncate max-w-[200px] inline-block align-middle">
        {name}
      </span>
    </div>
  );
};

export default ProductBreadcrumb;
