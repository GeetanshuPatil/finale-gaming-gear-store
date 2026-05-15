// features/products/productServices.js
const BASE_URL = "https://gaming-gear-java-backend.onrender.com";

export const fetchAllProductsAPI = async () => {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};

export const fetchProductByIdAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);


  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};