// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


import { Autoplay, Pagination } from 'swiper/modules';

export default function Brands() {
    return (
        <>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                
                modules={[Pagination,Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="/Assets/brands/amazon_vector.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/Assets/brands/amazon.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/Assets/brands/casio.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/Assets/brands/moonstar.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/Assets/brands/randstad.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/Assets/brands/star.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/Assets/brands/start_people.png" />
                </SwiperSlide>
                
            </Swiper>
        </>
    );
}
