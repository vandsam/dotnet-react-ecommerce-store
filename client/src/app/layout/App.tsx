import React, { useState, useEffect } from 'react';
import './styles.css';
import { Product } from '../models/product';
import Catalog from '../../features/catalog/Catalog';
import { Typography } from '@mui/material';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct() {
    setProducts(prevState => [...prevState, 
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1), 
        price: (prevState.length + 1) * 100,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: `http://picsum.photos/${200 + prevState.length}`
      }
    ])
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch('http://localhost:5264/api/products');
      const data = await response.json();
      setProducts(data)
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state
  
  return (
    <>
      <Typography variant='h1'>eCommerce Store</Typography>
      <Catalog products={products} addProduct={addProduct}/>
    </>
  );
}

export default App;
