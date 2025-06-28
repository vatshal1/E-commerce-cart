import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "product/fetchProductItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products-broken");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch products");
    }
  }
);

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = "";
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!!!!";
      });
  },
});

//-> selector functions
export const getAllProducts = (state) => state.products.list;
export const getProductLoadingState = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;

export default slice.reducer;
