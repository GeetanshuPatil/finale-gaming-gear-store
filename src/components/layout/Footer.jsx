// src/components/Footer.jsx
import { useSelector } from "react-redux";

import { toggleTheme } from "../../features/theme/themeSlice";
import { selectThemeMode } from "../../features/theme/themeSelector";




const Footer = () => {

  const mode = useSelector(selectThemeMode);

  return (
   <footer className="dark:bg-gray-900 dark:border-t  dark:border-black bg-gray-300  border-gray-200 mt-10">
  <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
    
    {/* Left */}
    <p className="text-gray-600">
      © 2026 G-Mart. All rights reserved to Geetanshu.
    </p>

    {/* Links */}
    <div className="flex gap-6">
      <span className="cursor-pointer hover:text-black transition">
        Privacy
      </span>
      <span className="cursor-pointer hover:text-black transition">
        Terms
      </span>
      <span className="cursor-pointer hover:text-black transition">
        Contact
      </span>
    </div>

  </div>
</footer>
  );
};

export default Footer;