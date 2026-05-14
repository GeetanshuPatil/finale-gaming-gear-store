// features/products/productServices.js

export const fetchAllProductsAPI = async () => {
  const res = await fetch("http://localhost:8080/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};

export const fetchProductByIdAPI = async (id) => {
  const res = await fetch(`http://localhost:8080/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};