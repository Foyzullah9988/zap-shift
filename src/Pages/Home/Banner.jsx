import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src="/Assets/banner/banner1.png" />
                    {/* <p class Name="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src="/Assets/banner/banner2.png" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src="/Assets/banner/banner3.png" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
    );
};

export default Banner;