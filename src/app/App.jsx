// src/app/App.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "../routes/AppRoutes";
import { fetchCart } from "../features/cart/cartSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";

const App = () => {

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [token, dispatch]);

  return <AppRoutes />;
};

export default App;