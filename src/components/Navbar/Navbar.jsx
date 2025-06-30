import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.svg';
import carticon from '../../assets/cart.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import HomeCart from '../HomeCart/HomeCart';
import { LoadCart } from '../Utils/Utils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let [Loading,setLoading] = useState(true)
  const [isCheck, setIsCheck] = useState(false);
  const [Cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false); // إضافة حالة جديدة للسلة
  const { cartInfo, setCartInfo } = useContext(CartContext);
  const userToken = localStorage.getItem('userToken');
  const navigate = useNavigate();

  useEffect(() => {
    setIsCheck(!!userToken);
    const fetchCart = async () => {
      try {
        await LoadCart(setCart, setLoading);
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };
    fetchCart();
  }, [userToken]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const signout = () => {
    localStorage.removeItem('userToken');
    setIsCheck(false);
    navigate('/');
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev); // تغيير حالة السلة
  };


  return (
    <nav className="bg-slate-300 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-1 text-black hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <i className="fa-solid fa-xmark h-6 w-6"></i>
              ) : (
                <i className="fa-solid fa-bars h-6 w-6"></i>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/">
                <img className="h-8 w-auto" src={logo} alt="Your Company" />
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block w-full">
              <div className="flex justify-between space-x-2">
                <div className="flex space-x-2">
                  {isCheck && (
                    <>
                      <NavLink to="home" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Home
                      </NavLink>
                      <NavLink to="cart" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Cart
                      </NavLink>
                      <NavLink to="products" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Products
                      </NavLink>
                      <NavLink to="whishlist" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Whishlist
                      </NavLink>
                      <NavLink to="allorders" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        allorders
                      </NavLink>
                      <NavLink to="categories" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Categories
                      </NavLink>
                      <NavLink to="brands" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Brands
                      </NavLink>
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  <div className="flex space-x-2 pt-1">
                    <i className="fa-brands mx-1 fa-facebook"></i>
                    <i className="fa-brands mx-1 fa-instagram"></i>
                    <i className="fa-brands mx-1 fa-tiktok"></i>
                    <i className="fa-brands mx-1 fa-twitter"></i>
                    <i className="fa-brands mx-1 fa-linkedin"></i>
                    <i className="fa-brands mx-1 fa-youtube"></i>
                  </div>
                  {isCheck ? (
                    <>
                      <div className="relative flex items-center justify-center" onClick={toggleCart}>
                        <img src={carticon} className='size-7' alt="Cart Icon" />
                        <span className="text-black text-2xl font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {Cart.numOfCartItems}
                        </span>
                      </div>
                      <NavLink onClick={signout} className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        SignOut
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Login
                      </NavLink>
                      <NavLink to="register" className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-200 hover:text-black">
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="flex flex-col items-center justify-center space-y-1 px-2 pb-3 pt-2">
            {isCheck && (
              <>
                <NavLink to="home" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Home
                </NavLink>
                <NavLink to="cart" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Cart
                </NavLink>
                <NavLink to="products" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Products
                </NavLink>
                <NavLink to="whishlist" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Whishlist
                </NavLink>
                <NavLink to="allorders" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  allorders
                </NavLink>
                <NavLink to="categories" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Categories
                </NavLink>
                <NavLink to="brands" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Brands
                </NavLink>
              </>
            )}
          </div>
          <div className="flex flex-col items-center space-y-1">
            {isCheck ? (<>
              <div className="relative flex items-center justify-center" onClick={toggleCart}>
                <img src={carticon} className='size-7' alt="Cart Icon" />
                <span className="text-black text-2xl font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {Cart.numOfCartItems}
                </span>
              </div>
              <NavLink onClick={signout} className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                SignOut
              </NavLink>
            </>
            ) : (
              <>
                <NavLink to="/" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Login
                </NavLink>
                <NavLink to="register" className="block rounded-md px-2 py-1 text-base font-medium text-black hover:bg-gray-200 hover:text-black">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
      {cartOpen && ( // عرض السلة عند فتحها
        <HomeCart isOpen={cartOpen} setIsOpen={setCartOpen} />
      )}
    </nav>
  );
}
