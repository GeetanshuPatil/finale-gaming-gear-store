import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../productSlice";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const {
    items = [],
    listLoading,
    error,
  } = useSelector((state) => state.products);

  // 🌐 URL state
  const search = params.get("search") || "";
  const category = params.get("category") || "all";
  const sort = params.get("sort") || "default";

  // 📦 fetch once
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // 🔥 filtered products
  const products = useMemo(() => {
    let data = [...items];

    // ✅ search (FIXED)
    // ✅ search (UPGRADED)
if (search) {
  const query = search.toLowerCase();

  data = data.filter((p) => {
    const searchableText = `
      ${p.title}
      ${p.brand}
      ${p.category}
      ${p.features?.join(" ")}
      ${Object.entries(p.specs || {})
        .map(([key, value]) => `${key} ${value}`)
        .join(" ")}
    `.toLowerCase();

    return searchableText.includes(query);
  });
}

    // ✅ category
    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    // ✅ sorting
    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [items, search, category, sort]);

  console.log("items:", items);
  console.log("category:", category);
  console.log("filtered:", products);
  return {
    products,
    loading: listLoading,
    error,
  };
};
