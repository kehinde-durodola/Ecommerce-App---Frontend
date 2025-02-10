import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import SkeletonLoader from "./SkeletonLoader";

// Base URL for API requests, fetched from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CategoryPage = () => {
  const navigate = useNavigate();
  const { catslug } = useParams(); // Get category slug from URL parameters

  // State for category products and loading status
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to the top of the page when the category slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catslug]);

  // Fetch products by category when the component mounts or the category slug changes
  useEffect(() => {
    const fetchProductByCategory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product/catslug/${catslug}`
        );
        setCategoryProducts(response.data);
      } catch (error) {
        navigate("/404"); // Redirect to 404 page if there's an error
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProductByCategory();
  }, [catslug, navigate]);

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="w-full bg-blue-50 py-14">
        <div className="max-w-[90%] mx-auto bg-white p-8 rounded-xl shadow-lg">
          {/* Back Navigation Button */}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 mb-4 hover:underline"
          >
            &larr; Back to Products
          </button>

          {/* Category Heading */}
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            {catslug.toUpperCase()}
          </h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4 cursor-pointer">
            {loading
              ? // Display skeleton loaders while loading
                Array(8)
                  .fill(0)
                  .map((_, index) => <SkeletonLoader key={index} />)
              : // Display products once loaded
                categoryProducts.map((product) => (
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

export default CategoryPage;
