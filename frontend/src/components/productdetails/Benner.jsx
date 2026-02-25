import { FaShippingFast, FaShieldAlt, FaUndoAlt, FaLock } from "react-icons/fa";

const TrustBanner = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-sm py-10 mx-[80px]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        {/* Fast Delivery */}
        <div className="flex flex-col items-center space-y-3">
          <FaShippingFast className="text-3xl text-green-600" />
          <h4 className="font-semibold text-gray-800">Fast Delivery</h4>
          <p className="text-sm text-gray-500">
            Quick & reliable shipping across India
          </p>
        </div>

        {/* Secure Payment */}
        <div className="flex flex-col items-center space-y-3">
          <FaLock className="text-3xl text-green-600" />
          <h4 className="font-semibold text-gray-800">Secure Payment</h4>
          <p className="text-sm text-gray-500">
            100% secure and encrypted transactions
          </p>
        </div>

        {/* Easy Returns */}
        <div className="flex flex-col items-center space-y-3">
          <FaUndoAlt className="text-3xl text-green-600" />
          <h4 className="font-semibold text-gray-800">Easy Returns</h4>
          <p className="text-sm text-gray-500">
            7-day hassle-free replacement policy
          </p>
        </div>

        {/* Trusted Brand */}
        <div className="flex flex-col items-center space-y-3">
          <FaShieldAlt className="text-3xl text-green-600" />
          <h4 className="font-semibold text-gray-800">Trusted Platform</h4>
          <p className="text-sm text-gray-500">
            Thousands of satisfied customers
          </p>
        </div>

      </div>
    </div>
  );
};

export default TrustBanner;
