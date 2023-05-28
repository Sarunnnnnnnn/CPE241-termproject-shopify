// import React, { useState } from "react";

// interface Product {
//   id: string;
//   name: string;
//   quantity: number;
//   variation: {
//     options: string[];
//     price: number;
//   };
//   image: string;
//   shopId: string;
// }

// interface Shop {
//   id: string;
//   name: string;
//   products: Product[];
// }

// interface CartProps {
//   shops: Shop[];
// }

// const Cart: React.FC<CartProps> = ({ shops }) => {
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

//   const handleProductSelection = (productId: string) => {
//     const selectedIndex = selectedProducts.indexOf(productId);
//     if (selectedIndex === -1) {
//       setSelectedProducts([...selectedProducts, productId]);
//     } else {
//       const updatedSelection = [...selectedProducts];
//       updatedSelection.splice(selectedIndex, 1);
//       setSelectedProducts(updatedSelection);
//     }
//   };

//   const handleRemoveSelectedProducts = () => {
//     // Logic to remove selected products from the cart
//     console.log("Selected Products:", selectedProducts);
//   };

//   const handleCheckout = () => {
//     // Logic to handle the checkout process
//     console.log("Checkout:", selectedProducts);
//   };

//   return (
//     <div className="container py-2 mt-2 mx-auto w-full">
//       <h2 className="text-24px font-semibold text-[#48466D] not-italic md:font-medium p-4">
//         My Cart
//       </h2>
//       <div className="grid grid-cols-10 mx-6 p-2 text-[#52525B] border-b-2 border-[#52525B]">
//         <p className="font-semibold col-start-1 flex items-center col-span-2 mx-auto">
//           Product
//         </p>
//         <p className="font-semibold col-start-4 flex items-center col-span-2 mx-auto">
//           Variation
//         </p>
//         <p className="font-semibold col-start-6 flex items-center mx-auto">
//           Unit Price
//         </p>
//         <p className="font-semibold col-start-7 col-span-2 flex items-center mx-auto">
//           Quantity
//         </p>
//         <p className="font-semibold col-start-9 flex items-center mx-auto">
//           Subtotal
//         </p>
//         <p className="font-semibold col-start-10 flex items-center mx-auto">
//           Action
//         </p>
//       </div>

//       <div className="flex flex-col gap-2">
//         {shops.map((shop) => (
//           <div key={shop.id}>
//             <h2 className="text-lg font-semibold mt-4">{shop.name}</h2>
//             {shop.products.map((product) => (
//               <div key={product.id} className="grid grid-cols-10 mx-6 p-1 border-b border-[#52525B]">
//                 <div className="col-start-1 col-span-3 flex items-center">
//                   <label className="p-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product.id)}
//                       onChange={() => handleProductSelection(product.id)}
//                     />
//                     Select
//                   </label>
//                   <div className="flex gap-8 items-center">
//                     <img src={product.image} alt={product.name} className="w-12 h-12" />
//                     <p className="font-medium">{product.name}</p>
//                   </div>
//                 </div>
//                 <div className="col-start-4 flex items-center col-span-2 mx-auto">
//                   {product.variation.options.length > 0 ? (
//                     <select
//                       value={product.variation.options[0]}
//                       onChange={(e) => console.log(e.target.value)}
//                       className="block w-full px-2 py-2 border border-[#48466D] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] sm:text-sm mx-2 text-[#52525B]"
//                     >
//                       {product.variation.options.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   ) : null}
//                 </div>
//                 <div className="col-start-6 flex items-center mx-auto">
//                   <p className="mx-auto">฿{product.variation.price}</p>
//                 </div>
//                 <div className="col-start-7 col-span-2 flex items-center mx-auto">
//                   <button className="w-8 h-8 bg-gray-200 text-gray-600" onClick={() => console.log("Minus")}>
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     min={1}
//                     value={product.quantity}
//                     onChange={(e) => console.log(e.target.value)}
//                     className="w-24 py-1 px-2 border border-[#48466D] rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] sm:text-sm ml-2 text-center mx-auto"
//                   />
//                   <button className="w-8 h-8 bg-gray-200 text-gray-600" onClick={() => console.log("Add")}>
//                     +
//                   </button>
//                 </div>
//                 <div className="col-start-9 flex items-center">
//                   <p className="mx-auto">฿{product.variation.price * product.quantity}</p>
//                 </div>
//                 <div className="col-start-10 flex items-center mx-auto">
//                   <button
//                     className="rounded-md border-2 border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300"
//                     onClick={() => console.log("Remove")}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//         <div className="flex flex-row justify-end mx-8 m-4 gap-8 items-center">
//           <div>
//             {selectedProducts.length > 0 && (
//               <div className="flex items-center">
//                 <p className="font-semibold">Total ({selectedProducts.length} item(s)):</p>
//                 {/* Implement the total price calculation */}
//               </div>
//             )}
//           </div>
//           <div>
//             <button
//               disabled={selectedProducts.length === 0}
//               className="rounded-md border-2 bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300 w-32 h-12 disabled:border-[#48466D] disabled:bg-gray-300 disabled:text-[#48466D] disabled:cursor-not-allowed"
//               onClick={handleCheckout}
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;












// import React, { useState } from 'react';

// export interface Product {
//     id: number;
//     name: string;
//     image: string;
//     price: number;
//     variations?: string[];
//     shopID: number;
// }

// export interface Shop {
//     id: number;
//     name: string;
//     products: Product[];
// }

// interface CartItemProps {
//     shop: Shop[];
//     products: Product[];
//     variationSelections?: { [key: number]: string };
//     quantitySelections?: { [key: number]: number };
// }
// interface CartItem extends Product {
//     quantity: number;
// }

// interface Cart {
//     items: CartItem[];
// }

// const Cart: React.FC<CartItemProps> = ({ products }) => {
//     const [selectedItems, setSelectedItems] = useState<number[]>([]);
//     const [cartProducts, setCartProducts] = useState<Product[]>(products);
//     const [variationSelections, setVariationSelections] = useState<{ [key: number]: string }>({});
//     const [quantitySelections, setQuantitySelections] = useState<{ [key: number]: number }>({});

//     const handleCheckboxChange = (productId: number) => {
//         if (selectedItems.includes(productId)) {
//             setSelectedItems(selectedItems.filter((id) => id !== productId));
//         } else {
//             setSelectedItems([...selectedItems, productId]);
//         }
//     };

//     const handleDeleteClick = (productId: number) => {
//         setSelectedItems(selectedItems.filter((id) => id !== productId));
//         setCartProducts(cartProducts.filter((product) => product.id !== productId));
//         setVariationSelections({ ...variationSelections, [productId]: '' });
//         setQuantitySelections({ ...quantitySelections, [productId]: 1 });
//     };

//     const handleVariationChange = (productId: number, value: string) => {
//         setVariationSelections({ ...variationSelections, [productId]: value });
//     };

//     const handleQuantityChange = (productId: number, value: number) => {
//         setQuantitySelections({ ...quantitySelections, [productId]: value });
//     };

//     // const handleCheckOut = () => {
//     //     console.log(selectedItems);
//     // };

//     const handleCheckOut = () => {
//         const selectedProducts = cartProducts.filter(product => selectedItems.includes(product.id));
//         const payload = selectedProducts.map(product => ({
//             productId: product.id,
//             variation: variationSelections[product.id] || null,
//             quantity: quantitySelections[product.id] || 1,
//             price: product.price,
//         }));

//         // Send the payload to a server or an external API
//         console.log('Selected products:', payload);

//         // Reset the state of the cart
//         setSelectedItems([]);
//         setVariationSelections({});
//         setQuantitySelections({});
//     };

//     const selectedProducts = cartProducts.filter((product) =>
//         selectedItems.includes(product.id)
//     );

//     const subtotal = selectedProducts.reduce(
//         (acc, product) => acc + (product.price * quantitySelections[product.id]),
//         0
//     );

//     const totalQuantity = selectedProducts.reduce(
//         (acc, product) => acc + (quantitySelections[product.id]),
//         0
//     );

//     return (
//         <div className="container py-2 mt-2 mx-auto w-full">
//             <h2 className="text-[24px] font-simibold text-[#48466D] not-italic font-medium md:font-medium p-4">My Cart</h2>
//             <div className="grid grid-cols-10 mx-6 p-2 text-[#52525B] border-b-2 border-[#52525B]">
//                 <p className="font-medium col-start-1 flex items-center col-span-2 mx-auto">Product</p>
//                 <p className="font-medium col-start-4 flex items-center col-span-2 mx-auto">Variation</p>
//                 <p className="font-medium col-start-6 flex items-center mx-auto">Unit Price</p>
//                 <p className="font-medium col-start-7 col-span-2 flex items-center mx-auto">Quantity</p>
//                 <p className="font-medium col-start-9 flex items-center mx-auto">Subtotal</p>
//                 <p className="font-medium col-start-10 flex items-center mx-auto">Action</p>

//             </div>

//             <div className="flex flex-col gap-2">
//                 {cartProducts.map((product) => (
//                     <div key={product.id} className="grid grid-cols-10 mx-6 p-1 border-b border-[#52525B]">
//                         <div className='col-start-1 col-span-3 flex items-center'>
//                             <label className="p-4">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedItems.includes(product.id)}
//                                     onChange={() => handleCheckboxChange(product.id)}
//                                 />
//                             </label>
//                             <div className="flex gap-8 items-center">
//                                 <img src={product.image} alt={product.name} className="w-12 h-12" />
//                                 <p className="font-medium">{product.name}</p>
//                             </div>
//                         </div>
//                         <div className='col-start-4 flex items-center col-span-2 mx-auto'>
//                             {product.variations && product.variations.length > 0 ? (
//                                 <select
//                                     value={variationSelections[product.id] ?? ''}
//                                     onChange={(e) => handleVariationChange(product.id, e.target.value)}
//                                     className="block w-full px-2 py-2 border border-[#48466D] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] sm:text-sm mx-2 text-[#52525B]">
//                                     <option value="">Select a variation</option>
//                                     {product.variations.map((variation) => (
//                                         <option key={variation} value={variation}>{variation}</option>
//                                     ))}
//                                 </select>
//                             ) : null}
//                         </div>
//                         <div className="col-start-6 flex items-center mx-auto">
//                             <p className="mx-auto">฿{product.price}</p>
//                         </div>
//                         <div className="col-start-7 col-span-2 flex items-center mx-auto">
//                             <input
//                                 type="number"
//                                 min={1}
//                                 value={quantitySelections[product.id] ?? 1}
//                                 onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
//                                 className="w-24 py-1 px-2 border border-[#48466D] rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] sm:text-sm ml-2 text-center mx-auto"
//                             />
//                         </div>
//                         <div className="col-start-9 flex items-center">
//                             <p className="mx-auto">฿{product.price * quantitySelections[product.id] || product.price}</p>
//                         </div>
//                         <div className="col-start-10 flex items-center mx-auto">
//                             <button
//                                 className="rounded-md border-2 border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300"
//                                 onClick={() => handleDeleteClick(product.id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//                 <div className="flex flex-row justify-end mx-8 m-4 gap-8 items-center">
//                     <div>
//                     {totalQuantity >= 0 && (
//                         <div className="flex items-center ">
//                             <p className="font-medium">Total ({totalQuantity} item(s)) : </p>
//                             <p className="text-2xl font-semibold text-[#48466D] p-1">฿{subtotal}</p>
//                         </div>
//                     )}
//                     </div>
//                     <div>
//                         <button
//                             disabled={totalQuantity === 0}
//                             className="rounded-md border-2 bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300 w-32 h-12
//                             disabled:border-[#48466D] disabled:bg-gray-300 disabled:text-[#48466D] disabled:cursor-not-allowed"
//                             onClick={handleCheckOut}
//                         >
//                             Checkout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;




















import React, { useState, useEffect } from 'react';

interface Shop {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    variations: string[];
    quantity: number;
    ShopID: number;
}

interface CartItemProps {
    shop: Shop[];
    products: Product[];
}

const Cart: React.FC<CartItemProps> = ({ shop, products }) => {
    // group products by shop
    const productsByShop = products.reduce((acc, product) => {
        if (!acc[product.ShopID]) {
            acc[product.ShopID] = [];
        }
        acc[product.ShopID].push(product);
        return acc;
    }, {} as Record<number, Product[]>);

 // get products of current shop
const cartProducts = productsByShop[shop[0]?.id] ?? [];

    // state for selected items
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    // state for variation selections
    const [variationSelections, setVariationSelections] = useState<Record<number, string>>({});
    // state for quantity selections
    const [quantitySelections, setQuantitySelections] = useState<Record<number, number>>({});

    // calculate total quantity
    const totalQuantity = cartProducts.reduce((acc, product) => {
        return acc + (quantitySelections[product.id] ?? product.quantity);
    }
        , 0);

    // calculate subtotal
    const subtotal = cartProducts.reduce((acc, product) => {
        return acc + (product.price * (quantitySelections[product.id] ?? product.quantity));
    }
        , 0);

    // handle checkbox change
    const handleCheckboxChange = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    // handle variation change
    const handleVariationChange = (id: number, variation: string) => {
        setVariationSelections({
            ...variationSelections,
            [id]: variation
        });
    }

    // handle quantity change
    const handleQuantityChange = (id: number, quantity: number) => {
        setQuantitySelections({
            ...quantitySelections,
            [id]: quantity
        });
    }

    // handle delete click
    const handleDeleteClick = (id: number) => {
        setSelectedItems(selectedItems.filter((item) => item !== id));
    }

    // handle checkout
    const handleCheckOut = () => {
        console.log('checkout');
    }

    return (
        <div className='flex flex-col'>
            <div className="flex flex-row justify-between items-center mx-8 m-4">
                <p className="text-2xl font-semibold text-[#48466D]">Shopping Cart</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center mx-8 m-4">
                    <p className="text-2xl font-semibold text-[#48466D]">{shop[0].name}</p>
                    <p className="text-sm font-medium text-[#48466D]">Total ({totalQuantity} item(s)) : ฿{subtotal}</p>
                </div>
                <div className="flex flex-col mx-8 m-4">
                    <div className="grid grid-cols-10 gap-4">
                        <div className="col-start-1 flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedItems.length === cartProducts.length}
                                onChange={() => {

                                }}
                                className="h-4 w-4 text-[#48466D] focus:ring-[#48466D] border-gray-300 rounded"
                            />
                        </div>
                        <div className="col-start-2 col-span-2 flex items-center">
                            <p className="font-medium text-[#48466D]">Product</p>
                        </div>
                        <div className="col-start-4 flex items-center">
                            <p className="font-medium text-[#48466D]">Variation</p>
                        </div>
                        <div className="col-start-5 flex items-center">
                            <p className="font-medium text-[#48466D]">Quantity</p>
                        </div>
                        <div className="col-start-6 flex items-center">
                            <p className="font-medium text-[#48466D]">Price</p>
                        </div>
                        <div className="col-start-7 flex items-center">
                            <p className="font-medium text-[#48466D]">Subtotal</p>
                        </div>
                        <div className="col-start-10 flex items-center">
                            <p className="font-medium text-[#48466D]">Action</p>
                        </div>
                    </div>
                    {cartProducts.map((product) => (
                        <div className="grid grid-cols-10 gap-4 my-4" key={product.id}>
                            <div className="col-start-1 flex items-center">
                                <input

                                    type="checkbox"
                                    checked={selectedItems.includes(product.id)}
                                    onChange={() => handleCheckboxChange(product.id)}
                                    className="h-4 w-4 text-[#48466D] focus:ring-[#48466D] border-gray-300 rounded"
                                />
                            </div>
                            <div className="col-start-2 col-span-2 flex items-center">
                                <img src={product.image} alt={product.name} className="w-20 h-20" />
                                <p className="font-medium text-[#48466D] ml-4">{product.name}</p>
                            </div>
                            <div className="col-start-4 flex items-center">
                                <select
                                    value={variationSelections[product.id] ?? product.variations[0]}
                                    onChange={(e) => handleVariationChange(product.id, e.target.value)}

                                    className="h-10 w-40 border border-gray-300 rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] text-[#48466D]">
                                    {product.variations.map((variation) => (
                                        <option key={variation} value={variation}>{variation}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-start-5 flex items-center">
                                <input

                                    type="number"
                                    value={quantitySelections[product.id] ?? product.quantity}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                    className="h-10 w-20 border border-gray-300 rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] text-[#48466D] text-center"
                                />
                            </div>
                            <div className="col-start-6 flex items-center">
                                <p className="font-medium text-[#48466D]">฿{product.price}</p>
                            </div>
                            <div className="col-start-7 flex items-center">
                                <p className="font-medium text-[#48466D]">฿{(quantitySelections[product.id] ?? product.quantity) * product.price}</p>
                            </div>
                            <div className="col-start-10 flex items-center">
                                <button
                                    onClick={() => handleDeleteClick(product.id)}
                                    className="h-10 w-10 bg-[#F5F5F5] rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] text-[#48466D]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mx-8 m-4">
                <button
                    onClick={handleCheckOut}
                    className="h-10 w-40 bg-[#48466D] rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] text-white">
                    <p className="font-medium text-sm">Check Out</p>
                </button>
            </div>
        </div>
    )
}

export default Cart
