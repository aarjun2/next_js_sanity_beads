import React, { createContext, useState, useEffect} from "react";
import { getProducts } from "@/sanity/sanity-utils";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>{children}</ProductContext.Provider>
  );
}