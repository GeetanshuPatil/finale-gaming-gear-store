// src/components/Layout.jsx

import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { toggleTheme } from "../../features/theme/themeSlice";
import { selectThemeMode } from "../../features/theme/themeSelector";

import { useSelector } from "react-redux";

const Layout = () => {
  const mode = useSelector(selectThemeMode);

  useEffect(() => {
  document.documentElement.classList.toggle(
    "dark",
    mode === "dark"
  );

  localStorage.setItem("theme", mode);
}, [mode]);

  return (
    <div className="min-h-screen dark:bg-gradient-to-b bg-gray-200 from-gray-950 via-gray-900 to-gray-950 dark:text-gray-100 flex flex-col">
      <Navbar />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#111827",
            color: "#E5E7EB",
            borderRadius: "12px",
            border: "1px solid #1F2937",
          },
        }}
        containerStyle={{
          top: 85,
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
