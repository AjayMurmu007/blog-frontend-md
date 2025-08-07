import React from 'react'
import img1 from '../../assets/hero-carousel/img1.jpg';
import img2 from '../../assets/hero-carousel/img2.jpg';
import img3 from '../../assets/hero-carousel/img3.jpg';
import img4 from '../../assets/hero-carousel/img4.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
      <div className='md:w-1/2 w-full text-center'>
        <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>Living the High Life: Rooftop Pool Hotels You Can’t Miss</h1>
        <p className='py-4'>Craving luxury, skyline views, and the ultimate swim? Discover the most jaw-dropping rooftop pool hotels from around the world — where relaxation meets elevation. From infinity edges overlooking bustling cityscapes to serene rooftop oases in tropical destinations, these hotels offer more than just a place to stay — they offer an experience. Whether you're planning your next vacation or just dreaming big, these rooftop pool spots are pure travel goals. </p>
      </div>
      <div className='md:w-1/2 w-full mx-auto'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt='' className='w-full lg:h-[420px] sm:h-[96px] h-80px' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt='' className='w-full lg:h-[420px] sm:h-[96px] h-80px' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt='' className='w-full lg:h-[420px] sm:h-[96px] h-80px' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt='' className='w-full lg:h-[420px] sm:h-[96px] h-80px' />
        </SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}

export default Hero
