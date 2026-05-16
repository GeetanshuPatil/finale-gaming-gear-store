// features/cart/components/CartItem.jsx
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../features/theme/themeSlice";
import { selectThemeMode } from "../../../features/theme/themeSelector";
import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
  decreaseLocalCartItem,
  increaseLocalCartItem,
  removeLocalCartItem,
} from "../cartSlice";
import { convertToINR, formatINR } from "../../../shared/utils/currency";

const CartItem = ({ item }) => {
  const mode = useSelector(selectThemeMode);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  console.log(item);
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between 
             
             bg-gray-100 dark:bg-gray-900
             
             border border-gray-300 dark:border-gray-800
             
             rounded-2xl p-4 gap-4 
             
             hover:shadow-lg hover:shadow-green-500/10 
             
             transition"
    >
      {/* LEFT */}
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-white dark:bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
            {item.title}
          </h3>

          {/* UNIT PRICE */}
          <p className="text-sm text-green-500 dark:text-green-400 font-semibold">
            ₹{item.price}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
        {/* Quantity */}
        <div
          className="flex items-center 
                 
                 border border-gray-300 dark:border-gray-700
                 
                 rounded-xl overflow-hidden
                 
                 bg-white dark:bg-gray-950"
        >
          <button
            onClick={() => {
              if (token) {
                dispatch(decreaseLocalCartItem(item.id));
                dispatch(decreaseCartItem(item.id));
              } else {
                dispatch(decreaseLocalCartItem(item.id));
              }

              toast("Quantity updated");
            }}
            className="px-3 py-1.5 
                   
                   text-gray-700 dark:text-gray-300
                   
                   hover:bg-gray-200 dark:hover:bg-gray-800
                   
                   transition"
          >
            −
          </button>

          <span className="px-3 text-sm text-gray-900 dark:text-white">
            {item.quantity}
          </span>

          <button
            onClick={() => {
              if (token) {
                dispatch(increaseLocalCartItem(item.id));
                dispatch(increaseCartItem(item.id));
              } else {
                dispatch(increaseLocalCartItem(item.id));
              }

              toast.success("Quantity increased");
            }}
            className="px-3 py-1.5 
                   
                   text-gray-700 dark:text-gray-300
                   
                   hover:bg-gray-200 dark:hover:bg-gray-800
                   
                   transition"
          >
            +
          </button>
        </div>

        {/* Remove */}
        <button
          onClick={() => {
            if (token) {
              dispatch(removeLocalCartItem(item.id));
              dispatch(removeCartItem(item.id));
            } else {
              dispatch(removeLocalCartItem(item.id));
            }

            toast("Removed from cart ❌");
          }}
          className="text-gray-500 hover:text-red-500 transition text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
