// features/products/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addCartItem,
  addToCartLocal,
} from "../../../cart/cartSlice";
import {
  addWishlistItem,
  addToWishlist,
  addWishlistLocal,
  removeWishlistLocal,
  removeWishlistItem,
} from "../../../wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

import { toggleTheme } from "../../../theme/themeSlice";
import { selectThemeMode } from "../../../theme/themeSelector";

const ProductCard = ({ product }) => {
  const mode = useSelector(selectThemeMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const token = useSelector((state) => state.auth.token);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  return (
    <div className="relative flex flex-col h-full bg-gray-200 hover:scale-[1.02] dark:bg-gradient-to-b from-gray-900 to-gray-950  rounded-2xl p-4 hover:shadow-lg hover:shadow-green-500/10 transition group">
      {/* ❤️ HEART (FIXED POSITION) */}
      <button
        onClick={(e) => {
          e.stopPropagation();

          if (isWishlisted) {
            if (token) {
              // instant UI
              dispatch(removeWishlistLocal(product.id));

              // backend sync
              dispatch(removeWishlistItem(product.id));
            } else {
              dispatch(removeWishlistLocal(product.id));
            }

            toast("Removed from wishlist ❌");
          } else {
            if (token) {
              // instant UI
              dispatch(addWishlistLocal(product));

              // backend sync
              dispatch(addWishlistItem(product.id));
            } else {
              dispatch(addToWishlist(product));
            }

            toast.success("Added to wishlist");
          }
        }}
        className="absolute top-45 right-4 z-10 
               p-1 rounded-full 
               dark:fill-white fill-gray-400 hover:text-green-500 text-gray-300
               transition-all duration-200 hover:scale-110"
      >
        <Heart
          className={`w-6 h-6 transition ${
            isWishlisted
              ? "fill-green-500 text-green-500 "
              : " dark:fill-white fill-gray-300"
          }`}
        />
      </button>

      {/* CLICKABLE AREA */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="cursor-pointer flex flex-col"
      >
        {/* IMAGE */}
        <div className="h-28 flex items-center justify-center bg-white rounded-xl mb-3">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-24 object-contain mx-auto"
          />
        </div>

        {/* NAME (CLAMPED) */}
        <p className="text-sm text-gray-950 font-bold font- dark:text-gray-200 dark:font-bold line-clamp-2 min-h-[40px]">
          {product.title}
        </p>

        {/* PRICE */}
        <p className="text-base font-semibold text-green-500 mt-1">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();

          if (token) {
            // 1. instant UI
            dispatch(addToCartLocal(product));

            // 2. backend sync (NO UI overwrite)
            dispatch(addCartItem(product.id));
          } else {
            dispatch(addToCartLocal(product));
          }

          toast.success("Added to cart");
        }}
        className="mt-3 w-full py-2 rounded-xl 
               bg-green-600  text-white text-sm font-bold
               hover:bg-green-50 hover:text-black hover:shadow-md   transition  active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
