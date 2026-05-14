// features/cart/pages/Cart.jsx

import { useSelector } from "react-redux";
import { selectCartItems } from "../cartSelectors";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../shared/components/BackButton";
import { toggleTheme } from "../../../features/theme/themeSlice";
import { selectThemeMode } from "../../../features/theme/themeSelector";

const Cart = () => {
  const items = useSelector(selectCartItems);
  let navigate = useNavigate();

  const mode = useSelector(selectThemeMode);

  if (!items.length) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">

      {/* Icon */}
      <div className="text-6xl mb-4">
        🛒
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Your cart is empty
      </h2>

      {/* Subtitle */}
      <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md">
        Looks like you haven’t added any gaming gear yet.
        Start exploring premium peripherals built for performance.
      </p>

      {/* CTA */}
      <button
        onClick={() => navigate("/products")}
        className="mt-6 px-6 py-3 rounded-xl
                   
                   bg-green-500 text-white 
                   
                   font-semibold
                   
                   hover:bg-green-400
                   
                   transition active:scale-95"
      >
        Continue Shopping
      </button>

    </div>
  );
}
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-500">
              Shopping Cart
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.quantity}`} item={item} />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="lg:sticky lg:top-24 h-fit">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
