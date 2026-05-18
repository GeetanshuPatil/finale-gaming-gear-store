import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Moon, Sun, Menu, X, Search } from "lucide-react";
import { resetCart } from "../../features/cart/cartSlice";
import { resetWishlist } from "../../features/wishlist/wishlistSlice";
import logo from "../../assets/favicon.png";
import { toggleTheme } from "../../features/theme/themeSlice";
import { selectThemeMode } from "../../features/theme/themeSelector";
import { useState } from "react";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/productsPage?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => {
    dispatch(logout());

    dispatch(resetCart());
    dispatch(resetWishlist());

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const mode = useSelector(selectThemeMode);

  return (
    <nav className="dark:bg-gray-900 bg-gray-200 dark:border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT SECTION */}

        {/* Menu */}

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg
             text-gray-700 dark:text-gray-200
             hover:bg-gray-200 dark:hover:bg-gray-800
             transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}

          <Link to="/" className="flex items-center gap-1">
            <img
              src={logo}
              alt="GearZone Logo"
              className="h-8 w-auto object-contain rounded-3xl"
            />

            <span className="text-lg font-semibold hidden sm:flex items-center">
              <span className="dark:text-white text-black p-1 ">Gear</span>
              <span className="text-green-500">Zone</span>
            </span>
          </Link>
        </div>

        {/* Search */}

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2"
        >
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gear..."
              className="w-64 px-4 py-2 pr-10 rounded-xl
                 
                 bg-gray-100 dark:bg-gray-900
                 
                 border border-gray-300 dark:border-gray-700
                 
                 text-gray-900 dark:text-white
                 
                 placeholder:text-gray-500
                 
                 focus:outline-none
                 focus:ring-2 focus:ring-green-500"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2
                   
                   text-gray-400 hover:text-red-500
                   
                   transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl
               
               bg-green-600 text-white
               
               hover:bg-green-500
               
               transition"
          >
            Search
          </button>
        </form>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300 hover:text-green-400">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative px-3 py-1 text-sm transition ${
                isActive
                  ? "dark:text-green-400  text-gray-700"
                  : "dark:hover:text-gray-200 dark:text-green-500 text-gray-700 hover:text-green-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gray-700 dark:bg-green-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `relative flex items-center justify-center px-3 py-1 transition ${
                isActive
                  ? "dark:text-green-400  text-gray-700"
                  : "dark:hover:text-gray-200 dark:text-green-500 text-gray-700 hover:text-green-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Heart className="w-5 h-5" />

                {/* Badge */}
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1">
                    {wishlistItems.length}
                  </span>
                )}

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gray-700 dark:bg-green-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center justify-center px-3 py-1 transition ${
                isActive
                  ? "dark:text-green-400  text-gray-700"
                  : "dark:hover:text-gray-200 dark:text-green-500 text-gray-700 hover:text-green-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <ShoppingCart className="w-5 h-5" />

                {/* Badge */}
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
                    {cartItems.length}
                  </span>
                )}

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-gray-700 dark:bg-green-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>
          <div>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-xl bg-gray-200 text-gray-700
             dark:bg-gray-900 dark:text-white
             hover:bg-green-600 transition hover:text-gray-200"
            >
              {mode === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5 " />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}

        <div className="flex md:hidden items-center gap-4">
          {/* SEARCH */}
          <button
            onClick={() => navigate("/search")}
            className="p-2 rounded-lg
             text-gray-700 dark:text-gray-200
             hover:bg-gray-200 dark:hover:bg-gray-800
             transition"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <Heart className="w-5 h-5" />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white rounded-full px-1">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          {token ? (
            <>
              <span className="dark:text-gray-100 text-gray-700 sm:block">
                Hi, {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl md:flex hidden bg-red-500 text-gray-100 hover:bg-gray-200 hover:text-gray-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "dark:text-white text-gray-950 b font-medium"
                    : "dark:text-gray-100 text-gray-950 hover:text-green-500 transition"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-xl text-white transition ${
                    isActive
                      ? "bg-gray-600 hover:bg-gray-400"
                      : "bg-green-600 hover:bg-gray-800"
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* OVERLAY */}

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SLIDING MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-72
  bg-white dark:bg-gray-900
  border-l border-gray-200 dark:border-gray-800
  z-50 transform transition-transform duration-300
  md:hidden
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-5 gap-5">
          {/* HOME */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-200 hover:text-green-500 transition"
          >
            Home
          </Link>

          {/* THEME */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center justify-between
      text-gray-700 dark:text-gray-200
      hover:text-green-500 transition"
          >
            <span>{mode === "dark" ? "Light Mode" : "Dark Mode"}</span>

            <span>{mode === "dark" ? "☀️" : "🌙"}</span>
          </button>

          <Link
            to="/productsPage"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 dark:text-gray-200 hover:text-green-500 transition"
          >
            Products
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between
      text-gray-700 dark:text-gray-200
      hover:text-green-500 transition"
          >
            <span>Wishlist</span>

            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-black font-semibold">
              {wishlistItems.length}
            </span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between
      text-gray-700 dark:text-gray-200
      hover:text-green-500 transition"
          >
            <span>Cart</span>

            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-black font-semibold">
              {cartItems.length}
            </span>
          </Link>

          {/* AUTH */}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-left text-red-500 hover:text-red-400 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-green-500 transition"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
