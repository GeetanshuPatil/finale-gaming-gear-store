import API from "../../api/axios";

// ✅ get user cart
export const getCartAPI = async () => {
  const res = await API.get("/cart");

  return res.data;
};

// ✅ add item to cart
export const addToCartAPI = async (productId) => {
  const res = await API.post(`/cart/add/${productId}`);

  return res.data;
};
// ✅ increase qty
export const increaseQtyAPI = async (productId) => {
  const res = await API.put(`/cart/increase/${productId}`);
  return res.data;
};

// ✅ decrease qty
export const decreaseQtyAPI = async (productId) => {
  const res = await API.put(`/cart/decrease/${productId}`);
  return res.data;
};

// ✅ remove item
export const removeItemAPI = async (productId) => {
  const res = await API.delete(`/cart/remove/${productId}`);
  return res.data;
};

// ✅ clear cart
export const clearCartAPI = async () => {
  const res = await API.delete("/cart/clear");
  return res.data;
};