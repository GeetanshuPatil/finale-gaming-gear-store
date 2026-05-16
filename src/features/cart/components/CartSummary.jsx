// features/cart/components/CartSummary.jsx

import { useDispatch, useSelector } from "react-redux";
import { convertToINR } from "../../../shared/utils/currency";
import { useNavigate } from "react-router-dom";
import { formatINR } from "../../../shared/utils/currency";
import { clearBackendCart } from "../cartSlice";
import toast from "react-hot-toast";
import { selectCartTotal } from "../cartSelectors";

const CartSummary = () => {
  const total = useSelector(selectCartTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleClearCart = () => {
    if (token) {
      dispatch(clearBackendCart());
    } else {
      dispatch(resetCart());
    }
    toast.success("Cart cleared ");
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-900
             
             border border-gray-300 dark:border-gray-800
             
             rounded-2xl p-5 flex flex-col gap-5 
             
             lg:sticky lg:top-24
             
             shadow-lg transition"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Order Summary
        </h2>

        {/* CLEAR CART */}
        <button
          onClick={handleClearCart}
          className="text-xs 
                 
                 text-red-500 dark:text-red-400
                 
                 hover:text-red-600 dark:hover:text-red-500
                 
                 hover:underline transition"
        >
          Clear cart
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span className="text-gray-900 dark:text-white font-medium">
            {formatINR(total)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span className="text-gray-700 dark:text-gray-200">Free</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-800"></div>

      {/* Total */}
      <div className="flex justify-between text-sm font-semibold">
        <span className="text-gray-900 dark:text-white">Total</span>

        <span className="font-semibold text-green-500">{formatINR(total)}</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        className="mt-1 w-full py-3 rounded-xl 
               
               bg-green-600 
               
               text-white 
               
               text-sm font-medium
               
               hover:bg-white 
               hover:text-black
               
               transition active:scale-[0.98]
               
               shadow-[0_0_12px_rgba(34,197,94,0.4)]"
      >
        Proceed to Checkout
      </button>

      {/* Note */}
      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
        Taxes included • Secure checkout
      </p>
    </div>
  );
};

export default CartSummary;
