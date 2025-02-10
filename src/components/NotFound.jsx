import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        {/* 404 Heading */}
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>

        {/* Error Message */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Alert Icon */}
        <AlertCircle className="w-24 h-24 text-gray-400 mb-6" />

        {/* Go Back Home Button */}
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default NotFound;
