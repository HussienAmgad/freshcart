import React, { useEffect, useState } from 'react'
import { LoadAllBrand, LoadOneBrand } from '../Utils/Utils'
import { HashLoader } from 'react-spinners'

export default function Brands() {
  let [Brands, setBrands] = useState([])
  let [OneBrand, setOneBrand] = useState(null)
  let [ShowAlert, setShowAlert] = useState(false)
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    LoadAllBrand(setBrands)
  }, [])

  async function Alert(id) {
    setIsLoading(true) // بدء التحميل
    await LoadOneBrand(setOneBrand, id)
    setIsLoading(false) // إيقاف التحميل بعد الجلب
    setShowAlert(true)
  }

  function CloseAlert() {
    setShowAlert(false)
  }

  return (
    <div className='items-center justify-center'>
      <h1 className='text-green-600 text-center text-5xl'>All Brands</h1>
      {Brands.length > 0 ? (
        <>        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
          {Brands.map(brand => (
            <div
              key={brand._id} 
              onClick={() => Alert(brand._id)}
              className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer items-center justify-center'
            >
              <img src={brand.image} alt={brand.name} className='items-center justify-center' />
              <h1 className='text-center text-xl pb-8'>{brand.name}</h1>
            </div>
          ))}
        </div>
  
        {ShowAlert && OneBrand && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full animate-fadeIn">
              {isLoading ? (
                <p>Loading...</p> // رسالة التحميل
              ) : (
                <div className='flex justify-between items-center'>
                  <div className='items-center justify-center'>
                    <h2 className="text-xl font-bold mb-4">
                      {OneBrand.name}
                    </h2>
                    <p className="mb-4">{OneBrand.slug}</p>
                  </div>
                  <img src={OneBrand.image} alt={OneBrand.name} className='w-52 h-52' />
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  onClick={CloseAlert}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
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
  )
}