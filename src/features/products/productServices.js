// features/products/productServices.js
import API from "../../api/axios";

export const fetchAllProductsAPI = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const fetchProductByIdAPI = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};