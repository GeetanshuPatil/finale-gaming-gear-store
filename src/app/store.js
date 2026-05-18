// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
  },
});
