import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// 1. استدعاء المكون الحارس (تأكد من إنشائه كما في الخطوة السابقة)
import ProtectedRoute from "./components/ProtectedRoute";

// استدعاء المكونات الثابتة (Components)
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// استدعاء الصفحات (Pages)
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Categories from "./pages/Categories";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول: خارج التخطيط الأساسي */}
        <Route path="/login" element={<Login />} />

        {/* المسارات التي تحتوي على Navbar و Footer */}
        <Route element={<MainLayout />}>
          {/* الصفحة الرئيسية: متاحة للجميع لاستعراض العروض */}
          <Route path="/" element={<Home />} />

          {/*  مسارات المتجر المحمية: لا يمكن دخولها بدون تسجيل دخول */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* صفحة 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
