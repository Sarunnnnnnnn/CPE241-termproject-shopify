import React from 'react';
import Cart from './cart'; // Update the path according to your file structure
import Product1 from '../../images/applewatch.jpg'
import Product2 from '../../images/lightstrip.jpg'
import Product3 from '../../images/mascara.jpg'

const CartPage = () => {
  // Define sample shop data
  const shops = [
    { id: 1, name: 'Shop A' },
    { id: 2, name: 'Shop B' },
  ];

  // Define sample product data
  const products = [
    { id: 1, name: 'Apple Watch', price: 15000, image: Product1, variations: ['Size 1', 'Size 2'], quantity: 5, ShopID: 1 },
    { id: 2, name: 'Lightstrip', price: 300, image: Product2, variations: ['Color 1', 'Color 2'], quantity: 3, ShopID: 1 },
    { id: 3, name: 'Mascara', price: 250, image: Product3, variations: ['Option 1', 'Option 2'], quantity: 7, ShopID: 2 },
  ];

  return (
    <div>
      {/* Pass the shop and product data as props to the Cart component */}
      <Cart shop={shops} products={products} />
    </div>
  );
};

export default CartPage;
