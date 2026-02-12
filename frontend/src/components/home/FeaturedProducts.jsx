import React,{useState,useEffect} from 'react';
import { HomePage }from '../../services/HomePageServices';

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 129,
    image: "../../assets/hero/slide1.png",
  },
  {
    id: 2,
    name: "Bluetooth Headphones",
    price: 349,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Digital Camera",
    price: 239,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    name: "Gaming Headset",
    price: 249,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 5,
    name: "Security Camera",
    price: 219,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 6,
    name: "Mirrorless Camera",
    price: 349,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 7,
    name: "Laptop",
    price: 1499,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 8,
    name: "CCTV Camera",
    price: 349,
    image: "https://via.placeholder.com/200",
  },
];

const FeaturedProducts = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const[loading,setloading]=useState(true);

    useEffect(()=>{

        const fetchProducts= async()=>{
            try{
                const data=await HomePage();

                setFeaturedProducts(data.featured ||[]);
                console.log(data);
            }catch(err){
                console.log(err);
            }finally{
                setloading(false);
            }
        }

        fetchProducts();
    },[]);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-[80px]">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
            Featured <span className="text-green-700">Products</span>
          </h2>

          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition cursor-pointer">
            View All Products →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-sm shadow hover:shadow-md transition duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-30 object-contain"
                />
              </div>

              <h3 className="text-sm font-medium mb-2">
                {product.name}
              </h3>

              <p className="text-[13px] py-1 text-green-600">category/mobile</p>

              <p className="font-semibold text-gray-800 mb-3">
                ${product.price}
              </p>

              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
