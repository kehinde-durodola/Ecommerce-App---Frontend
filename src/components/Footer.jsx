import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white p-6 md:p-10 text-center md:text-left">
      {/* Footer Content Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Left Section - Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold">KMart</h2>
          <p className="text-gray-400 mt-2">
            Your one-stop shop for quality products.
          </p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="flex flex-col space-y-2 items-center sm:items-start">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            Shop
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            Contact
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex flex-col space-y-2 items-center sm:items-start">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Facebook Link */}
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>

            {/* Twitter Link */}
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>

            {/* Instagram Link */}
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} KMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
