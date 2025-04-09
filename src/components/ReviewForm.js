import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  if (!userInfo) {
    return <p>Please <a href="/login">log in</a> to leave a review.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      setError("Please provide a rating and comment.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", rating);
    formData.append("comment", comment);
    if (image) formData.append("image", image);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`http://localhost:5000/api/reviews`, formData, config);
      alert("Review submitted!");
      onReviewSubmit();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Rating (1-5)</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Upload Image (Optional)</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}
      <Button type="submit">Submit Review</Button>
    </Form>
  );
};

export default ReviewForm;
