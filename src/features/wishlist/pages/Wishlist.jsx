import { useSelector, useDispatch } from "react-redux";
import { selectWishlistItems } from "../wishlistSelectors";
import { removeWishlistItem } from "../wishlistSlice";
import { Link } from "react-router-dom";
import { addCartItem, addToCart } from "../../cart/cartSlice";
import { convertToINR, formatINR } from "../../../shared/utils/currency";
import BackButton from "../../../shared/components/BackButton";
import toast from "react-hot-toast";
import { toggleTheme } from "../../../features/theme/themeSlice";
import { selectThemeMode } from "../../../features/theme/themeSelector";

const Wishlist = () => {
  const items = useSelector(selectWishlistItems);
  const mode = useSelector(selectThemeMode);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  if (items.length === 0) {
    return <p className="p-4 text-gray-500">Your wishlist is empty </p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-white">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="text-xl md:text-2xl text-green-500  font-semibold mb-6">
        My Wishlist
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className=" bg-gray-100 dark:bg-gradient-to-b from-gray-900 to-gray-950 
                   border border-gray-300 dark:border-gray-800 rounded-2xl p-4 
                   hover:shadow-lg hover:shadow-green-500/10 transition"
          >
            <Link to={`/product/${item.id}`}>
              <div className="h-36 flex items-center justify-center bg-white rounded-xl mb-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-28 object-contain"
                />
              </div>

              <h2 className="text-sm font-bold dark:text-gray-200 text-gray-700 line-clamp-2">
                {item.title}
              </h2>
            </Link>

            {/* Price */}
            <p className="text-sm text-green-500 font-semibold mt-1">
              ₹{item.price.toLocaleString("en-IN")}
            </p>

            {/* Remove */}
            <button
              onClick={() => {
                if (token) {
                  dispatch(removeWishlistItem(item.id));
                } else {
                  dispatch(removeWishlistLocal(item.id));
                }
                toast("Removed from wishlist");
              }}
              className="mt-3 text-xs hover:text-gray-400 text-red-500 transition"
            >
              Remove
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => {
                if (token) {
                  dispatch(addCartItem(item.id));
                } else {
                  dispatch(addToCart(item));
                }
                toast.success("Added to cart");
              }}
              className="mt-3 w-full py-2 rounded-xl 
                     bg-green-600 text-white text-sm font-bold
                     hover:bg-white hover:text-black shadow-md transition active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
