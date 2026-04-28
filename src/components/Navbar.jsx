import { useState } from "react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-[#0a0a0a] text-white py-4 px-6 md:px-12 sticky top-0 z-50 border-b border-gray-800 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* الشعار */}
        <Link
          to="/"
          className="text-2xl font-black tracking-widest text-cyan-400"
          onClick={closeMenu}
        >
          NEON NOIR
        </Link>

        {/*  التعديل هنا استخدمنا lg بدلاً من md لتختفي الروابط في التابلت وتظهر فقط في اللابتوب */}
        <div className="hidden lg:flex space-x-8 text-sm font-medium tracking-wider text-gray-400">
          <Link to="/" className="hover:text-cyan-400 transition">NEW ARRIVALS</Link>
          <Link to="/products" className="hover:text-cyan-400 transition">Products</Link>
          <Link to="/categories" className="hover:text-cyan-400 transition">CATEGORIES</Link>
          <Link to="/brand" className="hover:text-cyan-400 transition">BRAND</Link>
          <Link to="/gallery" className="hover:text-cyan-400 transition">GALLERY</Link>
        </div>

        {/* الأيقونات */}
        <div className="flex items-center space-x-6 text-gray-300">
          
          {/* الأيقونات الجانبية تظهر فقط في الشاشات الكبيرة (lg) */}
          <button className="hover:text-cyan-400 transition hidden lg:block">
            <FiSearch size={20} />
          </button>
          <button className="hover:text-cyan-400 transition hidden lg:block">
            <FiHeart size={20} />
          </button>
          
          {/* رابط السلة (دائماً ظاهر في الموبايل والتابلت واللابتوب) */}
          <Link
            to="/cart"
            className="relative text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={closeMenu}
          >
            <FiShoppingCart size={20} />
            {cartTotalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ADFF2F] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                {cartTotalQuantity}
              </span>
            )}
          </Link>
          
          <Link
            to="/login"
            className="hover:text-cyan-400 transition hidden lg:block"
          >
            <FiUser size={20} />
          </Link>

          {/* زر القائمة يظهر في الموبايل والتابلت (الشاشات الأصغر من lg) */}
          <button 
            className="lg:hidden text-cyan-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 القائمة المنسدلة (تظهر في الموبايل والتابلت) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-gray-800 flex flex-col shadow-2xl origin-top animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col px-6 py-4">
            <Link to="/" onClick={closeMenu} className="py-4 border-b border-gray-900 text-sm tracking-widest text-gray-400 hover:text-cyan-400 transition">NEW ARRIVALS</Link>
            <Link to="/products" onClick={closeMenu} className="py-4 border-b border-gray-900 text-sm tracking-widest text-gray-400 hover:text-cyan-400 transition">PRODUCTS</Link>
            <Link to="/categories" onClick={closeMenu} className="py-4 border-b border-gray-900 text-sm tracking-widest text-gray-400 hover:text-cyan-400 transition">CATEGORIES</Link>
            <Link to="/brand" onClick={closeMenu} className="py-4 border-b border-gray-900 text-sm tracking-widest text-gray-400 hover:text-cyan-400 transition">BRAND</Link>
            <Link to="/gallery" onClick={closeMenu} className="py-4 border-b border-gray-900 text-sm tracking-widest text-gray-400 hover:text-cyan-400 transition">GALLERY</Link>
            
            {/* الأيقونات التي تم إخفاؤها في الموبايل والتابلت تُعرض هنا */}
            <div className="flex items-center gap-8 py-6 text-gray-400">
              <button className="hover:text-cyan-400 transition flex items-center gap-2 text-xs tracking-widest">
                <FiSearch size={18} /> SEARCH
              </button>
              <button className="hover:text-cyan-400 transition flex items-center gap-2 text-xs tracking-widest">
                <FiHeart size={18} /> SAVED
              </button>
              <Link to="/login" onClick={closeMenu} className="hover:text-cyan-400 transition flex items-center gap-2 text-xs tracking-widest ml-auto">
                <FiUser size={18} /> ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}