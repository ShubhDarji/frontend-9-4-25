// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../app/features/cart/cartSlice"; // ✅ Correct
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  // No extra middleware unless needed
});

export default store;