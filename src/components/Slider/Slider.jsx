import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import { HashLoader } from 'react-spinners'; // استيراد HashLoader
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // حالة للودر

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
                setCategories(data.data); // Assuming 'data.data' contains the list of categories
                setLoading(false); // إيقاف اللودر بعد تحميل البيانات
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Fetching categories failed!";
                console.error("Error fetching categories:", errorMessage);
                setLoading(false); // إيقاف اللودر حتى في حالة الخطأ
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='w-full h-auto'>
            {loading ? (
                <div className='flex justify-center items-center h-[500px]'>
                    <HashLoader color="#5a9aa0" />
                </div>
            ) : (
                <Swiper
                    pagination={{ clickable: true }}
                    navigation
                    modules={[Navigation, Pagination]}
                    spaceBetween={20} // Space between slides
                    slidesPerView={1} // Default number of slides
                    loop={true}
                    className='w-full h-auto'
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div className='w-full h-[500px] justify-center items-center pt-10 pb-14'>
                                <img src={category.image} alt={category.name} className='w-full h-full' />
                                <h3 className='text-center text-lg pb-32'>{category.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
