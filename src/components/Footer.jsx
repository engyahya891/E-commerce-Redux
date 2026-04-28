import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-gray-400 py-12 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* عمود الشعار والوصف */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-2xl font-black tracking-widest text-cyan-400 mb-4 block">
            NEON NOIR
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            The intersection of digital aesthetic and physical reality. Premium gear for the modern visionary.
          </p>
        </div>

        {/* روابط 1 */}
        <div>
          <h3 className="text-white font-bold mb-4 tracking-wider">DISCOVER</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-cyan-400 transition">New Arrivals</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition">Best Sellers</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition">The Curated Collection</Link></li>
          </ul>
        </div>

        {/* روابط 2 */}
        <div>
          <h3 className="text-white font-bold mb-4 tracking-wider">SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-cyan-400 transition">FAQ</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-cyan-400 transition">Track Order</Link></li>
          </ul>
        </div>

        {/* روابط 3 (تواصل) */}
        <div>
          <h3 className="text-white font-bold mb-4 tracking-wider">CONNECT</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">Instagram</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Twitter (X)</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Discord</a></li>
          </ul>
        </div>

      </div>
      
      {/* حقوق النشر */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>@{new Date().getFullYear()} NEON NOIR. All rights reserved.</p>
        <p>&copy; Created and Designed by Eng. Yahya Hamsho</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}