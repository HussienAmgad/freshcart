import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
export default function LayOut() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className='pt-[67px] flex-grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
