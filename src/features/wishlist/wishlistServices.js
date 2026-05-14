// features/wishlist/wishlistServices.js

import API from "../../api/axios";

// GET wishlist
export const getWishlistAPI = async () => {
  const res = await API.get("/wishlist");
  return res.data;
};

// ADD item
export const addToWishlistAPI = async (productId) => {
  const res = await API.post(`/wishlist/add/${productId}`);
  return res.data;
};

// REMOVE item
export const removeWishlistItemAPI = async (productId) => {
  const res = await API.delete(`/wishlist/remove/${productId}`);
  return res.data;
};

// CLEAR wishlist
export const clearWishlistAPI = async () => {
  const res = await API.delete("/wishlist/clear");
  return res.data;
};