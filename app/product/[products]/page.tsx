"use client";

import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import IndividualProducts from "@/app/components/ProductDetails";
import { ProductProvider } from "@/app/context/ProductContext";
import { CartProvider } from "@/app/context/CartContext";
import { SideBarProvider } from "@/app/context/SideBarContext";


export default function productDetails() {
    return (
        <SideBarProvider>
            <CartProvider>
                <ProductProvider>
                    <Header />
                    <IndividualProducts />
                    <SideBar />
                </ProductProvider>
            </CartProvider>
        </SideBarProvider>
    )
}