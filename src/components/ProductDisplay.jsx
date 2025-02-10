import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import SkeletonLoader from "./SkeletonLoader";
import Footer from "./Footer";

// Base URL for API requests, fetched from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductDisplay = () => {
  const navigate = useNavigate(); // Hook for navigation

  // State for all products and loading status
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/list`);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="w-full bg-blue-50 py-14">
        <div className="max-w-[90%] mx-auto bg-white p-8 rounded-xl shadow-lg">
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4 cursor-pointer">
            {loading
              ? // Display skeleton loaders while loading
                Array(8)
                  .fill(0)
                  .map((_, index) => <SkeletonLoader key={index} />)
              : // Display products once loaded
                allProducts.map((product) => (
                  <div
                    key={product._id}
                    className="p-2 border rounded-lg shadow-md text-center transition-transform transform hover:scale-105"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    {/* Product Image */}
                    <img
                      src={product.image}
                      className="w-full h-44 object-cover mb-3 rounded-md"
                    />

                    {/* Product Title */}
                    <h2 className="text-lg sm:text-xl font-semibold line-clamp-1">
                      {product.title}
                    </h2>

                    {/* Product Price */}
                    <p className="text-blue-700 font-bold text-base sm:text-lg">
                      ₦ {product.price.toLocaleString()}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default ProductDisplay;
