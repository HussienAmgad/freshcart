import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProductIdContext } from '../Context/ProductDetails';
import { HashLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, handleAddTowhishlist } from '../Utils/Utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const { productId } = useContext(ProductIdContext);

  async function getProductDetails() {
    if (!productId) {
      navigate("/products");
      return;
    }

    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setProductDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  }

  const handleAddToCart = (productId) => {
    addProductToCart(productId);
    toast.success("Product added to cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // سيغلق بعد 3 ثوانٍ
    });
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  return (
    <div className="bg-gray-100 py-6">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-2">
          {/* صور المنتج */}
          <div className="md:w-1/3 px-2 mb-6">
            {productDetails ? (
              <>
                <img
                  src={productDetails.images && productDetails.images[0]}
                  alt={productDetails.title}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  id="mainImage"
                />
                <div className="flex gap-2 justify-center overflow-x-auto">
                  {productDetails.images && productDetails.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-16 w-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                      onClick={() => document.getElementById('mainImage').src = image}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className='flex justify-center items-center h-full'>
                <HashLoader color="#5a9aa0" />
              </div>
            )}
          </div>

          {/* تفاصيل المنتج */}
          <div className="w-full md:w-1/2 px-2">
            {productDetails ? (
              <>
                <h2 className="text-2xl font-bold mb-1 text-left">{productDetails.title}</h2>
                <p className="text-gray-600 mb-2 text-left">SKU: {productDetails.sku || 'N/A'}</p>
                <div className="mb-2 text-left">
                  <span className="text-xl font-bold mr-2">{productDetails.price} LE</span>
                  {productDetails.oldPrice && (
                    <span className="text-gray-500 line-through">{productDetails.price} LE</span>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <p className='pl-2'>{productDetails.ratingsAverage}</p>
                </div>
                <p className="text-md text-gray-700 text-left">{productDetails.description}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(productDetails.id)}
                    className="bg-indigo-600 flex gap-2 items-center text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddTowhishlist(productDetails.id)}
                    className="bg-gray-200 flex gap-2 items-center text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    Wishlist
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
