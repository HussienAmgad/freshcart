
import React, { useEffect, useState } from 'react';
import { LoadAllCategories, LoadOneCategory } from '../Utils/Utils';
import { HashLoader } from 'react-spinners';

export default function Categories() {
  let [Categories, setCategories] = useState([]);
  let [OneCategory, setOneCategory] = useState(null); // استخدام الحالة للفئة الواحدة
  let [Name, setName] = useState(""); // استخدام الحالة للفئة الواحدة

  useEffect(() => {
    LoadAllCategories(setCategories);
  }, []);

  return (
    <div className='items-center justify-center'>
      <h1 className='text-green-600 text-center text-5xl'>All Categories</h1>
      {Categories.length > 0 ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {Categories.map(category => (
              <div
                key={category._id} // استخدام المفتاح الصحيح
                onClick={() => {
                  LoadOneCategory(setOneCategory, category._id); // جلب الفئة الواحدة عند النقر
                  setName(category.name); // تحديث الحالة للاسم
                }}
                className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer'
              >
                <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                <h1 className='text-center text-xl pb-8'>{category.name}</h1>
              </div>
            ))}
          </div>
          {OneCategory && (
            <div className='mt-8'>
              <h2 className='text-5xl text-center text-green-600'>{Name}</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                {OneCategory.map(subcategory => (
                  <div
                    key={subcategory._id}
                    className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'
                  >
                    <h1 className='text-center text-xl pb-4'>{subcategory.name}</h1>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <HashLoader color="#5a9aa0" />
        </div>
      )}
    </div>
  );
}
