import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/LatestProducts";
import TrustSection from "../components/home/TrustSection";
import PromotionalBanner from "../components/home/PromotionalBanner";
import Newsletter from "../components/home/Newsletter";

const HomePage=()=>{
    return(
        <>
       <HeroSection/>
       <CategorySection/>
       <FeaturedProducts/>
       <PromotionalBanner/>
       <NewArrivals/>
       <TrustSection/>
       <Newsletter/>
        </>
    )
}

export default HomePage;