import { useEffect, useState, useRef } from "react";
import { Edit, Trash, Upload, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

// Base URL for API requests, fetched from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const formRef = useRef(null); // Ref for scrolling to the form
  const imageRef = useRef(null); // Ref for main image input
  const subImage1Ref = useRef(null); // Ref for sub-image 1 input
  const subImage2Ref = useRef(null); // Ref for sub-image 2 input
  const subImage3Ref = useRef(null); // Ref for sub-image 3 input

  const token = localStorage.getItem("atoken"); // Retrieve admin token from localStorage

  // Verify admin token on component mount
  useEffect(() => {
    if (!token) {
      return navigate("/admin");
    }

    const verifyAdmin = async () => {
      try {
        await axios.get(`${BASE_URL}/admin/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/admin");
      }
    };

    verifyAdmin();
  }, [token, navigate]);

  // State for product data, messages, loading, and all products
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    details: "",
    image: "",
    subimage1: "",
    subimage2: "",
    subimage3: "",
  });
  const [message, setMessage] = useState(""); // Message for success/error feedback
  const [loading, setLoading] = useState(false); // Loading state for upload button
  const [isFetching, setIsFetching] = useState(true);
  const [allProducts, setAllProducts] = useState([]); // List of all products

  // State for delete modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch all products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/list`);
      setAllProducts(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle admin logout
  const handleLogout = () => {
    localStorage.removeItem("atoken");
    navigate("/admin");
  };

  // Convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle form input changes
  const handleChange = async (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        const base64 = await convertToBase64(file);
        setProductData((currentdata) => ({ ...currentdata, [name]: base64 }));
      }
    } else {
      setProductData((currentdata) => ({
        ...currentdata,
        [name]: e.target.value,
      }));
    }
  };

  // Handle product upload
  const handleUpload = async (e) => {
    e.preventDefault();

    // Display a message for 3 seconds
    const displayMessage = (msg) => {
      setMessage(msg);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    };

    const {
      title,
      price,
      stock,
      category,
      details,
      image,
      subimage1,
      subimage2,
      subimage3,
    } = productData;

    // Validate all fields are filled
    if (
      !title ||
      !price ||
      !stock ||
      !category ||
      !details ||
      !image ||
      !subimage1 ||
      !subimage2 ||
      !subimage3
    ) {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return displayMessage("All fields are required");
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/product/upload`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          displayMessage(response.data.message);
          fetchProducts();
        }
      } catch (error) {
        if (error.response) {
          displayMessage(error.response.data.message);
        } else {
          displayMessage("Unable to process request. Please try again later.");
        }
      } finally {
        setLoading(false);
        formRef.current?.scrollIntoView({ behavior: "smooth" });

        // Reset form data
        setProductData({
          title: "",
          price: "",
          stock: "",
          category: "",
          details: "",
        });

        // Clear file inputs
        if (imageRef.current) imageRef.current.value = "";
        if (subImage1Ref.current) subImage1Ref.current.value = "";
        if (subImage2Ref.current) subImage2Ref.current.value = "";
        if (subImage3Ref.current) subImage3Ref.current.value = "";
      }
    }, 200);
  };

  // Open delete confirmation modal
  const confirmDelete = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (!selectedProductId) return;

    const token = localStorage.getItem("atoken");

    try {
      const response = await axios.delete(
        `${BASE_URL}/product/delete/${selectedProductId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        fetchProducts();
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("Unable to process request. Please try again later.");
      }
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen p-4 md:p-10">
      <div
        ref={formRef}
        className="max-w-full md:max-w-[80%] mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg relative"
      >
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-600 text-white p-2 md:p-3 rounded-lg flex items-center gap-2"
        >
          <LogOut className="w-4 h-4 md:w-5 md:h-5" /> Logout
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center md:text-left">
          Admin Dashboard
        </h2>

        {/* Product Upload Form */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md mb-6 md:mb-10">
          {message && (
            <p
              className={`w-full text-center font-medium mb-4 p-2 rounded ${
                message.toLowerCase().includes("successful")
                  ? "text-green-700 bg-green-100 border border-green-500"
                  : "text-red-700 bg-red-100 border border-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
          <form
            onSubmit={handleUpload}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            <input
              onChange={handleChange}
              value={productData.title}
              type="text"
              name="title"
              placeholder="Product Title"
              className="p-2 md:p-3 border rounded-lg outline-none"
            />
            <input
              onChange={handleChange}
              value={productData.price}
              type="number"
              name="price"
              placeholder="Product Price"
              className="p-2 md:p-3 border rounded-lg outline-none"
            />
            <input
              onChange={handleChange}
              value={productData.stock}
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              className="p-2 md:p-3 border rounded-lg outline-none"
            />
            <select
              onChange={handleChange}
              value={productData.category}
              name="category"
              className="p-2 md:p-3 border rounded-lg outline-none"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Phones & Tablets">Phones & Tablets</option>
              <option value="Computing">Computing</option>
              <option value="Fashion">Fashion</option>
              <option value="Gaming">Gaming</option>
              <option value="Grocery">Grocery</option>
            </select>
            <textarea
              onChange={handleChange}
              value={productData.details}
              name="details"
              placeholder="Product Details"
              className="p-2 md:p-3 border rounded-lg outline-none col-span-1 md:col-span-2 h-24"
            ></textarea>
            <input
              ref={imageRef}
              onChange={handleChange}
              name="image"
              type="file"
              accept="image/*"
              className="p-2 md:p-3 border rounded-lg"
            />
            <input
              ref={subImage1Ref}
              onChange={handleChange}
              name="subimage1"
              type="file"
              accept="image/*"
              className="p-2 md:p-3 border rounded-lg"
            />
            <input
              ref={subImage2Ref}
              onChange={handleChange}
              name="subimage2"
              type="file"
              accept="image/*"
              className="p-2 md:p-3 border rounded-lg"
            />
            <input
              ref={subImage3Ref}
              onChange={handleChange}
              name="subimage3"
              type="file"
              accept="image/*"
              className="p-2 md:p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-blue-600 text-white p-2 md:p-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="loader"></span> Uploading...
                </div>
              ) : (
                <>
                  <Upload className="w-4 h-4 md:w-5 md:h-5" /> Add Product
                </>
              )}
            </button>
          </form>
        </div>

        {/* Uploaded Products */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Uploaded Products</h3>
          {isFetching ? (
            <div className="loading-text">Fetching products</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {allProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-4 md:p-5 border rounded-lg shadow-md bg-gray-50"
                >
                  <img
                    src={product.image}
                    className="w-full h-32 object-cover mb-3 rounded-md"
                  />
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-blue-700 font-bold">
                    ₦ {product.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600">Stock: {product.stock}</p>
                  <div className="flex justify-between mt-3">
                    <button className="flex items-center gap-1 text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(product._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;
