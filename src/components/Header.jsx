import {
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  LogIn,
  Heart,
  Package,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // State for dropdown and mobile menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md relative">
      {/* Header Container */}
      <div className="max-w-[80%] mx-auto flex items-center justify-between py-5 px-4 md:px-0">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-wide">
          <Link to="/" className="no-underline">
            KMart
          </Link>
        </h1>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden w-1/2 shadow-sm">
          <span className="p-3 bg-gray-100">
            <Search className="w-6 h-6 text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 p-3 outline-none text-lg"
          />
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold">
            Search
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-800 text-lg font-medium relative">
          {/* Account Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 hover:text-blue-600 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="w-5 h-5" /> Account
              {isDropdownOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border shadow-lg rounded-lg overflow-hidden z-10">
                <button className="w-full p-3 text-left text-blue-600 font-semibold flex items-center gap-2 hover:bg-gray-100">
                  <LogIn className="w-5 h-5" /> Sign In
                </button>
                <hr className="border-gray-300" />
                <a
                  href="#"
                  className="block p-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <User className="w-5 h-5" /> My Account
                </a>
                <a
                  href="#"
                  className="block p-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <Package className="w-5 h-5" /> Orders
                </a>
                <a
                  href="#"
                  className="block p-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5" /> Wishlist
                </a>
              </div>
            )}
          </div>

          {/* Cart Link */}
          <a href="#" className="flex items-center gap-2 hover:text-blue-600">
            <ShoppingCart className="w-5 h-5" /> Cart
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full py-4 z-20">
          <div className="flex flex-col items-center gap-4">
            {/* Account Dropdown (Mobile) */}
            <button
              className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-blue-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="w-5 h-5" /> Account
              {isDropdownOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Dropdown Menu (Mobile) */}
            {isDropdownOpen && (
              <div className="w-48 bg-white border shadow-md rounded-lg">
                <button className="w-full p-3 text-left text-blue-600 font-semibold flex items-center gap-2 hover:bg-gray-100">
                  <LogIn className="w-5 h-5" /> Sign In
                </button>
                <hr className="border-gray-300" />
                <a
                  href="#"
                  className="block p-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <User className="w-5 h-5" /> My Account
                </a>
                <a
                  href="#"
                  className="block p-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <Package className="w-5 h-5" /> Orders
                </a>
                <a
                  href="#"
                  className="block p-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5" /> Wishlist
                </a>
              </div>
            )}

            {/* Cart Link (Mobile) */}
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-blue-600"
            >
              <ShoppingCart className="w-5 h-5" /> Cart
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
