import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart, removeFromCart } from '../Redux/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 border border-gray-800 bg-[#0a0a0a] hover:border-gray-700 transition-colors group">
      
      {/* صورة المنتج */}
      <div className="w-24 h-24 bg-[#050505] shrink-0 p-2 border border-gray-900 group-hover:border-cyan-500/30 transition-colors">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-contain mix-blend-lighten" 
        />
      </div>

      {/* تفاصيل المنتج (الاسم والتصنيف) */}
      <div className="flex-1 w-full text-center sm:text-left">
        <p className="text-[10px] text-cyan-400 tracking-widest uppercase mb-1">{item.category}</p>
        <h3 className="text-white font-bold tracking-wider text-sm md:text-base line-clamp-1">{item.title}</h3>
        <p className="text-gray-500 text-sm mt-1">${item.price}</p>
      </div>

      {/* أزرار التحكم بالكمية والسعر الإجمالي للمنتج */}
      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
        
        {/* أزرار الزيادة والنقصان */}
        <div className="flex items-center border border-gray-700 bg-[#050505]">
          <button 
            onClick={() => dispatch(decreaseCart(item))} 
            className="px-3 py-1 hover:text-cyan-400 hover:bg-gray-900 text-gray-400 transition"
          >
            <FiMinus size={14} />
          </button>
          <span className="px-4 py-1 text-sm font-mono font-bold text-white">
            {String(item.cartQuantity).padStart(2, '0')}
          </span>
          <button 
            onClick={() => dispatch(addToCart(item))} 
            className="px-3 py-1 hover:text-cyan-400 hover:bg-gray-900 text-gray-400 transition"
          >
            <FiPlus size={14} />
          </button>
        </div>

        {/* السعر المضروب في الكمية */}
        <div className="text-right min-w-[70px]">
          <p className="text-white font-black text-lg">
            ${(item.price * item.cartQuantity).toFixed(2)}
          </p>
        </div>

        {/* زر الحذف من السلة */}
        <button 
          onClick={() => dispatch(removeFromCart(item))} 
          className="text-gray-600 hover:text-red-500 transition-colors p-2"
          title="Remove Item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

    </div>
  );
}