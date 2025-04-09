import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const ReviewsSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [productId]);

  if (reviews.length === 0) {
    return <p>No reviews yet. Be the first to review this product!</p>;
  }

  return (
    <div className="reviews-section">
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <StarRating rating={review.rating} />
          <p>{review.comment}</p>
          {review.image && (
            <img
              src={`http://localhost:5000/uploads/${review.image}`}
              alt="Review"
              className="review-image"
            />
          )}
          <small>By: {review.user?.name || "Anonymous"}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSection;
