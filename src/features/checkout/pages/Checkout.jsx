import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { selectCartTotal } from "../../cart/cartSelectors";
import { selectIsAuthenticated } from "../../auth/authSelectors";
import BackButton from "../../../shared/components/BackButton";
import { formatINR } from "../../../shared/utils/currency";
import { clearBackendCart, resetCart } from "../../cart/cartSlice";
import toast from "react-hot-toast";
import { toggleTheme } from "../../../features/theme/themeSlice";
import { selectThemeMode } from "../../../features/theme/themeSelector";
import {
  createPaymentOrderAPI,
  verifyPaymentAPI,
} from "../../payment/paymentAPI";
import { createOrderAPI } from "../../../api/orderAPI";

const Checkout = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const total = useSelector(selectCartTotal);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  const [method, setMethod] = useState("cod"); // 🔥 FIX
  const [loading, setLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  // Authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/cart" />;
  }

  const handlePlaced = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.pincode
    ) {
      toast.error("Please fill all shipping details");
      return;
    }

    setLoading(true);

    try {
      // COD
      // COD
      if (method === "cod") {
        const order = await createOrderAPI({
          fullName: address.fullName,
          phone: address.phone,
          addressLine: address.addressLine,
          city: address.city,
          pincode: address.pincode,
          paymentMethod: "COD",
        });

        dispatch(resetCart());

        navigate("/order-success", {
          state: {
            orderId: order.id,
            paymentMethod: "Cash on Delivery",
          },
        });

        return;
      }

      // Razorpay
      const orderData = await createPaymentOrderAPI();

      const options = {
        key: orderData.keyId,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "Gaming Gear Shop",

        description: "Gaming Gear Shop Purchase",

        order_id: orderData.orderId,

        handler: async function (response) {
          try {
            // 1. Verify payment on backend
            await verifyPaymentAPI({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            // 2. Create order in our database
            const order = await createOrderAPI({
              fullName: address.fullName,
              phone: address.phone,
              addressLine: address.addressLine,
              city: address.city,
              pincode: address.pincode,
              paymentMethod: "RAZORPAY",
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            });

            toast.success("Payment successful!");

            // Backend already cleared the cart
            dispatch(resetCart());

            // 3. Show order confirmation
            navigate("/order-success", {
              state: {
                orderId: order.id,
                paymentMethod: "Online Payment",
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch (error) {
            console.error("Payment/order creation failed:", error);

            toast.error(error.response?.data || "Payment verification failed");
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        notes: {
          address: address.addressLine,
          city: address.city,
          pincode: address.pincode,
        },

        theme: {
          color: "#16a34a",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            toast("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);

      toast.error(error.response?.data || "Unable to start payment");
    } finally {
      setLoading(false);
    }
  };

  const shippingFee = total > 5000 ? 0 : 99;
  const finalTotal = total + shippingFee;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      {/* BACK BUTTON */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8 mt-6 items-start">
        {/* SUMMARY - MOBILE TOP / DESKTOP RIGHT */}
        <div className="order-1 lg:order-2">
          <div
            className="bg-white dark:bg-gray-900
                   
                   border border-gray-200 dark:border-gray-800
                   
                   rounded-2xl p-5
                   
                   shadow-sm dark:shadow-lg
                   
                   lg:sticky lg:top-24
                   
                   transition"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-200 dark:border-gray-800 pb-4"
                >
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-12 object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm text-green-500 font-medium whitespace-nowrap">
                    {formatINR(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatINR(total)}</span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>

                <span>
                  {shippingFee === 0 ? "Free" : formatINR(shippingFee)}
                </span>
              </div>

              <div
                className="border-t border-gray-200 dark:border-gray-800
                       
                       pt-4 flex justify-between
                       
                       text-base font-semibold"
              >
                <span className="text-gray-900 dark:text-white">Total</span>

                <span className="text-green-500">{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* DESKTOP BUTTON */}
            <button
              disabled={loading}
              onClick={handlePlaced}
              className="hidden lg:block mt-6 w-full py-3 rounded-xl
                     
                     bg-green-600
                     
                     text-white
                     
                     font-semibold
                     
                     hover:bg-green-400 hover:text-black
                     
                     transition active:scale-95
                     
                     disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
          {/* SHIPPING ADDRESS */}
          <div
            className="bg-white dark:bg-gray-900
                   
                   border border-gray-200 dark:border-gray-800
                   
                   rounded-2xl p-6
                   
                   shadow-sm dark:shadow-md
                   
                   transition"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
              Shipping Address
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#020617]
                       
                       border border-gray-300 dark:border-gray-700
                       
                       rounded-xl px-4 py-3
                       
                       text-gray-900 dark:text-white
                       
                       placeholder:text-gray-500
                       
                       focus:outline-none
                       focus:ring-2 focus:ring-green-500
                       focus:border-green-500
                       
                       transition"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#020617]
                       
                       border border-gray-300 dark:border-gray-700
                       
                       rounded-xl px-4 py-3
                       
                       text-gray-900 dark:text-white
                       
                       placeholder:text-gray-500
                       
                       focus:outline-none
                       focus:ring-2 focus:ring-green-500
                       focus:border-green-500
                       
                       transition"
              />

              <textarea
                name="addressLine"
                placeholder="Full Address"
                value={address.addressLine}
                onChange={handleChange}
                rows={3}
                className="bg-gray-50 dark:bg-[#020617]
                       
                       border border-gray-300 dark:border-gray-700
                       
                       rounded-xl px-4 py-3
                       
                       text-gray-900 dark:text-white
                       
                       placeholder:text-gray-500
                       
                       focus:outline-none
                       focus:ring-2 focus:ring-green-500
                       focus:border-green-500
                       
                       transition"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#020617]
                         
                         border border-gray-300 dark:border-gray-700
                         
                         rounded-xl px-4 py-3
                         
                         text-gray-900 dark:text-white
                         
                         placeholder:text-gray-500
                         
                         focus:outline-none
                         focus:ring-2 focus:ring-green-500
                         focus:border-green-500
                         
                         transition"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#020617]
                         
                         border border-gray-300 dark:border-gray-700
                         
                         rounded-xl px-4 py-3
                         
                         text-gray-900 dark:text-white
                         
                         placeholder:text-gray-500
                         
                         focus:outline-none
                         focus:ring-2 focus:ring-green-500
                         focus:border-green-500
                         
                         transition"
                />
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div
            className="bg-white dark:bg-gray-900
                   
                   border border-gray-200 dark:border-gray-800
                   
                   rounded-2xl p-6
                   
                   shadow-sm dark:shadow-md
                   
                   transition"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
              Payment Method
            </h2>

            <div className="space-y-4">
              {/* COD */}
              <label
                className="flex items-center gap-3 cursor-pointer
                       
                       text-gray-700 dark:text-gray-300
                       
                       border border-green-500/30
                       
                       bg-green-50 dark:bg-green-500/5
                       
                       rounded-xl p-4 transition"
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                  className="accent-green-500"
                />

                <span>Cash on Delivery</span>
              </label>

              {/* ONLINE PAYMENT */}
              <label
                className={`flex items-center gap-3 cursor-pointer
              border rounded-xl p-4 transition
              ${
                method === "razorpay"
                  ? "border-green-500 bg-green-50 dark:bg-green-500/5"
                  : "border-gray-200 dark:border-gray-800"
              }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={method === "razorpay"}
                  onChange={() => setMethod("razorpay")}
                  className="accent-green-500"
                />

                <span className="text-gray-700 dark:text-gray-300">
                  Online Payment
                </span>

                <span className="text-xs text-gray-500 ml-auto">
                  UPI / Card / Net Banking
                </span>
              </label>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            disabled={loading}
            onClick={handlePlaced}
            className="lg:hidden w-full py-3 rounded-xl
                   
                   bg-green-600
                   
                   text-white
                   
                   font-semibold
                   
                   hover:bg-green-400 hover:text-black
                   
                   transition active:scale-95
                   
                   disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
