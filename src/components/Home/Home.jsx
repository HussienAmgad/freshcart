import React, { useContext } from 'react';
import imgslide1 from '../../assets/slider-image-1.jpeg';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Slider from '../Slider/Slider';
import Products from '../Products/Products';

export default function Home() {

  return (
    <>
      <div className='w-full flex flex-1 items-center justify-center pr-10 pl-10'>
        <div className='lg:flex w-full h-auto justify-center items-start'>
          <div className='flex w-full lg:w-[70%] h-auto justify-center items-center'>
            <Swiper
              pagination={{ clickable: true }}
              navigation
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              className='flex w-[100%] h-full justify-center items-center'
            >
              <SwiperSlide><img src={imgslide1} className='w-full h-full' alt="Slider 1" /></SwiperSlide>
              <SwiperSlide><img src={imgslide1} className='w-full h-full' alt="Slider 2" /></SwiperSlide>
              <SwiperSlide><img src={imgslide1} className='w-full h-full' alt="Slider 3" /></SwiperSlide>
              <SwiperSlide><img src={imgslide1} className='w-full h-full' alt="Slider 4" /></SwiperSlide>
            </Swiper>
          </div>
          <div className='flex flex-col w-full lg:w-[30%] h-auto justify-center items-center mt-4 lg:mt-0'>
            <img src={img1} className='w-full h-auto max-h-[411px] min-h-[200px]' alt="Image 1" />
            <img src={img2} className='w-full h-auto max-h-[411px] min-h-[200px]' alt="Image 2" />
          </div>
        </div>
      </div>
      <div>
        <Slider />
        <Products />
      </div>
    </>
  );
}
