import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MiniCart from "../home/MiniCart";

const Layout=()=>{
    
    return(
        <>
        <Navbar/>
        <MiniCart/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout;