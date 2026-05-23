import ProductList from "../products/pages/ProductList";
import heroImg from "../../assets/hero2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../products/productSlice";

import { toggleTheme } from "../../features/theme/themeSlice";
import { selectThemeMode } from "../../features/theme/themeSelector";

import mouseImg from "../../assets/categories/mouse.jpg";
import keyboardImg from "../../assets/categories/keyboard.jpg";
import headsetImg from "../../assets/categories/headset.jpg";

const HomePage = () => {
  const mode = useSelector(selectThemeMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.products.category);

  const handleCategoryClick = (cat) => {
    dispatch(setCategory(cat));
    navigate(`/productsPage?category=${cat}`);
  };

  return (
    <div className=" text-white ">
      {/* 🔥 HERO SECTION */}
      <section className="relative w-full overflow-hidden mb-10">
        {/* Background */}
        <img
          src={heroImg}
          alt="gaming setup"
          className="w-full h-[600px] md:h-[650px] object-cover opacity-60"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-3xl dark:text-gray-50  md:text-5xl font-bold leading-tight">
            Level Up Your <span className="text-green-500">Gaming Setup</span>
          </h1>

          <p className="mt-3 text-gray-300 max-w-md">
            Premium gaming gear for pro performance. Mice, keyboards, headsets
            and more.
          </p>

          <button
            onClick={() => handleCategoryClick("all")}
            className="mt-5 w-fit px-6 py-2.5 rounded-xl  bg-green-600 text-white hover:bg-green-700 text-black font-semibold transition"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* 🎮 CATEGORY CARDS */}
      <div  className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 dark:text-gray-50 text-green-500">Shop by Category</h2>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Mouse */}
          <div
            onClick={() => handleCategoryClick("mouse")}
            className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer border border-gray-800"
          >
            <img
              src={mouseImg}
              alt="mouse"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-semibold text-white">Gaming Mice</h3>

              <p className="text-sm text-gray-300">Precision & speed</p>
            </div>
          </div>

          {/* Keyboard */}
          <div
            onClick={() => handleCategoryClick("keyboard")}
            className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer border border-gray-800"
          >
            <img
              src={keyboardImg}
              alt="keyboard"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-semibold text-white">Keyboards</h3>

              <p className="text-sm text-gray-300">Mechanical performance</p>
            </div>
          </div>

          {/* Headset */}
          <div
            onClick={() => handleCategoryClick("headset")}
            className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer border border-gray-800"
          >
            <img
              src={headsetImg}
              alt="headset"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-semibold text-white">Headsets</h3>

              <p className="text-sm text-gray-300">Immersive audio</p>
            </div>
          </div>
        </div>
      </div>
      {/* 🔥 SECTION TITLE */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center  justify-between mb-4">
          <h2 className="text-2xl font-semibold dark:text-gray-50 text-green-500">Trending Gear</h2>

          <button
            onClick={() => navigate("/productsPage")}
            className="text-sm dark:text-gray-50 text-green-500 font-bold dark:hover:text-green-500 hover:text-gray-600 transition"
          >
            View All →
          </button>
        </div>

        <ProductList limit={4} />
      </div>
      </div>
    </div>
  );
};

export default HomePage;
