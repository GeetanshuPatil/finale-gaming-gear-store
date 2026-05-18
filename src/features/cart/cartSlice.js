// features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCartAPI,
  addToCartAPI,
  increaseQtyAPI,
  decreaseQtyAPI,
  removeItemAPI,
  clearCartAPI,
} from "./cartServices";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      return await getCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (productId, thunkAPI) => {
    try {
      return await addToCartAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const increaseCartItem = createAsyncThunk(
  "cart/increaseCartItem",
  async (productId, thunkAPI) => {
    try {
      return await increaseQtyAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const decreaseCartItem = createAsyncThunk(
  "cart/decreaseCartItem",
  async (productId, thunkAPI) => {
    try {
      return await decreaseQtyAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      return await removeItemAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearBackendCart = createAsyncThunk(
  "cart/clearBackendCart",
  async (_, thunkAPI) => {
    try {
      return await clearCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const normalizeCartItems = (items) =>
  (items || []).map((item) => ({
    id: item.product.id,
    title: item.product.title,
    price: item.product.price,
    imageUrl: item.product.imageUrl,
    quantity: item.quantity,
  }));

// load initial cart
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCartLocal: (state, action) => {
      const product = action.payload;

      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      }
    },
    increaseLocalCartItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseLocalCartItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    removeLocalCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    resetCart: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ✅ fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.items = normalizeCartItems(action.payload.items);
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      

      .addCase(clearBackendCart.fulfilled, (state, action) => {
        state.items = [];
      });
  },
});
export const {
  addToCartLocal,
  increaseLocalCartItem,
  decreaseLocalCartItem,
  removeLocalCartItem,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
