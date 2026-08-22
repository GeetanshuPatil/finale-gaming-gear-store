// features/products/components/ProductFilters.jsx

import { useDispatch, useSelector } from "react-redux";
import { setSearch, setCategory, setSort } from "../../productSlice";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";

const ProductFilters = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  // URL values
  const urlSearch = params.get("search") || "";
  const urlCategory = params.get("category") || "all";
  const urlSort = params.get("sort") || "default";

  // Redux state
  const { category, sort } = useSelector((state) => state.products);

  // Local state (search only)
  const [searchInput, setSearchInput] = useState(urlSearch);

  // debounce search
  const debouncedSearch = useDebounce(searchInput, 500);

useEffect(() => {
  dispatch(setCategory(urlCategory));
  dispatch(setSort(urlSort));
}, []);

  // Sync debounced search → Redux
  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

useEffect(() => {
  setParams(
  {
    search: debouncedSearch || "",
    category,
    sort,
  },
  { replace: true }
);
}, [debouncedSearch, category, sort]);

  return (
    <div className="bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 
                 
                rounded-2xl p-4 md:p-5  transition">

  <div className="flex flex-col md:flex-row md:items-center gap-4">

  

    {/* Controls */}
    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

      {/* Category */}
      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="px-4 py-2.5 rounded-xl text-sm 
                   
                   bg-white dark:bg-[#020617]
                   text-gray-900 dark:text-gray-200
                   
                   border border-gray-300 dark:border-gray-700
                   
                   focus:outline-none 
                   focus:ring-2 focus:ring-green-500 
                   focus:border-green-500
                   
                   transition w-full sm:w-44"
      >
        <option value="all">All Categories</option>
        <option value="mouse">Mouse</option>
        <option value="keyboard">Keyboard</option>
        <option value="headset">Headset</option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        className="px-4 py-2.5 rounded-xl text-sm 
                   
                   bg-white dark:bg-[#020617]
                   text-gray-900 dark:text-gray-200
                   
                   border border-gray-300 dark:border-gray-700
                   
                   focus:outline-none 
                   focus:ring-2 focus:ring-green-500 
                   focus:border-green-500
                   
                   transition w-full sm:w-44"
      >
        <option value="default">Sort by</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>

    </div>
  </div>
</div>
  );
};
export default ProductFilters;
