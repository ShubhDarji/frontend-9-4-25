import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import { Star } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "./product-card.css";

const StarRating = ({ rating }) => (
  <div className="product-rating">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`star-icon ${index < rating ? "active-star" : "inactive-star"}`}
      />
    ))}
  </div>
);

const ProductCard = ({ productItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (productItem?.primaryImage) {
      setImageSrc(`http://localhost:5000/uploads/${productItem.primaryImage}`);
    } else if (productItem?.imgUrl) {
      setImageSrc(productItem.imgUrl);
    } else {
      setImageSrc("/assets/default-product.png");
    }
  }, [productItem]);

  if (!productItem) return <p className="error-message">Product data is missing.</p>;

  const discount =
    productItem.originalPrice > productItem.price
      ? Math.round(((productItem.originalPrice - productItem.price) / productItem.originalPrice) * 100)
      : 0;

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...productItem, qty: quantity }));
    toast.success(`${productItem.productName} added to cart!`);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    navigate(`/checkout`, {
      state: {
        product: { ...productItem, qty: quantity },
      },
    });
  };

  return (
    <div className="product-card">
      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}

      <div className="product-image" onClick={() => navigate(`/product/${productItem.id}`)}>
        <img
          loading="lazy"
          src={imageSrc}
          alt={productItem.productName}
          className="product-img"
          onError={() => setImageSrc("/assets/default-product.png")}
        />
      </div>

      <div className="product-details">
        <h3 className="product-title" onClick={() => navigate(`/product/${productItem.id}`)}>
          {productItem.productName}
        </h3>

        <StarRating rating={productItem.rating} />
        <span className="rating-value">({productItem.reviews?.length || 0} Reviews)</span>

        <p className="shipping-info">Ships in 3-4 days</p>

        <div className="product-price">
          <h4 className="current-price">₹{productItem.price}</h4>
          {productItem.originalPrice && (
            <span className="original-price">₹{productItem.originalPrice}</span>
          )}
        </div>

        <div className="product-actions">
          <div className="quantity-container">
            <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-value">{quantity}</span>
            <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;