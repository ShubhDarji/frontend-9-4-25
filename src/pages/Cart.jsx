import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart, clearCart } from "../app/features/cart/cartSlice";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

// ✅ Utility to Get Image URL
const getImageUrl = (imagePath, imgUrl) => {
  if (imagePath) {
    return imagePath.startsWith("http")
      ? imagePath
      : `http://localhost:5000/uploads/${encodeURIComponent(imagePath)}`;
  }
  return imgUrl || "/default-product.png";
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const totalPrice = cartList.reduce((total, item) => total + item.qty * item.price, 0);

  // ✅ Handle Checkout
  const handleCheckout = () => {
    if (cartList.length === 0) {
      alert("Your cart is empty. Add some products before proceeding to checkout!");
      return;
    }
    console.log("Navigating to Checkout with Data:", cartList);
    navigate("/checkout", { state: { products: cartList } });
  };

  return (
    <section className="cart-section">
      <div className="container">
        {/* ✅ Empty Cart UI */}
        {cartList.length === 0 ? (
          <div className="empty-cart">
            <FaShoppingCart className="cart-icon" />
            <h2>Your Cart is Empty</h2>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* ✅ Product List Section */}
            <div className="cart-products">
              <div className="cart-header">
                <h1>Your Cart</h1>
                <button onClick={() => dispatch(clearCart())} className="clear-cart">Clear Cart</button>
              </div>

              {cartList.map((item) => (
                <div key={item.id || item._id} className="cart-item">
                  {/* ✅ Product Image */}
                  <img
                    src={getImageUrl(item.primaryImage, item.imgUrl)}
                    alt={item.productName}
                    className="cart-image"
                    onError={(e) => { e.target.src = "/default-product.png"; }}
                  />

                  {/* ✅ Product Details */}
                  <div className="item-details">
                    <h3>{item.productName}</h3>
                    <p>₹{item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => dispatch(decreaseQuantity({ id: item.id || item._id }))}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => dispatch(addToCart(item))}>+</button>
                    </div>
                  </div>

                  {/* ✅ Remove Product */}
                  <button onClick={() => dispatch(removeFromCart({ id: item.id || item._id }))} className="remove-btn">
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            {/* ✅ Summary Section */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <p>Total Items: <span>{cartList.reduce((sum, item) => sum + item.qty, 0)}</span></p>
                <p>Total Price: <span>₹{totalPrice.toFixed(2)}</span></p>
              </div>
              
              {/* ✅ Checkout Button */}
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
