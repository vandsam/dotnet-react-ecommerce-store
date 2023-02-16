import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5264/api/products");
      setProducts(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
