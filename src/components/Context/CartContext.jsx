import { createContext, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartInfo, setCartInfo] = useState(false); // Example state
  const [CartId, setCartId] = useState(null); // Example state
  const [checkoutResponse, setCheckoutResponse] = useState(null);

  const checkout = async (cartId, shippingDetails,navigate) => {
    const token = localStorage.getItem('userToken');
    
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details: shippingDetails.details,
            phone: shippingDetails.phone,
            city: shippingDetails.city
          }
        },
        {
          headers: {
            token: token
          }
        }
      );
      toast.success("تم الطلب بنجاح")
      setCheckoutResponse(data); 
      
      // الانتقال بعد نجاح عملية الـ checkout
      navigate("/"); // الانتقال إلى الصفحة الرئيسية
    } catch (error) {
      console.error("Error during checkout:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <ToastContainer />
    
      <CartContext.Provider value={{ CartId, setCartId, CartInfo, setCartInfo, checkout, checkoutResponse }}>
        {children}
      </CartContext.Provider>
    </>
  );
};
