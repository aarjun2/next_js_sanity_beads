"use client"

import LandingPage from "../components/Landing";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { ProductProvider } from "../context/ProductContext";
import {SideBarProvider} from "../context/SideBarContext";
import {CartProvider} from "../context/CartContext"
import Footer from "../components/Footer";

export default function Landing() {

  return (
    <SideBarProvider>
      <CartProvider>
        <ProductProvider>
          <Header />
          <LandingPage />
          <SideBar />
          <Footer />
        </ProductProvider>
      </CartProvider>
    </SideBarProvider> 
  );
}