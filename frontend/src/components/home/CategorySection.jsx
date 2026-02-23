import React, { useRef,useState,useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "../../services/CategoryServices";

const categories = [
  { id: 1, name: "Electronics", emoji: "📱" },
  { id: 2, name: "Fashion", emoji: "👗" },
  { id: 3, name: "Shoes", emoji: "👟" },
  { id: 4, name: "Beauty", emoji: "💄" },
  { id: 5, name: "Books", emoji: "📚" },
  { id: 6, name: "Sports", emoji: "⚽" },
  { id: 6, name: "Sports", emoji: "⚽" },
  { id: 6, name: "Sports", emoji: "⚽" },
  { id: 6, name: "Sports", emoji: "⚽" },
];

const CategorySection = () => {
  const scrollRef = useRef(null);

  const[category,setCategory]=useState([]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const fetchedCategory=async()=>{
    try{
        const category=await Category();
        setCategory(category);
        console.log(category);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchedCategory();
  },[]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-[80px]">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
            Browse by <span className="text-green-700">Category</span>
          </h2>

          {/* Scroll Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-white shadow rounded-full hover:bg-green-200 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="p-2 bg-white shadow rounded-full hover:bg-green-200 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[180px] border border-gray-200 bg-white rounded-lg shadow hover:shadow-md transition duration-300 p-6 text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">
                {category.emoji}
              </div>
              <h3 className="text-lg font-medium">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
