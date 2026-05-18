import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "../routes/AppRoutes";

import { fetchProducts } from "../features/products/productSlice";
import { fetchCart } from "../features/cart/cartSlice";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";

import FullPageLoader from "../components/ui/FullPageLoader";

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const products = useSelector((state) => state.products.items);
  
  const productsLoading = useSelector((state) => state.products.listLoading);
  
  const appLoading = productsLoading && products.length === 0;


  useEffect(() => {
    // products for everyone
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [token, dispatch]);

  // fullscreen loader
  if (appLoading) {
    return <FullPageLoader />;
  }

  return <AppRoutes />;
};

export default App;
