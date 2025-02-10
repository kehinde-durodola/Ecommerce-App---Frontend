import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDisplay from "./components/ProductDisplay";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import ProductDetails from "./components/ProductDetails";
import CategoryPage from "./components/CategoryPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/category/:catslug" element={<CategoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
