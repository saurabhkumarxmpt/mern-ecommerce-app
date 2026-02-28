import React,{useState,useEffect} from 'react';
import { HomePage }from '../../services/HomePageServices';
import {Link,useNavigate} from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Logitech G320 Gaming Headphone",
    price: "$399.00",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
  },
  {
    id: 2,
    name: "Smart Watch for Men",
    price: "$379.00",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    id: 3,
    name: "ASUS Gaming Headset",
    price: "$549.00",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
  },
];

const NewArrivals = () => {

    const navigate=useNavigate();
    const [newProducts, setNewProducts] = useState([]);
    const[loading,setloading]=useState(true);
    
        useEffect(()=>{
    
            const fetchProducts= async()=>{
                try{
                    const data=await HomePage();
    
                    setNewProducts(data.latest ||[]);
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
    <section className="max-w-6xl mx-auto px-4 py-[80px] bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-20">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
           New <span className="text-green-600">Arrivals</span> 
            </h2>
        <button 
        className="bg-green-600 text-white px-5 py-2 rounded-sm hover:bg-green-700 transition cursor-pointer"
        onClick={()=>navigate('/products')}
        >
          View All Products →
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Featured Product */}
        {newProducts[0] &&(
        <div className="bg-gray-100 rounded-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold mb-5 text-gray-700">
              {newProducts[0].name}
            </h3>
            <p>{newProducts[0].dec}</p>
            <button 
            className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition"
            onClick={()=> navigate(`/products/${newProducts[0]._id}`)}
            >
              Shop Now →
            </button>
          </div>

          <img
            src={newProducts[0].images[0]}
            alt="phone"
            className="w-full mt-6 object-contain h-72"
          />
           
        </div>
         )}

        {/* Right Product List */}
        <div className="space-y-4 text-gray-700 pb-10">
          {newProducts.slice(1).map((item) => (
            <Link key={item._id} to={`/products/${item._id}`} className="block">
              <div
                className="flex items-center bg-gray-100 gap-4 border rounded-sm border-gray-300 p-4 hover:shadow-md transition hover:-translate-y-1"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-700">{item.name}</h4>
                  <p className="text-green-500 text-sm">category/{item.category}</p>
                  <p className="font-md text-md">Rs.{item.price}/-</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
