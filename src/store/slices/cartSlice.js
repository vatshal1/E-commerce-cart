import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      // console.log("existingItemIndex & action", existingItemIndex, action);

      //. if 'product' present
      if (existingItemIndex !== -1) state[existingItemIndex].quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },

    removeCartItem: (state, action) => {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state.splice(existingItemIndex, 1);
      }
    },

    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += 1;
      }
    },

    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state, action);

      if (existingItemIndex !== -1) {
        if (state[existingItemIndex].quantity === 1)
          state.splice(existingItemIndex, 1);
        else state[existingItemIndex].quantity -= 1;
      }
    },
  },
});

//-> selector function
export const getAllCartItems = (state) => state.cartItems;

export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions;

export default slice.reducer;
