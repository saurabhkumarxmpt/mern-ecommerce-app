import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/LatestProducts";
import TrustSection from "../components/home/TrustSection";

const HomePage=()=>{
    return(
        <>
       <HeroSection/>
       <CategorySection/>
       <FeaturedProducts/>
       <NewArrivals/>
       <TrustSection/>
        </>
    )
}

export default HomePage;