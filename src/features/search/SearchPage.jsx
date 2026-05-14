import { X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import BackButton from "../../shared/components/BackButton";
import ProductCard from "../products/components/ui/ProductCard";

const SearchPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const products = useSelector((state) => state.products.items);

  const filteredProducts = products.filter((product) => {
    const query = debouncedSearch.toLowerCase().trim();

    if (!query) return false;

    const searchableText = `
    ${product.title}
    ${product.description}
    ${product.brand}
    ${product.category}
  `.toLowerCase();

    const words = query.split(" ");

    return words.every((word) => searchableText.includes(word));
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition">
      {/* TOP BAR */}
      <div
        className="sticky top-0 z-40
                      bg-white dark:bg-gray-900
                      border-b border-gray-200 dark:border-gray-800
                      px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <BackButton />

          <div className="relative flex-1">
            <input
              autoFocus
              type="text"
              placeholder="Search gaming gear..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-xl
             
             bg-gray-100 dark:bg-[#020617]
             
             border border-gray-300 dark:border-gray-700
             
             text-gray-900 dark:text-white
             
             placeholder:text-gray-500
             
             focus:outline-none
             focus:ring-2 focus:ring-green-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2
               
               text-gray-400 hover:text-red-500
               
               transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="p-4">
        {!debouncedSearch.trim() ? (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            Start searching for gaming gear 🔍
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
