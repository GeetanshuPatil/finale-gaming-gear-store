import { Link, Navigate, useLocation } from "react-router-dom";
import { toggleTheme } from "../../../features/theme/themeSlice";
import { selectThemeMode } from "../../../features/theme/themeSelector";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const location = useLocation();
  const mode = useSelector(selectThemeMode);

  const orderId = location.state?.orderId;

  // prevent manual access
  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-2xl
               
               bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black
               
               border border-gray-200 dark:border-gray-800
               
               rounded-3xl p-8 md:p-10
               
               shadow-sm dark:shadow-2xl
               
               text-center transition"
      >
        {/* SUCCESS ICON */}
        <div
          className="w-24 h-24 mx-auto rounded-full
                 
                 bg-green-100 dark:bg-green-500/10
                 
                 border border-green-300 dark:border-green-500/30
                 
                 flex items-center justify-center mb-6"
        >
          <span className="text-5xl">🎉</span>
        </div>

        {/* TITLE */}
        <h1
          className="text-3xl md:text-4xl font-bold
                 
                 text-gray-900 dark:text-white
                 
                 mb-3"
        >
          Order Placed Successfully
        </h1>

        {/* SUBTEXT */}
        <p
          className="text-gray-600 dark:text-gray-400
                 
                 text-sm md:text-base
                 
                 max-w-lg mx-auto leading-relaxed"
        >
          Thank you for shopping with us. Your order has been confirmed and will
          be processed shortly.
        </p>

        {/* ORDER INFO */}
        <div
          className="mt-8
                 
                 bg-gray-50 dark:bg-[#020617]
                 
                 border border-gray-200 dark:border-gray-800
                 
                 rounded-2xl p-5 text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Order ID
            </span>

            <span className="text-green-500 font-semibold">{orderId}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Payment Method
            </span>

            <span className="text-gray-900 dark:text-white text-sm">
              {location.state?.paymentMethod || "Online Payment"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Estimated Delivery
            </span>

            <span className="text-gray-900 dark:text-white text-sm">
              3-5 Business Days
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 py-3 rounded-xl
                   
                   bg-green-500
                   
                   text-white dark:text-black
                   
                   font-semibold
                   
                   hover:bg-green-400 hover:text-black
                   
                   transition active:scale-95"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
