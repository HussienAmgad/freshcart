
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { ClearCartinf, LoadCartinf, RemoveIteminf } from '../Utils/Utils';
import { NavLink } from 'react-router-dom';

export default function HomeCart({ isOpen, setIsOpen }) { // تأكد من إضافة props isOpen و setIsOpen
    const [Cart, setCart] = useState({ data: { products: [], totalCartPrice: 0 } });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        LoadCartinf(setCart, setLoading);
    }, []);

    const handleClearCart = async () => {
        await ClearCartinf(setCart);
    };

    const Checkout = async () => {
        try {
            const sessionData = await createCheckoutSession();
            // معالجة sessionData حسب الحاجة
        } catch (error) {
            console.error('فشل في إنشاء جلسة الدفع:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await RemoveIteminf(id, setCart);
        } catch (error) {
            console.error('خطأ في إزالة العنصر:', error);
        }
    };

    const closeCart = () => {
        setIsOpen(false);
    };

    return (
        isOpen && ( // إظهار السلة فقط إذا كانت مفتوحة
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={closeCart}>
                                                    <span className="absolute -inset-0.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            {loading ? (
                                                <div className="flex justify-center items-center h-full">
                                                    <HashLoader color="#5a9aa0" />
                                                </div>
                                            ) : (
                                                Cart.data?.products.length > 0 ? (
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {Cart.data.products.map((item) => (
                                                            <li key={item._id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img src={item.product.imageCover} alt={item.product.title} className="h-full w-full object-cover object-center" />
                                                                </div>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href="#">{item.product.title}</a>
                                                                            </h3>
                                                                            <p className="ml-4">{item.price} LE</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">Qty {item.count}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <button
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            onClick={() => handleRemoveItem(item.product._id)}
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-center">
                                                        <h2 className="text-3xl font-semibold text-gray-600">Your cart is empty</h2>
                                                        <p className="text-gray-500 mt-4">Start adding some products to your cart!</p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Total</p>
                                            <p>{Cart.data.totalCartPrice} LE</p>
                                        </div>
                                        <div className="mt-6">
                                            <NavLink to="/cart" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
