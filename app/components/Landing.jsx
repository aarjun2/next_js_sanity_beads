import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductPage from "./Product";
import Hero from "./Hero";

export default function LandingPage() {
  const products = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const allCategories = Array.from(new Set(products.map(product => product.category)));
    setCategories(allCategories);
  }, [products]);

  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.includes(product.category);
    });

  const handleCategoryChange = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto flex">
          <div className="w-1/4 pr-4">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="block">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div className="w-3/4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-6 max-w-screen-xl mx-auto">
              {filteredProducts.map(product => (
                <ProductPage key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}