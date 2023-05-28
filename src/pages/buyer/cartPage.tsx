import React from 'react';
import Cart from './cart'; // Update the path according to your file structure

const CartPage = () => {
  // Define sample shop data
  const shops = [
    { id: 1, name: 'Shop A' },
    { id: 2, name: 'Shop B' },
  ];

  // Define sample product data
  const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg', variations: ['Size 1', 'Size 2'], quantity: 5, ShopID: 1 },
    { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg', variations: ['Color 1', 'Color 2'], quantity: 3, ShopID: 1 },
    { id: 3, name: 'Product 3', price: 15, image: 'product3.jpg', variations: ['Option 1', 'Option 2'], quantity: 7, ShopID: 2 },
  ];

  return (
    <div>
      {/* Pass the shop and product data as props to the Cart component */}
      <Cart shop={shops} products={products} />
    </div>
  );
};

export default CartPage;
