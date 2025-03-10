import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import { Star } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "./product-card.css";

const ProductCard = ({ productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = (productItem) => {

    dispatch(addToCart({ ...productItem, qty: 1 }));

    toast.success("Product has been added to cart!");

  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const discount =
    productItem.originalPrice > productItem.price
      ? Math.round(((productItem.originalPrice - productItem.price) / productItem.originalPrice) * 100)
      : 0;

  return (
    <div className="product-card">
      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
      
      <div className="product-image" onClick={() => router(`/product/${productItem.id}`)}>
        <img src={productItem.imgUrl} alt={productItem.productName} className="product-img" />
      </div>

      <div className="product-details">
        <h3 className="product-title" onClick={() => router(`/product/${productItem.id}`)}>
          {productItem.productName}
        </h3>

        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className={`star-icon ${index < productItem.rating ? "active-star" : "inactive-star"}`} />
          ))}
          <span className="rating-value">({productItem.reviews?.length || 0} Reviews)</span>
        </div>

        <p className="shipping-info">Ships in 3-4 days</p>

        <div className="product-price">
          <h4 className="current-price">₹{productItem.price}</h4>
          {productItem.originalPrice && <span className="original-price">₹{productItem.originalPrice}</span>}
        </div>

        <div className="product-actions">
          <div className="quantity-container">
            <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
            <span className="quantity-value">{quantity}</span>
            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
          </div>
          <button className="buy-btn">Buy Now</button>
        </div>

        <button className="add-to-cart-btn"   onClick={() => handleAdd(productItem)}
        >
          Add to Cart
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductCard;
