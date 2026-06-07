import { AnimatePresence, motion } from "framer-motion";

import ProductList from "../products/pages/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../products/productSlice";
import { useEffect, useState } from "react";

import heroMobileImg from "../../assets/hero1.jpg";
import heroImg from "../../assets/hero2.jpg";

import mouseImg from "../../assets/categories/mouse.jpg";
import keyboardImg from "../../assets/categories/keyboard.jpg";
import headsetImg from "../../assets/categories/headset.jpg";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    dispatch(setCategory(cat));
    navigate(`/productsPage?category=${cat}`);
  };

  const rotatingWords = [
    "Gaming Setup",
    "Battle Station",
    "Performance",
    "Gear Collection",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [startRotation, setStartRotation] = useState(false);

  useEffect(() => {
    if (!startRotation) return;

    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [startRotation]);

  return (
    <div className=" text-white ">
      {/* 🔥 HERO SECTION */}
      <section className="relative w-full h-[calc(100vh-64px)] md:h-[650px] overflow-hidden mb-10 bg-black">
        {/* Background Image */}
        {/* Desktop Image */}
        <img
          src={heroImg}
          alt="gaming setup"
          className="hidden md:block absolute inset-0 z-0 w-full h-full object-cover opacity-70"
        />

        {/* Mobile Image */}
        <img
          src={heroMobileImg}
          alt="gaming setup mobile"
          className="block md:hidden absolute inset-0 z-0 w-full h-full object-cover opacity-70"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/80 to-black/20" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12">
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onAnimationComplete={() => setStartRotation(true)}
            className="text-3xl dark:text-gray-50 md:text-5xl font-bold leading-tight max-w-sm md:max-w-none"
          >
            Level Up Your{" "}
            <span className="relative inline-block h-[42px] md:h-[60px] min-w-[230px] md:min-w-[380px] align-bottom overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={startRotation ? { opacity: 0, y: 25 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute left-0 top-0 text-green-500"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mt-3 text-gray-300 max-w-md"
          >
            Premium gaming gear for pro performance. Mice, keyboards, headsets
            and more.
          </motion.p>

          <motion.button
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            whileHover={{
              scale: 1.04,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            }}
            whileTap={{
              scale: 0.97,
              transition: {
                duration: 0.08,
              },
            }}
            onClick={() => handleCategoryClick("all")}
            className="group mt-5 w-fit px-6 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold shadow-lg shadow-green-500/20 transition-colors duration-300 flex items-center gap-2 will-change-transform"
          >
            Shop Now
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </div>
      </section>

      {/* 🎮 CATEGORY CARDS */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 dark:text-gray-50 text-green-500">
            Shop by Category
          </h2>

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
                <h3 className="text-xl font-semibold text-white">
                  Gaming Mice
                </h3>

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
        </motion.div>
        {/* 🔥 SECTION TITLE */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <h2 className="text-2xl font-semibold dark:text-gray-50 text-green-500">
              Trending Gear
            </h2>

            <button
              onClick={() => navigate("/productsPage")}
              className="text-sm dark:text-gray-50 text-green-500 font-bold dark:hover:text-green-500 hover:text-gray-600 transition"
            >
              View All →
            </button>
          </motion.div>

          <ProductList limit={4} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
