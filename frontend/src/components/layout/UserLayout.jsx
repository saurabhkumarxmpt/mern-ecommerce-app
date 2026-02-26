import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MiniCart from "../home/MiniCart";

const Layout=()=>{

    const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
    return(
        <>
        <Navbar setIsMiniCartOpen={setIsMiniCartOpen}/>
        <MiniCart 
        isOpen={isMiniCartOpen} 
        setIsOpen={setIsMiniCartOpen}
      />
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout;