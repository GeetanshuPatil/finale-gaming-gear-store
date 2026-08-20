// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">
              Gaming Gear <span className="text-green-500">Zone</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Your ultimate destination for gaming gear. Discover gaming
              peripherals, accessories, and everything you need to level up
              your gaming experience.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white
                transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-800 text-gray-400 hover:bg-pink-600 hover:text-white
                transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-800 text-gray-400 hover:bg-sky-500 hover:text-white
                transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full
                bg-gray-800 text-gray-400 hover:bg-indigo-600 hover:text-white
                transition-all duration-300"
                aria-label="Discord"
              >
                <FaDiscord size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/productsPage"
                  className="hover:text-blue-400 transition"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/productsPage?search=&category=keyboard&sort=default"
                  className="hover:text-blue-400 transition"
                >
                  Keyboards
                </Link>
              </li>

              <li>
                <Link
                  to="/productsPage?search=&category=mouse&sort=default"
                  className="hover:text-blue-400 transition"
                >
                  Gaming Mice
                </Link>
              </li>

              <li>
                <Link
                  to="/productsPage?search=&category=headset&sort=default"
                  className="hover:text-blue-400 transition"
                >
                  Headsets
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="hover:text-blue-400 transition"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">

            <p>
              © 2026{" "}
              <span className="text-gray-300 font-medium">
                Gaming Gear Zone
              </span>
              . All rights reserved.
            </p>

            <p>
              Built by{" "}
              <span className="text-gray-400 font-medium">
                Geetanshu Patil
              </span>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;