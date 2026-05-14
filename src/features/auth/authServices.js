// features/auth/authServices.js

import API from "../../api/axios";

// 🔐 Login
export const loginAPI = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

// 📝 Signup
export const signupAPI = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};