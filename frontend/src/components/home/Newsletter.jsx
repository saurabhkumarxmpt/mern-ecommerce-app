import React from "react";

const Newsletter = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-[80px]">
      <div className="bg-gradient-to-r from-green-600 to-green-200 rounded-sm p-8 md:p-12 text-white relative overflow-hidden">
        
        {/* Background Shape (optional premium touch) */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Subscribe to our Newsletter
            </h2>
            <p className="text-green-100">
              Get latest offers, new arrivals and exclusive discounts directly
              in your inbox.
            </p>
          </div>

          {/* RIGHT INPUT */}
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-sm text-gray-700 focus:outline-none border border-gray-600"
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
