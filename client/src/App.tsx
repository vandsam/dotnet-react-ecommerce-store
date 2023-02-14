import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    {name: 'product1', price: 100.00},
    {name: 'product2', price: 200.00},
  ]);

  function addProduct() {
    setProducts(prevState => [...prevState, {name: "product" + (prevState.length + 1), price: (prevState.length + 1) * 100 }])
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
    <div className='app'>
      <h1>eCommerce Store</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
