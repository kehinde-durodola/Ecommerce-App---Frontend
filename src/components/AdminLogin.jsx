import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Base URL for API requests, fetched from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("atoken"); // Retrieve admin token from localStorage

  // Redirect to admin dashboard if token exists
  useEffect(() => {
    if (token) {
      navigate("/admin-dashboard");
    }
  }, [token, navigate]);

  // State for login data, messages, and loading
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // Message for success/error feedback
  const [loading, setLoading] = useState(false); // Loading state for login button

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((currentdata) => ({ ...currentdata, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = loginData;

    // Display a message for 3 seconds
    const displayMessage = (msg) => {
      setMessage(msg);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    };

    // Validate username and password
    if (!username || !password) {
      return displayMessage("Username and password required");
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${BASE_URL}/admin/login`, loginData);

        if (response.status === 200) {
          displayMessage(response.data.message);
          localStorage.setItem("atoken", response.data.token); // Store token in localStorage
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        }
      } catch (error) {
        if (error.response) {
          displayMessage(error.response.data.message);
        } else {
          displayMessage("Unable to process request. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
        {/* Display success/error messages */}
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

        {/* Login Form Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              onChange={handleChange}
              value={loginData.username}
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              onChange={handleChange}
              value={loginData.password}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loader"></span> Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
