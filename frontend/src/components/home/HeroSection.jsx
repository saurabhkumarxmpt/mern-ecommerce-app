import React, { useState, useEffect } from "react";
import slide1 from "../../assets/hero/slide1.png";
import slide2 from "../../assets/hero/slide2.png";
import slide3 from "../../assets/hero/slide3.png";

const slides = [
  {
    id: 1,
    image: slide1,
    title: "Modern Fashion",
    highlight: "Collection 2026",
    desc: "Discover premium styles designed for comfort and confidence.",
    btn: "Shop Now",
  },
  {
    id: 2,
    image: slide2,
    title: "Smart Gadgets",
    highlight: "Next Gen Tech",
    desc: "Upgrade your lifestyle with innovative electronics.",
    btn: "Explore Now",
  },
  {
    id: 3,
    image: slide3,
    title: "Home Essentials",
    highlight: "Luxury Living",
    desc: "Make your home elegant with trending decor.",
    btn: "Browse Items",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-gradient-to-r from-green-200 via-white to-green-50">

      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 flex items-center justify-between px-10 md:px-20 lg:px-[160px]"
          >
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
                {slide.title}
                <br />
                <span className="text-green-600">
                  {slide.highlight}
                </span>
              </h1>

              <p className="mt-4 text-gray-600 text-base md:text-lg">
                {slide.desc}
              </p>

              <button className="mt-6 bg-green-600 text-white px-7 py-3 rounded-full hover:bg-green-700 transition duration-300 shadow-md">
                {slide.btn}
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-end">
              <img
                src={slide.image}
                alt="product"
                className="w-[320px] md:w-[420px] lg:w-[480px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Small Bottom Right Indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-green-600 scale-125"
                : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;
