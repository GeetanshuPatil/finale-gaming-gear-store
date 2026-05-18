import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsAPI, fetchProductByIdAPI } from "./productServices";

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const lastFetched = state.products.lastFetched;

    // 🧠 cache check (1 minute)
    if (lastFetched && Date.now() - lastFetched < 60000) {
      return state.products.items; // ✅ skip API call
    }

    try {
      return await fetchAllProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

// ✅ Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const existing = state.products.items.find((p) => p.id === Number(id));

    if (existing) {
      return existing; // ✅ no API call
    }

    try {
      return await fetchProductByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch product");
    }
  }
);

// 🧠 Initial state
const initialState = {
  items: [],
  selectedProduct: null,

  listLoading: false,
  detailsLoading: false,

  listError: null,
  detailsError: null,

  error: null,

  lastFetched: null,

  search: "",
  category: "all",
  sort: "default",
};

// 🧩 Slice
const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    // optional: clear selected product
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    }
    ,
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder

      // 🔄 Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.listLoading = false;
        state.items = action.payload;

        state.lastFetched = Date.now();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      // 🔄 Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelectedProduct, setSearch, setCategory, setSort } = productSlice.actions;

export default productSlice.reducer;
