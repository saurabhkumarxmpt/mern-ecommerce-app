import React from "react";
import toast from "react-hot-toast";

const PromotionalBanner = () => {
  return (
    <section className="max-w-6xl mx-auto  px-4 py-[80px] ">
      <div className="bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          
          {/* LEFT CONTENT */}
          <div className="p-8 md:p-12 text-green-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Summer Special Offer
            </h2>

            <p className="text-gray-700 mb-6">
              Get up to 40% OFF on our latest collection.  
              Limited time deal — shop your favorite products now.
            </p>

            <button 
            className="bg-green-600  text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            onClick={()=> toast.error(`Sorry not deal right now`)}
            >
              Buy Now →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end p-6">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
              alt="product"
              className="h-64 md:h-72 object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
