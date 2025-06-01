import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishListSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cartItems: cartReducer,
    wishlist: wishlistReducer,
  },
});
