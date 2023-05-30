import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './addressData';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    variations?: string[];
    quantity: number;
    shopID: number;
}

interface Shop {
    id: number;
    name: string;
    products: Product[];
}

interface Address {
    id: number;
    fullName: string;
    addressDesc: string;
    district: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
}

interface MyAddressProps {
    addresses: Address[];
    onAddressesUpdate: (addresses: Address[]) => void;
}

interface Account {
    id: number;
    fullName: string;
    bankname: string;
    accountNumber: string;
}

interface AccountProps {
    accounts: Account[];
}

interface CheckoutProps {
    products: Product[];
}

interface PaymentMethod {
    id: number;
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
}

const CheckoutPage: React.FC = () => {
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

    const handleAddressSelection = (address: Address) => {
        setSelectedAddress(address);
    };

    const handlePaymentMethodSelection = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
    };

    const handlePlaceOrder = () => {
        // send order data to the server

        // Reset the form and display success message
        setSelectedAddress(null);
        setSelectedPaymentMethod(null);
        alert("Order placed successfully!");
    };

    const savedAddresses: Address[] = [
        // Add saved addresses here
    ];

    const products: Product[] = [
        // Add products here
    ];

    // Placeholder data for payment methods
    const savedPaymentMethods: PaymentMethod[] = [
        // Add saved payment methods here
    ];

    return (
        <div className="container py-2 mt-2 mx-auto w-full">
            <h2 className="text-2xl font-semibold text-[#48466D] not-italic md:font-medium p-4">
                Check Out
            </h2>
            <div className="flex flex-col md:flex-row">
                {/* select shipping address */}
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="text-2xl text-[#48466D] not-italic font-medium md:font-medium mb-4 ">
                        Shipping Address
                    </div>
                    <div className="max-w-screen-lg">
                        <div className="border-b border-gray-200 mt-4  "> </div>
                        {/* show the selected shipping address */}
                        {selectedAddress && (
                            <div className="border max-w-screen-xl p-4 my-4 grid grid-cols-4">
                                <div className="mx-3 text-2xl text-[#52525B] col-start-1 col-span-3">
                                    <p className="font-bold ">{selectedAddress.fullName}</p>
                                    <p>{selectedAddress.phoneNumber}</p>
                                    <p>{selectedAddress.addressDesc} {selectedAddress.district} {selectedAddress.province} {selectedAddress.postalCode}</p>
                                </div>
                                <div className="flex justify-end mt-4 col-start-4">
                                    <button
                                        className="justify-center rounded-md border border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300; mr-2 h-10"
                                        onClick={() => handleAddressSelection(selectedAddress)}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* show wtb products */}
                <div className="grid grid-cols-10 mx-6 p-2 text-[#52525B] border-b-2 border-[#52525B]">
                    <p className="font-medium col-start-1 flex items-center col-span-2 mx-auto">Product</p>
                    <p className="font-medium col-start-4 flex items-center col-span-2 mx-auto">Variation</p>
                    <p className="font-medium col-start-6 flex items-center mx-auto">Unit Price</p>
                    <p className="font-medium col-start-7 col-span-2 flex items-center mx-auto">Quantity</p>
                    <p className="font-medium col-start-9 flex items-center mx-auto">Subtotal</p>
                </div>
                <div className="flex flex-col gap-2">
                    {products.map((product) => (
                        <div key={product.id} className="grid grid-cols-10 mx-6 p-1 border-b border-[#52525B]">
                                    <p className="font-medium col-start-1">{product.name}</p>
                                    <img src={product.image} alt={product.name} className="w-12 h-12 col-start-2" />
                                    <p className="font-medium col-start-4">฿{product.variations}</p> 
                                    <p className="font-medium col-start-6">฿{product.price}</p>
                                    <p className="font-medium col-start-7">฿{product.quantity}</p>
                                    <p className="font-medium col-start-9">฿{product.price * product.quantity}</p>
                        </div>
                    ))}
                    totalPrice = {products.reduce((total, product) => total + product.price * product.quantity, 0)}
                    totalQuantity = {products.reduce((total, product) => total + product.quantity, 0)}
                </div>
                {/* select payment method */}
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="text-2xl text-[#48466D] not-italic font-medium md:font-medium mb-4 ">
                        Payment Method
                    </div>
                    <div className="max-w-screen-lg">
                        <div className="border-b border-gray-200 mt-4  "> </div>
                        {/* show the selected payment method */}
                        {selectedPaymentMethod && (
                            <div className="border max-w-screen-xl p-4 my-4 grid grid-cols-4">
                                <div className="mx-3 text-2xl text-[#52525B] col-start-1 col-span-3">
                                    <p className="font-bold ">{selectedPaymentMethod.cardHolder}</p>
                                    <p>{selectedPaymentMethod.cardNumber}</p>
                                    <p>{selectedPaymentMethod.expirationDate}</p>
                                </div>
                                <div className="flex justify-end mt-4 col-start-4">
                                    <button
                                        className="justify-center rounded-md border border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300; mr-2 h-10"
                                        onClick={() => handlePaymentMethodSelection(selectedPaymentMethod)}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    className="justify-center rounded-md border border-[#48466D] bg-white px-6 py-2 text-sm font-medium text-[#48466D] hover:bg-[#605d91] hover:text-white transition duration-300; mr-2 h-10"
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;