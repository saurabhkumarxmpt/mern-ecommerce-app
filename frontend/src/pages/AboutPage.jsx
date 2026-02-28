import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-green-600">
            About Our Store
          </h1>
          <p className="text-gray-600 text-base mt-4 max-w-2xl mx-auto">
            We are dedicated to providing high-quality products with the best
            customer experience. Our goal is to make online shopping simple,
            secure, and enjoyable.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-sm shadow-sm border border-green-200">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-base">
              Our mission is to deliver premium products at affordable prices
              while ensuring fast delivery and secure payment options.
              Customer satisfaction is our top priority.
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-sm border border-green-200">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 text-base">
              We aim to become a trusted online shopping destination by
              offering a wide range of products and exceptional customer
              service across the country.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white p-10 rounded-sm shadow-sm border border-green-200">
          <h2 className="text-3xl font-semibold text-center text-green-600 mb-8">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600 text-base">
                We carefully select products to ensure the highest quality
                standards for our customers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-base">
                Quick and reliable shipping services so you receive your
                orders on time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600 text-base">
                Safe and encrypted payment gateways to protect your personal
                and financial information.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
