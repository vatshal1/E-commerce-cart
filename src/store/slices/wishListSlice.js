import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex((item) => item.productId === action.payload.productId);

//-> Wishlist Reducer function
let slice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    wishlistAddItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);

      //! if 'product' is not present
      if (existingItemIndex == -1) state.push({ ...action.payload });
    },

    wishlistRemoveItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);

      state.splice(existingItemIndex, 1);
    },
  },
});

//-> selector function
export const getWishlistAllItems = (state) => state.wishlist;

export const { wishlistAddItem, wishlistRemoveItem } = slice.actions;

export default slice.reducer;
