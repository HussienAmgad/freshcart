import React, { useState, useEffect, useContext } from 'react';
import { addProductToCart, Wishlistinf, removeWishlistitem } from '../Utils/Utils'; // تأكد من مسار الاستيراد
import { HashLoader } from 'react-spinners'; // استيراد HashLoader
import { ProductIdContext } from '../Context/ProductDetails';
import { NavLink } from 'react-router-dom';

export default function FavoriteItems() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true); // حالة تحميل البيانات
    let { setProductId } = useContext(ProductIdContext);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                await Wishlistinf(setWishlist); // استدعاء الدالة لجلب البيانات
            } finally {
                setLoading(false); // تغيير حالة التحميل بعد جلب البيانات
            }
        };
        fetchWishlist();
    }, []);

    function setIdFunction(productId) {
        setProductId(productId);
    }

    const handleaddtocartItem = async (id) => {
        try {
            await addProductToCart(id);
            await removeWishlistitem(id);
            setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await removeWishlistitem(id);
            setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    return (
        <section className="py-10 px-4 bg-gray-50">
            <div className='text-center'> {/* إضافة text-center لتمركز النصوص */}
                <h2 className="text-2xl font-semibold mb-2">Your Favorite Items</h2>
                <p className="text-gray-500 mb-6">There are {wishlist.length} products in this list</p>
            </div>
            {loading ? ( // إذا كانت حالة التحميل True، عرض اللودينغ
                <div className='flex justify-center items-center h-full'>
                    <HashLoader color="#5a9aa0" />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left font-semibold text-sm sm:px-6 sm:py-4 whitespace-nowrap">Product</th>
                                <th className="px-4 py-2 text-left font-semibold text-sm sm:px-6 sm:py-4 whitespace-nowrap">Price</th>
                                <th className="px-4 py-2 text-left font-semibold text-sm sm:px-6 sm:py-4 whitespace-nowrap">Action</th>
                                <th className="px-4 py-2 text-left font-semibold text-sm sm:px-6 sm:py-4 whitespace-nowrap">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.length > 0 ? (
                                wishlist.map((product) => (
                                    <tr key={product.id} className="border-t">
                                        <NavLink to="/productdetails">
                                            <td className="px-4 py-2 flex items-center space-x-4 sm:px-6 sm:py-4">
                                                <img onClick={() => setIdFunction(product.id)}
                                                    src={product.imageCover} alt={product.title} className="w-12 h-12 rounded" />
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-800 sm:text-md pr-5">{product.title}</h3>
                                                    <p className='hidden sm:block text-sm font-semibold text-gray-400 sm:text-md pr-5'>
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </td>
                                        </NavLink>
                                        <td className="px-4 py-2 text-gray-700 font-semibold sm:px-6 sm:py-4">${product.price}</td>
                                        <td className="px-4 py-2 sm:px-6 sm:py-4">
                                            <button onClick={() => handleaddtocartItem(product.id)} className="px-4 py-2 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 sm:text-sm">
                                                Add to Cart
                                            </button>
                                        </td>
                                        <td className="px-2 py-2 sm:px-6 sm:py-4 justify-center items-center">
                                            <button className="text-red-500 hover:text-red-700 text-xs">
                                                <i onClick={() => handleRemoveItem(product.id)} className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">No products added to the wishlist.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}