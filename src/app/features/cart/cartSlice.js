import { createSlice } from "@reduxjs/toolkit";

// Initial state using localStorage
const initialState = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
};

// Utility function to save cart to localStorage
const saveToLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add to Cart (Increments quantity if product exists)
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartList.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.qty += product.qty || 1;
      } else {
        state.cartList.push({ ...product, qty: product.qty || 1 });
      }
      saveToLocalStorage(state.cartList);
    },

    // ✅ Decrease Quantity (Removes if qty is 1)
    decreaseQuantity: (state, action) => {
      const productId = action.payload.id;
      const item = state.cartList.find((item) => item.id === productId);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.cartList = state.cartList.filter((item) => item.id !== productId);
        }
      }
      saveToLocalStorage(state.cartList);
    },

    // ✅ Remove Product
    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter((item) => item.id !== action.payload.id);
      saveToLocalStorage(state.cartList);
    },

    // ✅ Clear Entire Cart
    clearCart: (state) => {
      state.cartList = [];
      saveToLocalStorage(state.cartList);
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
