import { useEffect, useState } from "react";
import { FiChevronDown, FiFilter, FiSearch } from "react-icons/fi"; // إضافة FiSearch
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Redux/productsSlice";
// أضف useLocation إلى الاستيرادات من react-router-dom
import { useLocation } from "react-router-dom";
import { fetchProductsByCategory } from '../Redux/productsSlice';
import { formatCurrency } from '../utils/currencyFormatter';
import { truncateText } from '../utils/textUtils';


export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 1. جلب البيانات من Redux
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  // 2. حالات الفلترة والبحث (Filter & Search States)
  const [searchTerm, setSearchTerm] = useState("");
  // استخدام useLocation لقراءة البيانات الممررة عبر الرابط إن وجدت
 // نقرأ اسم التصنيف القادم من صفحة Categories (إن وُجد)
 const location = useLocation();
 const categoryFromState = location.state?.category || 'ALL';
 const [selectedCategory, setSelectedCategory] = useState(categoryFromState);

 useEffect(() => {
   // 🧠 المنطق الهندسي الجديد:
   if (selectedCategory === 'ALL') {
     // إذا كان ALL نجلب كل المنتجات من السيرفر
     dispatch(fetchProducts()); 
   } else {
     // 🚀 إذا اختار تصنيفاً، ننفذ الرابط الثاني من ملف الـ PDF
     dispatch(fetchProductsByCategory(selectedCategory));
   }
 }, [dispatch, selectedCategory]);
 
  const [priceRange, setPriceRange] = useState(1000); // أقصى سعر افتراضي

  // استخراج التصنيفات ديناميكياً مع استبعاد التصنيف الوهمي "string"
  const categories = [
    "ALL",
    ...new Set(
      products
        .map((item) => item.category)
        .filter((cat) => cat && cat.toLowerCase() !== "string")
    ),
  ];

  // 3. حالات التقسيم (Pagination States)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // 4. تفعيل جلب البيانات عند فتح الصفحة لأول مرة
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // الاستماع لحجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🚨 هام: إعادة الصفحة إلى 1 عند تغيير أي فلتر
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange]);

  // 5. تطبيق الفلاتر والبحث على المنتجات (Derived State)
  // 5. تطبيق الفلاتر والبحث على المنتجات (Derived State) مع تنظيف البيانات الوهمية

  const filteredProducts = products.filter((product) => {
    // 🚨 فلتر التنظيف: استبعاد أي منتج يحتوي على كلمة string أو سعره 0 أو لا يحتوي على صورة
    if (
      !product.title ||
      product.title.toLowerCase() === "string" ||
      product.price === 0 ||
      product.image === "string"
    ) {
      return false; // تجاهل هذا المنتج ولا تعرضه
    }

    // فلتر البحث بالاسم
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // فلتر التصنيف
    const matchCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    // فلتر السعر
    const matchPrice = product.price <= priceRange;

    return matchSearch && matchCategory && matchPrice;
  });

  // 6. حسابات التقسيم بناءً على "المنتجات المفلترة" وليس كل المنتجات
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // 7. خوارزمية أرقام الصفحات
  let startPage = currentPage;
  let endPage = Math.min(startPage + 4, totalPages);

  if (endPage - startPage < 4 && totalPages >= 5) {
    startPage = Math.max(1, endPage - 4);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // دوال التنقل
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  // دالة إعادة ضبط الفلاتر
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
    setPriceRange(1000);
  };

  // معالجة حالة التحميل والأخطاء
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#050505] text-cyan-400 flex justify-center items-center font-bold tracking-widest">
        INITIALIZING ARCHIVES...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-[#050505] text-red-500 flex justify-center items-center font-bold tracking-widest">
        SYSTEM ERROR: {error}
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen relative overflow-hidden flex flex-col md:flex-row px-6 md:px-12 py-12 max-w-[1400px] mx-auto">
      {/* زر إظهار الفلاتر للموبايل فقط */}
      <button
        className="md:hidden flex items-center justify-center space-x-2 bg-gray-900 p-4 mb-6 border border-gray-800"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FiFilter />{" "}
        <span>{isFilterOpen ? "HIDE FILTERS" : "SHOW FILTERS"}</span>
      </button>

      {/* 1. اللوحة الجانبية (Sidebar) */}
      <aside
        className={`w-full md:w-64 md:flex-shrink-0 pr-0 md:pr-8 border-r-0 md:border-r border-gray-900 ${
          isFilterOpen ? "block mb-8" : "hidden md:block"
        }`}
      >
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-8">
          NEURAL FILTERS
        </h3>

        {/* التصنيفات (مربوطة ديناميكياً) */}
        <div className="mb-10">
          <p className="text-[10px] text-gray-500 tracking-widest mb-4">
            CATEGORIES
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-colors border ${
                  selectedCategory === cat
                    ? "bg-cyan-400 text-black border-cyan-400"
                    : "bg-transparent border-gray-800 text-gray-400 hover:text-cyan-400"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* نطاق السعر (مربوط بالـ State) */}
        <div className="mb-10">
          <p className="text-[10px] text-gray-500 tracking-widest mb-4">
            MAXIMUM CREDITS:{" "}
            <span className="text-cyan-400 font-bold">${priceRange}</span>
          </p>
          <input
            type="range"
            min="10"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-gray-800 h-1 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
            <span>$10</span>
            <span>$1000</span>
          </div>
        </div>

        {/* زر إعادة الضبط */}
        <button
          onClick={resetFilters}
          className="w-full bg-cyan-400 text-black font-black py-3 text-xs tracking-[0.2em] hover:bg-white transition shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          RESET UPLINK
        </button>
      </aside>

      {/* 2. المحتوى الرئيسي (Main Content) */}
      <main className="flex-1 md:pl-12 w-full">
        {/* شريط البحث المباشر في الأعلى */}
        <div className="mb-10 relative">
          <FiSearch
            className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400"
            size={20}
          />
          <input
            type="text"
            placeholder="SEARCH ARCHIVES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-16 pr-6 py-5 focus:outline-none focus:border-cyan-400 transition-colors text-xs tracking-widest placeholder:text-gray-700"
          />
        </div>

        {/* العنوان والوصف */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            THE <br /> ARCHIVES
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            High-frequency artifacts curated from the edge of the neural net.
            Engineered for the elite few who operate in the obsidian void.
          </p>
        </div>

        {/* شريط الأدوات */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-900 pb-4 gap-4">
          <p className="text-xs text-cyan-400 font-bold tracking-widest hidden sm:block">
            FOUND {filteredProducts.length} ARTIFACTS
          </p>
          <div className="flex space-x-4 w-full sm:w-auto justify-end">
            <button className="flex items-center space-x-2 bg-[#0a0a0a] border border-gray-800 px-4 py-2 text-xs tracking-widest text-gray-300 hover:border-cyan-400 transition">
              <span>SORT BY RELEVANCE</span>
              <FiChevronDown />
            </button>
          </div>
        </div>

        {/* شبكة المنتجات (مع معالجة حالة عدم وجود نتائج) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-gray-900 bg-[#0a0a0a]">
            <p className="text-red-500 font-bold tracking-[0.3em] mb-2">
              NO ARTIFACTS FOUND
            </p>
            <p className="text-gray-500 text-xs tracking-widest">
              ADJUST YOUR NEURAL FILTERS OR SEARCH PARAMETERS
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {currentProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="bg-[#0a0a0a] relative flex items-center justify-center p-6 border border-gray-900 mb-4 h-64 md:h-80 group-hover:border-cyan-500/30 transition-colors">
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 text-[9px] font-bold px-2 py-1 tracking-widest z-10 ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100 mix-blend-lighten"
                    />
                  </Link>
                </div>

                <div className="flex justify-between items-start mb-1 gap-4">
                  <Link to={`/product/${product.id}`}>
                    <h4
                      className="font-bold text-white tracking-wider text-sm hover:text-cyan-400 transition pr-2"
                      title={product.title}
                    >
                      {/* ✂️ استخدام أداة القص لضمان عدم تشوه التصميم إذا كان الاسم طويلاً جداً */}
                      {truncateText(product.title, 25)}
                    </h4>
                  </Link>
                  <span className="text-cyan-400 font-bold text-sm whitespace-nowrap">
                    {/* 💵 استخدام أداة العملة لتنسيق الرقم باحترافية (مثال: $1,200.00) */}
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 tracking-[0.15em] mb-4 uppercase">
                  {product.category}
                </p>

                <button className="w-full bg-white text-black font-black py-3 text-[10px] tracking-[0.2em] hover:bg-cyan-400 hover:text-black transition-colors mt-auto">
                  INITIALIZE LINK
                </button>
              </div>
            ))}
          </div>
        )}

        {/* تقسيم الصفحات الديناميكي */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 border-t border-gray-900 pt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`text-xs ${
                currentPage === 1
                  ? "text-gray-700 cursor-not-allowed"
                  : "text-gray-500 hover:text-cyan-400"
              }`}
            >
              &lt;
            </button>
            {visiblePages.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                  currentPage === number
                    ? "bg-cyan-400 text-black"
                    : "text-gray-500 hover:text-white bg-transparent"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`text-xs ${
                currentPage === totalPages
                  ? "text-gray-700 cursor-not-allowed"
                  : "text-gray-500 hover:text-cyan-400"
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
