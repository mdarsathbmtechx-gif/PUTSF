// src/Modules/Homepages/Layout/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      {/* Logo */}
      <a href="/" className="text-indigo-600">
        <svg
          width="157"
          height="40"
          viewBox="0 0 157 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG Path here */}
          <path
            d="M47.904 28.28q-1.54 0-2.744-.644..."
            fill="currentColor"
          />
        </svg>
      </a>

      {/* Desktop Menu */}
      <ul className="md:flex hidden items-center gap-10">
        <li>
          <Link to="/" className="hover:text-gray-500/80 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:text-gray-500/80 transition">
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/blog" className="hover:text-gray-500/80 transition">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-500/80 transition">
            Contact
          </Link>
        </li>
      </ul>

      {/* Desktop Button */}
      <button
        type="button"
        className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
      >
        Get started
      </button>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        onClick={toggleMobileMenu}
        className="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#000"
        >
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 ..." />
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <a href="#" className="text-sm">
                Home
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-sm">
                Gallery
              </a>
            </li>
            <li>
              <a href="#blog" className="text-sm">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm">
                Contact
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
          >
            Get started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
