// features/products/pages/ProductDetails.jsx
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatINR } from "../../../shared/utils/currency";
import BackButton from "../../../shared/components/BackButton";
import { Heart } from "lucide-react";
import { fetchProductById, clearSelectedProduct } from "../productSlice";
import {
  addToWishlist,
  removeFromWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../../wishlist/wishlistSlice";
import { addCartItem, addToCartLocal } from "../../cart/cartSlice";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
// import { toggleTheme } from "../../../features/theme/themeSlice";
// import { selectThemeMode } from "../../../features/theme/themeSelector";

const ProductDetails = () => {
  // const mode = useSelector(selectThemeMode);

  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const token = useSelector((state) => state.auth.token);
  const [activeImage, setActiveImage] = useState(null);

  const { selectedProduct, detailsLoading, error } = useSelector(
    (state) => state.products
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === selectedProduct?.id
  );

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSelectedProduct()); // 🧠 prevent stale data
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct?.imageUrl) {
      setActiveImage(selectedProduct.imageUrl); // ✅ use full string
    }
  }, [selectedProduct]);

  // 🔴 Error state
  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  // 🟡 Loading state
  if (detailsLoading || !selectedProduct) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-white">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* 🖼️ Image Section */}
        <div className="flex flex-col gap-4">
          <div className="relative bg-white rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden">
            {/* ❤️ Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();

                if (isWishlisted) {
                  // instant UI
                  dispatch(removeFromWishlist(selectedProduct.id));

                  // backend sync
                  if (token) {
                    dispatch(removeWishlistItem(selectedProduct.id));
                  }

                  toast("Removed from wishlist ❌");
                } else {
                  // instant UI
                  dispatch(addToWishlist(selectedProduct));

                  // backend sync
                  if (token) {
                    dispatch(addWishlistItem(selectedProduct.id));
                  }

                  toast.success("Added to wishlist");
                }
              }}
              className="absolute top-3 right-3 z-10 
                 p-2 rounded-full bg-black/40 backdrop-blur-sm
                 text-gray-300 hover:text-green-500
                 transition-all duration-200 hover:scale-110"
            >
              <Heart
                className={`w-6 h-6 transition ${
                  isWishlisted
                    ? "fill-green-500 text-green-500"
                    : "text-gray-300"
                }`}
              />
            </button>

            <img
              src={
                activeImage ||
                selectedProduct.imageUrl ||
                "https://via.placeholder.com/400"
              }
              alt={selectedProduct.title}
              className="max-h-[260px] object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* 📄 Info Section */}
        <div className="flex flex-col gap-5">
          {/* Category */}
          <span className="text-xs uppercase tracking-wide text-gray-400">
            {selectedProduct.category}
          </span>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold  text-green-500 leading-snug">
            {selectedProduct.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="  bg-gray-100 shadow-md   text-black text-xs px-2 py-1 rounded-md font-medium">
              ⭐ {selectedProduct.rating}
            </span>

            <span className="text-sm text-gray-400">
              {selectedProduct.stock} in stock
            </span>
          </div>

          {/* 💰 Price */}
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold dark:text-gray-50 text-gray-800">
              {formatINR(selectedProduct.price)}
            </p>

            {selectedProduct.discountPercentage ? (
              <span className="text-sm font-semibold text-gra bg-green-900/30 px-2 py-1 rounded-md">
                {Math.round(selectedProduct.discountPercentage)}% OFF
              </span>
            ) : (
              <span className="text-sm text-gray-500">No discount</span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800"></div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {selectedProduct.description || "No description available."}
          </p>

          {/* 🛒 Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Add to Cart */}
            <button
              onClick={() => {
                // instant UI
                dispatch(addToCartLocal(selectedProduct));

                // backend sync
                if (token) {
                  dispatch(addCartItem(selectedProduct.id));
                }

                toast.success("Added to cart 🛒");
              }}
              className="flex-1 px-6 py-3 rounded-xl   text-white bg-green-600
                      hover:bg-white hover:text-black  transition active:scale-95 font-medium shadow-md"
            >
              Add to Cart
            </button>

            {/* Buy Now */}
            <button
              onClick={() => toast("Coming soon 🚀")}
              className="flex-1 px-6 py-3 rounded-xl  bg-gray-600 text-gray-100 
                     hover:bg-gray-50 hover:text-gray-950 shadow-md transition font-medium"
            >
              Buy Now
            </button>
          </div>
          {/* 🔹 Features */}
          {selectedProduct.features?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                Key Features
              </h2>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 🔹 Specifications */}
          {selectedProduct.specs && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                Specifications
              </h2>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between text-sm text-gray-300 py-1 border-b border-gray-800 last:border-none"
                  >
                    <span className="capitalize text-gray-400">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
