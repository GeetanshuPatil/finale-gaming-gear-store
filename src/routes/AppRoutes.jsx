// src/routes/AppRoutes.jsx

import { createBrowserRouter, RouterProvider, ScrollRestoration } from "react-router-dom";

import Layout from "../components/layout/Layout";

import ProtectedRoute from "../routes/ProtectedRoute";

import ProductList from "../features/products/pages/ProductList";
import ProductDetails from "../features/products/pages/ProductDetails";
import Cart from "../features/cart/pages/Cart";

import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";


import OrderSuccess from "../features/orders/pages/orderSuccessful";
import Wishlist from "../features/wishlist/pages/Wishlist";
import HomePage from "../features/home/HomePage";
import Checkout from "../features/checkout/pages/Checkout";
import ProductsPage from "../features/products/pages/ProductsPage";
import SearchPage from "../features/search/SearchPage";
import ComingSoon from "../features/common/ComingSoon";

const RootLayout = () => {
  return (
    <>
      <Layout />
      <ScrollRestoration />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />, 
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/productsPage", element: <ProductsPage />
      },
      {
        path:"/search", element: <SearchPage/>
      },
      {
        path: "/coming_soon", element: <ComingSoon></ComingSoon>
      },
      
      { path: "/product/:id", element: <ProductDetails /> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      { path: "/cart", element: <Cart /> },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      { path: "/wishlist", element: <Wishlist /> },
    ],
  },

  // fallback route
  {
    path: "*",
    element: <h1 className="p-4">404 Not Found</h1>,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
