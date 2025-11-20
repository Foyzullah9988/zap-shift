import React from 'react';

const ReviewsCard = ({review}) => {
    const {userName,user_photoURL,review:testimonial} = review;
    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-sm mx-auto border border-gray-100">
            
            {/* Quote Icon */}
            <div className="text-teal-400 text-4xl mb-3">
                &ldquo;
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {testimonial}
            </p>

            {/* Divider */}
            <hr className="border-dashed border-gray-300 my-4" />

            {/* User Info */}
            <div className="flex items-center gap-3">
                <img
                    src={user_photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                    <h3 className="text-gray-900 font-semibold text-sm">
                        {userName}
                    </h3>
                    <p className="text-gray-500 text-xs">
                        {review.role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;