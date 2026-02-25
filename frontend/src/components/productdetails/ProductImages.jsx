const ProductImages = ({ selectedImage, setSelectedImage, images }) => {
  return (
    <div>
      {/* Main Image Container */}
      <div className="w-full max-w-lg h-[500px] border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden  group">
        
        <img
          src={selectedImage}
          alt="Product"
          className="h-[400px] object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 mt-5">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumb"
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300
            ${
              selectedImage === img
                ? "border-green-500 scale-105"
                : "border-gray-300 hover:border-green-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
