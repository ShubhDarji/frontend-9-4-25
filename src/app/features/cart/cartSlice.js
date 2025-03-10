import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) {
        console.error('Invalid product data:', product);
        return;
      }
      const existingItem = state.cartList.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartList.push({ ...product, qty: 1 });
      }
    },
    decreaseQty: (state, action) => {
      const { id, productName, price, imgUrl, qty } = action.payload;
      if (!id) {
        console.error("Invalid product data:", action.payload);
        return;
      }
      
      const existingItem = state.cartList.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          state.cartList = state.cartList.filter((item) => item.id !== productId);
        }
      } else {
        console.error('Product not found in cart:', productId);
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      if (!productId) {
        console.error('Invalid product ID:', productId);
        return;
      }
      const existingItem = state.cartList.find((item) => item.id === productId);
      if (existingItem) {
        state.cartList = state.cartList.filter((item) => item.id !== productId);
      } else {
        console.error('Product not found in cart:', productId);
      }
    },
  },
});

// Define cartMiddleware
export const cartMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching action:', action);
  return next(action);
};

export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;