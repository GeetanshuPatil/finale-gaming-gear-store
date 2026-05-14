// features/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, signupAPI } from "./authServices";

// ✅ LOGIN
// ✅ Async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await loginAPI(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, thunkAPI) => {
    try {
      return await signupAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

let user = null;

try {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  console.error("Invalid user in localStorage");
  localStorage.removeItem("user");
}

// 🧠 Initial State
const initialState = {
  user,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// 🧩 Slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      // clear redux state
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;

      // clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔄 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      //login successful block
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = {
          email: action.payload.email,
          name: action.payload.name,
          role: action.payload.role,
        };

        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // 🔄 SIGNUP

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      //signup successfull block
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          email: action.payload.email,
          name: action.payload.name,
          role: action.payload.role,
        };

        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
