import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // منتج افتراضي في حال لم يتم تمرير بيانات (للتجربة)
  const item = product || {
    id: 1,
    title: "CHRONO SHIFT",
    category: "ACCESSORIES",
    price: 299.99,
    image: "https://via.placeholder.com/300x300/111/fff?text=Watch" // صورة وهمية للتجربة
  };


  

  return (



    
    <div className="bg-[#121212] group rounded-lg overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
      {/* منطقة الصورة */}
     {/* ── منطقة الصورة (تم تصحيح الأبعاد هنا) ── */}
     <div className="relative h-64 w-full bg-[#050505] overflow-hidden">
        {/* جعلنا الرابط يأخذ المساحة بالكامل */}
        <Link to={`/product/${item.id}`} className="block w-full h-full">
          <img 
            src={item.image} 
            alt={item.title} 
            // استخدام w-full h-full مع object-cover يضمن توحيد مقاسات كل الصور
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-5 flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-500 tracking-widest mb-1">{item.category.toUpperCase()}</p>
          <Link to={`/product/${item.id}`}>
            <h3 className="text-lg font-bold text-white mb-2 hover:text-cyan-400 transition">{item.title}</h3>
          </Link>
          <p className="text-gray-300">${item.price}</p>
        </div>

        {/* زر الإضافة للسلة (كما في التصميم: مربع أبيض/مضيء) */}
        <button 
          className="bg-white text-black hover:bg-cyan-400 hover:text-white w-10 h-10 flex items-center justify-center rounded transition-colors duration-300"
          title="Add to Cart"
        >
          <FiPlus size={20} />
        </button>
      </div>
    </div>
  );
}