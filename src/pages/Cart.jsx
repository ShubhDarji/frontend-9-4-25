// src/features/cart/Cart.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQty, deleteProduct } from '../app/features/cart/cartSlice';
import './cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.cartList);

  // Calculate total price
  const totalPrice = cartList.reduce((total, item) => total + item.qty * item.price, 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      if (savedCart && Array.isArray(savedCart)) {
        savedCart.forEach((item) => {
          if (item && item.id) {
            dispatch(addToCart(item));
          } else {
            console.error('Invalid item in saved cart:', item);
          }
        });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, [dispatch]);

  // Save cart to localStorage when cartList changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartList));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartList]);

  const handleAddToCart = (product) => {
    if (product && product.id) {
      dispatch(addToCart(product));
    } else {
      console.error('Invalid product data:', product);
    }
  };

  const handleDecreaseQty = (productId) => {
    if (productId) {
      dispatch(decreaseQty(productId));
    } else {
      console.error('Invalid product ID:', productId);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (productId) {
      dispatch(deleteProduct(productId));
    } else {
      console.error('Invalid product ID:', productId);
    }
  };

  return (
    <section className="cart-section">
      <div className="container">
        {cartList.length === 0 ? (
          <h1 className="empty-cart">Your Cart is Empty</h1>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cartList.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.imgUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => handleDecreaseQty(item.id)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.qty}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <p>Total Items: {cartList.length}</p>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;