import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiRotateCcw,
  FiShield,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, getTotals } from "../Redux/cartSlice";
import { clearSelectedProduct, getSingleProduct } from "../Redux/productsSlice"; // استدعاء الدوال من Redux

export default function Product() {
  const { id } = useParams(); // 1. التقاط الـ ID من الرابط (المسار الديناميكي)
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // 2. قراءة حالة المنتج المختار من Redux
  const {
    selectedProduct: product,
    status,
    error,
  } = useSelector((state) => state.products);

  // 3. جلب البيانات عند تحميل الصفحة وتنظيفها عند الخروج
  useEffect(() => {
    // إرسال طلب للسيرفر لجلب المنتج المطلوب
    dispatch(getSingleProduct(id));

    // دالة التنظيف (Cleanup): تمسح المنتج من الذاكرة عند مغادرة الصفحة
    // لكي لا يظهر منتج قديم للمستخدم في المرة القادمة قبل اكتمال التحميل
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  // 4. معالجة حالات التحميل والأخطاء
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center text-cyan-400 space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold tracking-[0.3em] text-xs">
          DECRYPTING PRODUCT DATA...
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-[#050505] flex justify-center items-center text-red-500 font-bold tracking-widest">
        SYSTEM ERROR: {error}
      </div>
    );
  }

  // في حال لم يصل المنتج بعد (يمنع تحطم الصفحة)
  if (!product) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  // دالة تنفيذ الإضافة للسلة
  const handleAddToCart = () => {
    // نرسل المنتج مع الكمية التي اختارها المستخدم
    dispatch(addToCart({ ...product, quantity }));
    // نحدث الإجماليات فوراً
    dispatch(getTotals());
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-6 md:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* 1. مسار العودة (Breadcrumbs) */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors mb-12 text-xs tracking-widest font-bold border-b border-transparent hover:border-cyan-400 pb-1"
        >
          <FiArrowLeft /> BACK TO ARCHIVES
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 2. منطقة صورة المنتج */}
          <div className="relative group">
            {/* توهج خلفي يعتمد على التصميم */}
            <div className="absolute inset-0 bg-cyan-400/5 blur-3xl rounded-full pointer-events-none" />
            <div className="border border-gray-900 bg-[#0a0a0a] p-12 relative overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                // وضعنا mix-blend-lighten لدمج الصور ذات الخلفيات البيضاء مع التصميم المظلم إن وجدت
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-lighten"
              />
              <div className="absolute top-4 left-4 bg-cyan-400 text-black text-[9px] font-black px-2 py-1 tracking-widest">
                GEN_ID: {product.id}
              </div>
            </div>
          </div>

          {/* 3. منطقة تفاصيل المنتج */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="text-cyan-400 text-xs tracking-[0.4em] font-bold mb-4 uppercase">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">
                {product.title}
              </h1>
              {/* عرض السعر المنسق القادم من السيرفيس */}
              <p className="text-3xl font-black text-white">
                {product.displayPrice || `$${product.price}`}
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-lg border-l-2 border-gray-800 pl-6 py-2 text-sm">
              {product.description}
            </p>

            {/* محدد الكمية (Quantity Selector) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center border border-gray-800 bg-[#0a0a0a] w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-5 py-3 hover:bg-gray-900 hover:text-cyan-400 transition text-gray-500 font-bold"
                >
                  {" "}
                  -{" "}
                </button>
                <span className="px-6 py-3 font-mono text-sm font-bold">
                  {String(quantity).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-5 py-3 hover:bg-gray-900 hover:text-cyan-400 transition text-gray-500 font-bold"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <p className="text-[10px] text-gray-600 tracking-widest uppercase">
                <span className="text-cyan-400 font-bold">12</span> units
                available in local node
              </p>
            </div>

            {/* أزرار الإجراءات (Actions) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}    
                className="flex-1 bg-cyan-400 text-black font-black py-4 tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 text-xs"
              >
                <FiShoppingCart size={16} /> INITIALIZE CART LINK
              </button>
              <button className="flex-1 border border-gray-800 text-gray-300 font-bold py-4 tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-colors text-xs">
                ADD TO WATCHLIST
              </button>
            </div>

            {/* شارات الثقة (Trust Badges) لتعبئة الفراغ التصميمي */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-900">
              <div className="text-center space-y-3 p-4 bg-[#0a0a0a] border border-gray-900/50">
                <FiTruck className="mx-auto text-gray-500" size={18} />
                <p className="text-[8px] tracking-[0.2em] text-gray-500 uppercase font-bold">
                  Secure Delivery
                </p>
              </div>
              <div className="text-center space-y-3 p-4 bg-[#0a0a0a] border border-gray-900/50">
                <FiRotateCcw className="mx-auto text-gray-500" size={18} />
                <p className="text-[8px] tracking-[0.2em] text-gray-500 uppercase font-bold">
                  30-Day Sync-Back
                </p>
              </div>
              <div className="text-center space-y-3 p-4 bg-[#0a0a0a] border border-gray-900/50">
                <FiShield className="mx-auto text-gray-500" size={18} />
                <p className="text-[8px] tracking-[0.2em] text-gray-500 uppercase font-bold">
                  Encrypted Privacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
