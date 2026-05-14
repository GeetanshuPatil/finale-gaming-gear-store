// features/wishlist/wishlistSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWishlistAPI,
  addToWishlistAPI,
  removeWishlistItemAPI,
  clearWishlistAPI,
} from "./wishlistServices";

// ✅ FETCH
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      return await getWishlistAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ ADD
export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (productId, thunkAPI) => {
    try {
      return await addToWishlistAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ REMOVE
export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (productId, thunkAPI) => {
    try {
      return await removeWishlistItemAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ CLEAR
export const clearBackendWishlist = createAsyncThunk(
  "wishlist/clearBackendWishlist",
  async (_, thunkAPI) => {
    try {
      return await clearWishlistAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    resetWishlist: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = (action.payload.items || []).map((item) => ({
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        }));
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items = (action.payload.items || []).map((item) => ({
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        }));
      })

      // REMOVE
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = (action.payload.items || []).map((item) => ({
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        }));
      })

      // CLEAR
      .addCase(clearBackendWishlist.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
