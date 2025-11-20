

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { use } from 'react';
import ReviewsCard from './ReviewsCard';



export default function Reviews({reviewsPromise}) {
const reviews = use(reviewsPromise);
console.log(reviews);

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 20,
                    stretch: '50%',
                    depth: 100,
                    modifier: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay:2000,
                    disableOnInteraction:false,
                }}
                loop={true}
                pagination={true}
                modules={[EffectCoverflow, Pagination,Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map((review,index) => <SwiperSlide key={index}>
                        <ReviewsCard review={review}/>
                    </SwiperSlide>)
                }
            </Swiper>
        </>
    );
}
