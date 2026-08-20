import API from "../api/axios";

export const createOrderAPI = async (orderData) => {
  const res = await API.post("/api/orders", orderData);
  return res.data;
};