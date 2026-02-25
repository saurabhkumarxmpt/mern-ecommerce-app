import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSingleProduct,GetRelatedProducts } from "../services/ProductServices";
import ProductBreadcrumb from "../components/productdetails/ProductBreadcrumb";
import ProductImages from "../components/productdetails/ProductImages";
import RightSideDetails from "../components/productdetails/RightSideDetails";
import ProductDescription from "../components/productdetails/ProductDescription";
import TrustBanner from "../components/productdetails/Benner";
import RelatedProducts from "../components/productdetails/RelatedProdcuts";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts,setRelatedProducts]=useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await GetSingleProduct(id);
        setProduct(res);
        setSelectedImage(res.images[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const relatedPorduct=async()=>{
      try{
      const res=await GetRelatedProducts(id);
      setRelatedProducts(res);
      }catch(err){
        console.error(err)
      }
    }

    fetchProduct();
    relatedPorduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;
  console.log(product);
  console.log(relatedProducts);

  return (
    <>
    <ProductBreadcrumb name={product.name} />
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10  px-[80px]">
        {/* LEFT SIDE */}
        <ProductImages
        selectedImage={selectedImage}
        images={product.images}
        setSelectedImage={setSelectedImage}
        />

      {/* RIGHT SIDE DETAILS */}
        <RightSideDetails 
        product={product}
        />
    </div>
    <ProductDescription
    product={product}
    selectedImage={selectedImage}
    />
    <TrustBanner/>
    <RelatedProducts
    products={relatedProducts}
    />
</>
  );
};

export default ProductDetails;
