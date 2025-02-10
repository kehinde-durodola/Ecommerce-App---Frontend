import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";
import Header from "./Header";
import SklLoader from "./SklLoader";
import Footer from "./Footer";

// Base URL for API requests, fetched from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductDetails = () => {
  const { slug } = useParams(); // Get product slug from URL parameters
  const navigate = useNavigate(); // Hook for navigation

  // State for product, related products, and loading status
  const [product, setProduct] = useState(null);
  const [categoryProduct, setCategoryProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to the top of the page when the product slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch product details when the component mounts or the slug changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/${slug}`);
        setProduct(response.data);
      } catch (error) {
        navigate("/404"); // Redirect to 404 page if there's an error
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct();
  }, [slug, navigate]);

  // Fetch related products by category when the product data is available
  useEffect(() => {
    const fetchProductByCategory = async () => {
      if (!product || !product.category) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/product/category/${product.category}`
        );
        setCategoryProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductByCategory();
  }, [product]);

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      {loading ? (
        <SklLoader /> // Show skeleton loader while loading
      ) : !product ? (
        <p className="text-center text-xl">Product not found</p> // Show message if product is not found
      ) : (
        <div className="w-full bg-blue-50 py-14 px-4 md:px-0">
          {/* Product Details Container */}
          <div className="max-w-[90%] mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
            {/* Back Navigation Button */}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 mb-4 hover:underline"
            >
              &larr; Back to Products
            </button>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Images */}
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
                <div className="flex gap-2 md:gap-4 mt-4 overflow-x-auto">
                  {[
                    product.image,
                    product.subimage1,
                    product.subimage2,
                    product.subimage3,
                  ].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Category Link */}
                <p className="text-gray-600">
                  Category:{" "}
                  <Link
                    to={`/category/${product.catslug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.category}
                  </Link>
                </p>

                {/* Product Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-3">
                  {product.title}
                </h1>

                {/* Product Price */}
                <p className="text-xl md:text-2xl text-blue-700 font-semibold">
                  ₦ {product.price.toLocaleString()}
                </p>

                {/* Stock Information */}
                <div className="flex items-center gap-2 mt-2 text-red-600 font-medium">
                  <FaExclamationCircle />
                  <span>{product.stock} units left</span>
                </div>

                {/* Add to Cart Section */}
                <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-16 p-2 border rounded-lg"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full md:w-auto">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="max-w-[90%] mx-auto bg-white p-6 mt-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Product Details</h3>
            <p className="text-gray-700">{product.details}</p>
          </div>

          {/* Related Products Section */}
          <div className="max-w-[90%] mx-auto bg-white p-6 mt-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>

            {categoryProduct && categoryProduct.length > 1 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categoryProduct
                  .filter((p) => p._id !== product._id) // Exclude current product
                  .slice(0, 4) // Limit to 4 products
                  .map((p) => (
                    <div
                      key={p._id}
                      className="p-4 border rounded-lg shadow-md text-center cursor-pointer"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      <img
                        src={p.image}
                        className="w-full h-24 md:h-32 object-cover mb-2 rounded-md"
                        alt={p.title}
                      />
                      <p className="text-sm md:text-lg font-semibold line-clamp-1">
                        {p.title}
                      </p>
                      <p className="text-blue-700 font-bold">
                        ₦ {p.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products available.</p>
            )}
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default ProductDetails;
