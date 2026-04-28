import { useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../Redux/productsSlice'; // استدعاء دالة الجلب

//  قاموس الصور: نربط كل تصنيف متوقع بصورة تناسب تصميم الموقع
const CATEGORY_UI = {
  "electronics": { image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800", desc: "High-frequency computing modules." },
  "clothing": { image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800", desc: "Next-gen protective apparel." },
  "accessories": { image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800", desc: "AR visors and enhancements." },
  "shoes": { image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800", desc: "Neon-reactive performance footwear." },
  // صورة افتراضية لأي تصنيف جديد يأتي من السيرفر ولم نضف له صورة
  "default": { image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800", desc: "Elite digital artifacts." }
};

export default function Categories() {
  const dispatch = useDispatch();
  // نجلب التصنيفات وحالة التحميل من Redux
  const { categories, categoriesStatus } = useSelector((state) => state.products);

  useEffect(() => {
    // نجلب التصنيفات من السيرفر عند فتح الصفحة 
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-bold mb-3 uppercase">Neural Divisions</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">Explore <br /> Categories</h1>
          <p className="text-gray-400 max-w-lg text-sm leading-relaxed">
            Data fetched directly from the server nodes.
          </p>
        </div>

        {categoriesStatus === 'loading' ? (
          <div className="text-cyan-400 font-bold tracking-widest animate-pulse">FETCHING CATEGORIES FROM SERVER...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {categories.map((catName, index) => {
              // نبحث عن الصورة المناسبة للتصنيف أو نستخدم الافتراضية
              const uiData = CATEGORY_UI[catName.toLowerCase()] || CATEGORY_UI["default"];
              const spanClass = index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1';

              return (
                <Link 
                  to="/products"
                  // نرسل اسم التصنيف كـ State لكي تلتقطه صفحة المنتجات
                  state={{ category: catName }} 
                  key={index}
                  className={`group relative overflow-hidden bg-[#0a0a0a] border border-gray-900 hover:border-cyan-400/50 transition-colors duration-500 flex flex-col justify-end p-8 ${spanClass}`}
                >
                  <div className="absolute inset-0">
                    <img src={uiData.image} alt={catName} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-50 group-hover:opacity-30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase">{catName}</h2>
                      <FiArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 group-hover:translate-x-0" size={24} />
                    </div>
                    <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                      {uiData.desc}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}