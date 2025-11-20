import React from 'react';
import Banner from './Banner';
import Brands from './Brands';
import Reviews from './Reviews';

const reviewsPromise = fetch('/json/reviews.json')
    .then(res => res.json())
    
const Home = () => {

    return (
        <div>
            <Banner/>
            <div className='my-9'>
                <Brands/>
            </div>
            <Reviews reviewsPromise={reviewsPromise}/>
        </div>
    );
};

export default Home;