import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    variations?: string[];
    shopID: number;
}

interface Shop {
    id: number;
    name: string;
    products: Product[];
}

interface CartItemProps {
    shop: Shop[];
    products: Product[];
    variationSelections?: { [key: number]: string };
    quantitySelections?: { [key: number]: number };
}
interface CartItem extends Product {
    quantity: number;
}

interface Cart {
    items: CartItem[];
}

const Cart: React.FC<CartItemProps> = ({ products }) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [cartProducts, setCartProducts] = useState<Product[]>(products);
    const [variationSelections, setVariationSelections] = useState<{ [key: number]: string }>({});
    const [quantitySelections, setQuantitySelections] = useState<{ [key: number]: number }>({});

    const handleCheckboxChange = (productId: number) => {
        if (selectedItems.includes(productId)) {
            setSelectedItems(selectedItems.filter((id) => id !== productId));
        } else {
            setSelectedItems([...selectedItems, productId]);
        }
    };

    const handleDeleteClick = (productId: number) => {
        setSelectedItems(selectedItems.filter((id) => id !== productId));
        setCartProducts(cartProducts.filter((product) => product.id !== productId));
        setVariationSelections({ ...variationSelections, [productId]: '' });
        setQuantitySelections({ ...quantitySelections, [productId]: 1 });
    };

    const handleVariationChange = (productId: number, value: string) => {
        setVariationSelections({ ...variationSelections, [productId]: value });
    };

    const handleQuantityChange = (productId: number, value: number) => {
        setQuantitySelections({ ...quantitySelections, [productId]: value });
    };

    const handleCheckOut = () => {
        const selectedProducts = cartProducts.filter(product => selectedItems.includes(product.id));
        const payload = selectedProducts.map(product => ({
            productId: product.id,
            variation: variationSelections[product.id] || null,
            quantity: quantitySelections[product.id] || 1,
            price: product.price,
        }));

        // Send the payload to the checkout page
        const history = useHistory(); // Access the history object
        history.push({
            pathname: '/checkout', // Specify the checkout page pathname
            state: { payload }, // Pass the payload as a state to the checkout page
        });

        // Reset the state of the cart
        setSelectedItems([]);
        setVariationSelections({});
        setQuantitySelections({});
    };

    const selectedProducts = cartProducts.filter((product) =>
        selectedItems.includes(product.id)
    );

    const subtotal = selectedProducts.reduce(
        (acc, product) => acc + (product.price * quantitySelections[product.id]),
        0
    );

    const totalQuantity = selectedProducts.reduce(
        (acc, product) => acc + (quantitySelections[product.id] ?? 1),
        0
    );

    const totalPrice = selectedProducts.reduce(
        (acc, product) =>
            acc + (product.price * (quantitySelections[product.id] ?? 1)),
        0
    );

    return (
        <div className="container py-2 mt-2 mx-auto w-full">
            <h2 className="text-[24px] font-simibold text-[#48466D] not-italic font-medium md:font-medium p-4">My Cart</h2>
            <div className="grid grid-cols-10 mx-6 p-2 text-[#52525B] border-b-2 border-[#52525B]">
                <p className="font-medium col-start-1 flex items-center col-span-2 mx-auto">Product</p>
                <p className="font-medium col-start-4 flex items-center col-span-2 mx-auto">Variation</p>
                <p className="font-medium col-start-6 flex items-center mx-auto">Unit Price</p>
                <p className="font-medium col-start-7 col-span-2 flex items-center mx-auto">Quantity</p>
                <p className="font-medium col-start-9 flex items-center mx-auto">Subtotal</p>
                <p className="font-medium col-start-10 flex items-center mx-auto">Action</p>

            </div>

            <div className="flex flex-col gap-2">
                {cartProducts.map((product) => (
                    <div key={product.id} className="grid grid-cols-10 mx-6 p-1 border-b border-[#52525B]">
                        <div className='col-start-1 col-span-3 flex items-center'>
                            <label className="p-4">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(product.id)}
                                    onChange={() => handleCheckboxChange(product.id)}
                                />
                            </label>
                            <div className="flex gap-8 items-center">
                                <img src={product.image} alt={product.name} className="w-12 h-12" />
                                <p className="font-medium">{product.name}</p>
                            </div>
                        </div>
                        <div className='col-start-4 flex items-center col-span-2 mx-auto'>
                            {product.variations && product.variations.length > 0 ? (
                                <select
                                    value={variationSelections[product.id] ?? ''}
                                    onChange={(e) => handleVariationChange(product.id, e.target.value)}
                                    className="block w-full px-2 py-2 border border-[#48466D] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] sm:text-sm mx-2 text-[#52525B]">
                                    <option value="">Select a variation</option>
                                    {product.variations.map((variation) => (
                                        <option key={variation} value={variation}>{variation}</option>
                                    ))}
                                </select>
                            ) : null}
                        </div>
                        <div className="col-start-6 flex items-center mx-auto">
                            <p className="mx-auto">฿{product.price}</p>
                        </div>
                        <div className="col-start-7 col-span-2 flex items-center mx-auto">
                            <input
                                type="number"
                                min={1}
                                value={quantitySelections[product.id] ?? 1}
                                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                className="w-24 py-1 px-2 border border-[#48466D] rounded-md focus:outline-none focus:ring-[#48466D] focus:border-[#48466D] sm:text-sm ml-2 text-center mx-auto"
                            />
                        </div>
                        <div className="col-start-9 flex items-center">
                            <p className="mx-auto">฿{product.price * quantitySelections[product.id] || product.price}</p>
                        </div>
                        <div className="col-start-10 flex items-center mx-auto">
                            <button
                                className="rounded-md border-2 border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300"
                                onClick={() => handleDeleteClick(product.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex flex-row justify-end mx-8 m-4 gap-8 items-center">
                    {totalQuantity >= 0 && (
                        <div className="flex items-center">
                            <p className="font-medium">Total ({totalQuantity} item(s)) :</p>
                            <p className="text-2xl font-semibold text-[#48466D] p-1">
                                ฿{totalPrice}
                            </p>
                        </div>
                    )}
                    <button
                        disabled={totalQuantity === 0}
                        className="rounded-md border-2 bg-[#48466D] px-5 py-2 text-sm font-medium text-white hover:bg-[#605d91] transition duration-300 w-32 h-12
                            disabled:border-[#48466D] disabled:bg-gray-300 disabled:text-[#48466D] disabled:cursor-not-allowed"
                        onClick={handleCheckOut}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Cart;