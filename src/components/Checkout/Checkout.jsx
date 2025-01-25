import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function Checkout() {
  const { CartId, checkout } = useContext(CartContext);
  const [onlin, setOnlin] = useState(true); // حالة الدفع عبر الإنترنت
  const navigate = useNavigate();

  async function handleCheckout(values) {
    if (CartId) {
      await checkout(CartId, values, navigate); // استدعاء دالة checkout مع cartId وقيم النموذج
    } else {
      console.log("Cart ID is missing.");
    }
  }

  useEffect(() => {
    if (CartId) {
      null
    }else{
      navigate("/")
    }
  
  }, [])
  

  async function payonline() {


    // استخرج التوكن من localStorage
    const token = localStorage.getItem('userToken'); 
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5174`,
        myForm.values,
        {
          headers: {
            token: token, // إرسال التوكن في الهيدر
          },
        }
      );

      if (response.data.status === "success") {
        window.location.href = "https://freshcart-hussien.vercel.app/orders"; // إعادة التوجيه إلى صفحة الدفع
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const myForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      if (onlin) { // إذا كان الدفع عبر الإنترنت
        payonline(values); // استدعاء دالة الدفع اونلاين
      } else {
        handleCheckout(values); // استدعاء دالة الدفع عند الاستلام
      }
    }
  });

  return (
    <>
      <form onSubmit={myForm.handleSubmit}>
        <div>
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Details</label>
          <input 
            onBlur={myForm.handleBlur} 
            type="text" 
            name="details" 
            id="details" 
            value={myForm.values.details} 
            onChange={myForm.handleChange} 
            placeholder="Enter address details" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
          <input 
            onBlur={myForm.handleBlur} 
            type="text" 
            name="phone" 
            id="phone" 
            value={myForm.values.phone} 
            onChange={myForm.handleChange} 
            placeholder="Enter phone number" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input 
            onBlur={myForm.handleBlur} 
            type="text" 
            name="city" 
            id="city" 
            value={myForm.values.city} 
            onChange={myForm.handleChange} 
            placeholder="Enter city" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
          />
        </div>

        {/* إضافة خيار الدفع */}
        <div className="flex items-center">
          <input 
            type="checkbox" 
            name="paymentMethod" 
            id="paymentMethod" 
            checked={onlin} 
            onChange={() => setOnlin(prevState => !prevState)} // تغيير الحالة بين الدفع اونلاين ودفع عند الاستلام
            className="mr-2"
          />
          <label htmlFor="paymentMethod" className="text-sm font-medium text-gray-900 dark:text-white">Pay Online</label>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Checkout</button>
      </form>
    </>
  );
}
