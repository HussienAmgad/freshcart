import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function Order() {
  let [userid, setUserid] = useState("")
  let [data, setData] = useState("")
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let data = jwtDecode(window.localStorage.getItem('userToken'))
    setUserid(data.id)

    async function fetchOrders() {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`)
      setData(response.data)
    }
    fetchOrders()
  }, [userid])

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-all`}>
      <div className="max-w-7xl mx-auto p-6">

        {data ? (
          <div className="space-y-6">
            {data
              .filter(order => order && order.shippingAddress && order.cartItems && order.user) // تجاهل القيم null أو غير الموجودة
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // ترتيب من الأحدث إلى الأقدم
              .map(order => (
                <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{order.user?.name || "Unknown User"}</h3>
                    <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                  </div>

                  {/* Shipping Information */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Shipping Information:</h4>
                    <div className="text-sm text-gray-600">
                      <p><strong>Details:</strong> {order.shippingAddress.details || "N/A"}</p>
                      <p><strong>Phone:</strong> {order.shippingAddress.phone || "N/A"}</p>
                      <p><strong>City:</strong> {order.shippingAddress.city || "N/A"}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Order Items:</h4>
                    {order.cartItems.map(item => (
                      <div key={item._id} className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded-lg">
                        <img src={item.product?.imageCover || ""} alt={item.product?.title || "No Title"} className="w-24 h-24 object-cover rounded-md" />
                        <div className="ml-4 flex-1">
                          <h5 className="font-semibold text-gray-800">{item.product?.title || "Unknown Product"}</h5>
                          <p className="text-sm text-gray-500">{item.product?.category?.name || "Unknown Category"}</p>
                          <p className="mt-2 text-lg font-bold text-gray-900">{item.price || "0"} EGP</p>
                        </div>
                        <div className="text-sm text-gray-600">Qty: {item.count || "0"}</div>
                      </div>
                    ))}
                  </div>

                  {/* Payment and Order Summary */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-lg font-medium">Order Summary:</h4>
                      <div className="text-sm text-gray-600">
                        <p><strong>Payment Method:</strong> {order.paymentMethodType || "N/A"}</p>
                        <p><strong>Status:</strong> {order.isPaid ? 'Paid' : 'Pending'} | {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      <p>Total Price: {order.totalOrderPrice || "0"} EGP</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center text-lg">Loading orders...</div>
        )}
      </div>
    </div>
  )
}
