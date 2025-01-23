// Utils.js
import axios from 'axios';
import { toast } from 'react-toastify';

// ? ----------------------------Products--------------------------------//
export async function LoadProducts(setProducts) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
  } catch (error) {
    console.error('Error loading products', error);
  }
}

export async function addProductToCart(productId) {
  try {
    let response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
      { productId: productId },
      { headers: { token: localStorage.getItem('userToken') } }
    );
    toast.success(response.data.message); // تم تغيير 'data.message' إلى 'response.data.message'
  } catch (error) {
    let errorMessage = error.response?.data?.message || "Error adding product to cart";
    toast.error(errorMessage); // استخدام الرسالة الصحيحة في حالة حدوث خطأ
    console.error('Error adding product to cart:', error);
  }
}

// ? ----------------------------Start Brands--------------------------------//

export async function LoadAllBrand(setBrands) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    setBrands(data.data);
  } catch (error) {
    console.error('Error loading brands', error);
  }
}

export async function UpdateItemQuantity() {
  console.log("Hello");

}

export async function LoadOneBrand(setOneBrand, id) {
  try {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    setOneBrand(data.data);
  } catch (error) {
    console.error('Error loading brand', error);
  }
}

// ? ----------------------------End Brands--------------------------------//

// ? ----------------------------Start Category--------------------------------//


export async function LoadAllCategories(setCategories) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setCategories(data.data);
  } catch (error) {
    console.error('Error loading categories', error);
  }
}

// دالة جلب فئة واحدة
export async function LoadOneCategory(setOneCategory, id) {
  try {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    setOneCategory(data.data);  // تأكد من أن البيانات تتضمن subcategories
  } catch (error) {
    console.error('Error loading category', error);
  }
}

// ? ----------------------------End Categories--------------------------------//

// ? ----------------------------Start Cart--------------------------------//


export async function LoadCart(setCart, setLoading) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    setCart(data);
  } catch (error) {
    console.error('Error loading cart data', error);
  } finally {
    setLoading(false); // Stop loading after fetching data
  }
}

export async function ClearCart(setCart) {
  try {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    setCart(data); // Update cart state after clearing
  } catch (error) {
    console.error('Error clearing cart', error);
  }
}

export async function ClearCartinf(setCart) {
  try {
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    setCart(data); // Update cart state after clearing
  } catch (error) {
    console.error('Error clearing cart', error);
  }
}

export async function LoadCartinf(setCart, setLoading) {
  try {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    setCart(data);
  } catch (error) {
    console.error('Error loading cart data', error);
  } finally {
    setLoading(false); // Stop loading after fetching data
  }
}

export async function RemoveItem(id, setCart) {
  try {
    let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    setCart(data); // Update cart state after removing item
  } catch (error) {
    console.error('Error removing item', error);
  }
}

export async function RemoveIteminf(id, setCart) {
  try {
    let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    setCart(data); // Update cart state after removing item
  } catch (error) {
    console.error('Error removing item', error);
  }
}

// ? ----------------------------End Cart--------------------------------//

// ? ----------------------------Start Whishlist--------------------------------//

export async function handleAddTowhishlist(Id) {
  try {
    let response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: Id },
      { headers: { token: localStorage.getItem('userToken') } }
    );
    toast.success(response.data.message); // تم تغيير 'data.message' إلى 'response.data.message'
  } catch (error) {
    let errorMessage = error.response?.data?.message || "Error adding product to cart";
    toast.error(errorMessage); // استخدام الرسالة الصحيحة في حالة حدوث خطأ
    console.error('Error adding product to cart:', error);
  }
}


export async function handleTowhishlist(Id, setColors, wishlist, setWishlist) {
  const isInWishlist = wishlist.some(item => item.id === Id);

  try {
    if (!isInWishlist) {
      // إضافة إلى المفضلة
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: Id },
        { headers: { token: localStorage.getItem('userToken') } }
      );
      toast.success(response.data.message);
      
      // تحديث اللون للمنتج المحدد فقط
      setColors(prevColors => ({ ...prevColors, [Id]: '#ff0000' }));
      setWishlist(prevWishlist => [...prevWishlist, { id: Id }]);
    } else {
      // إزالة من المفضلة
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`,
        { headers: { token: localStorage.getItem('userToken') } }
      );
      toast.success(response.data.message);
      
      // إعادة اللون للمنتج المحدد فقط
      setColors(prevColors => ({ ...prevColors, [Id]: '' }));
      setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== Id));
    }
  } catch (error) {
    let errorMessage = error.response?.data?.message || "Error updating wishlist";
    toast.error(errorMessage);
    console.error('Error updating wishlist:', error);
  }
}




export async function handleremoveTowhishlist(Id) {
  try {
    let response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: Id },
      { headers: { token: localStorage.getItem('userToken') } }
    );
    toast.success(response.data.message); // تم تغيير 'data.message' إلى 'response.data.message'
  } catch (error) {
    let errorMessage = error.response?.data?.message || "Error adding product to cart";
    toast.error(errorMessage); // استخدام الرسالة الصحيحة في حالة حدوث خطأ
    console.error('Error adding product to cart:', error);
  }
}

export async function Wishlistinf(setWishlist) {
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
}

export async function Wishlistinfproduct(setWishlist) {
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
}

export async function removeWishlistitem(id) {
  try {
    let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  } catch (error) {
    console.error('Error loading wishlist data', error);
  }
}

// ? ----------------------------End Whislist--------------------------------//