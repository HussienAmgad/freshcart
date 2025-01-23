import React, { useEffect, useState, useContext } from 'react';
import { LoadProducts, Wishlistinfproduct, addProductToCart, handleTowhishlist } from '../Utils/Utils'; // تأكد من مسار الاستيراد
import starsolid from '../../assets/star2.svg';
import starcolor from '../../assets/star.svg';
import starhalf from '../../assets/star-half.svg';
import { NavLink } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { ProductIdContext } from '../Context/ProductDetails';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Products() {
  let [Products, setProducts] = useState([]);
  let [searchTerm, setSearchTerm] = useState(''); // حالة لمصطلح البحث
  let [suggestions, setSuggestions] = useState([]); // حالة لتوقعات البحث
  let [Color, setColor] = useState({});
  let { setProductId } = useContext(ProductIdContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // حالة تحميل البيانات

  useEffect(() => {
    // تحميل المنتجات
    LoadProducts(setProducts);

    // دالة لتحميل قائمة المفضلة
    const fetchWishlist = async () => {
      try {
        let response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        });
        // تأكد من أن البيانات المخصصة للمنتجات هي مصفوفة قبل تحديث الحالة
        setWishlist(response.data.data || []);
      } catch (error) {
        console.error('Error loading wishlist data', error);
        setWishlist([]); // تأكد من أن `wishlist` تكون مصفوفة في حالة الخطأ
      }
    };

    fetchWishlist();
  }, []);


  function setIdFunction(productId) {
    setProductId(productId);
  }

  // تحديث التوقعات بناءً على الإدخال في حقل البحث
  function handleInputChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = Products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );

      // استخدام Set لمنع التكرار
      const uniqueSuggestions = Array.from(new Set(filteredSuggestions.map(product => product.title)))
        .map(title => filteredSuggestions.find(product => product.title === title));

      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  // عند اختيار اقتراح من القائمة المنسدلة
  function handleSuggestionClick(suggestion) {
    setSearchTerm(suggestion.title); // يتم ملء الحقل باسم المنتج
    setSuggestions([]); // إخفاء التوقعات بعد الاختيار
  }

  // تصفية المنتجات بناءً على مصطلح البحث
  const filteredProducts = Products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <ToastContainer />

      {/* حقل الإدخال للبحث */}
      <div className="w-full max-w-md mb-4 flex flex-col items-center relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        {/* قائمة التوقعات المنسدلة */}
        {suggestions.length > 0 && (
          <ul className="absolute top-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {filteredProducts.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
              {filteredProducts.map(product => (
                <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <NavLink to="/productdetails">
                    <img
                      onClick={() => setIdFunction(product.id)}
                      className="p-8 rounded-t-lg"
                      src={product.imageCover}
                      alt="product image"
                    />
                  </NavLink>
                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.category.name}</h5>
                    <h5 className="text-lg font-medium tracking-tight text-gray-700 dark:text-gray-200">{product.title}</h5>
                    <div className="mt-2.5 mb-5 flex items-center">
                      <span className="flex">
                        {Array.from({ length: 5 }, (_, index) => {
                          if (index < Math.floor(product.ratingsAverage)) {
                            return <img key={index} src={starcolor} className="w-4 h-4" alt="star" />;
                          } else if (index < product.ratingsAverage) {
                            return <img key={index} src={starhalf} className="w-4 h-4" alt="half star" />;
                          } else {
                            return <img key={index} src={starsolid} className="w-4 h-4" alt="star" />;
                          }
                        })}
                      </span>
                      <span className="ml-2">
                        <span className="bg-gray-200 text-gray-700 text-sm font-medium rounded-lg px-3 py-1.5">
                          {product.ratingsAverage.toFixed(1)}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.price} LE</span>
                      <button
                        onClick={() => handleTowhishlist(product.id, setColor, wishlist, setWishlist)}
                        className='flex items-center p-3 transition duration-200'
                      >
                        <i className="fa-solid fa-heart text-3xl" style={{ color: wishlist.some(item => item._id === product._id) ? "red" : "" }} />
                      </button>
                    </div>
                    <button onClick={() => addProductToCart(product.id)} className="text-white mt-5 w-full bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600">Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
          </>
      ) : (
        searchTerm.length > 0 ? (
          <div className='flex justify-center items-center h-full text-gray-700 text-xl font-semibold'>
            No results found
          </div>
        ) : (
          <div className='flex justify-center items-center h-full'>
            <HashLoader color="#5a9aa0" />
          </div>
        )
      )}
    </div>
  );

}