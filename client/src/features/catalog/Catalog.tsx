import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5264/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
