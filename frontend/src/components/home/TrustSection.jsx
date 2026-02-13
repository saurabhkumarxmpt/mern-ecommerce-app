import React from "react";
import {
  FaShippingFast,
  FaUndoAlt,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaShippingFast size={28} />,
    title: "Free Shipping",
    desc: "Free shipping on all orders over ₹999",
  },
  {
    id: 2,
    icon: <FaUndoAlt size={28} />,
    title: "Easy Returns",
    desc: "7 days easy return policy",
  },
  {
    id: 3,
    icon: <FaLock size={28} />,
    title: "Secure Payment",
    desc: "100% secure payment gateway",
  },
  {
    id: 4,
    icon: <FaHeadset size={28} />,
    title: "24/7 Support",
    desc: "Support available anytime",
  },
];

const TrustSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-[80px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 border-gray-200 border rounded-sm p-6 text-center shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="text-green-600 flex justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
