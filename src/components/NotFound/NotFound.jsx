import React from 'react';
import notFoundImage from '../../assets/error.svg'; // تأكد من أن المسار صحيح للصورة

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <img src={notFoundImage} alt="Page Not Found" className="h-screen w-screen" />
    </div>
  );
}
