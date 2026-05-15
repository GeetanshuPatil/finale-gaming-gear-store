// features/products/productServices.js


export const fetchAllProductsAPI = async () => {
  const res = await fetch("https://gaming-gear-java-backend.onrender.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};

export const fetchProductByIdAPI = async (id) => {
  const res = await fetch(`https://gaming-gear-java-backend.onrender.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};