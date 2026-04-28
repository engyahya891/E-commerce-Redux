import { useEffect } from "react";
import { FiArrowRight, FiShield, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../utils/currencyFormatter";
import { clearCart, deleteCartOnServer, fetchUserCarts, getTotals, syncCartWithServer } from '../Redux/cartSlice';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const syncStatus = cart.syncStatus;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart.cartItems, dispatch]);

  //  جلب سلات المستخدم من السيرفر بمجرد الدخول للصفحة 
  useEffect(() => {
    dispatch(fetchUserCarts(1)); // نرسل 1 كـ ID للمستخدم الافتراضي
  }, [dispatch]);

  // دالة الدفع (تُنشئ السلة على السيرفر - POST)
  const handleCheckout = () => {
    dispatch(syncCartWithServer()).then((action) => {
      if (syncCartWithServer.fulfilled.match(action)) {
        alert("تم إرسال سلتك للسيرفر بنجاح!  تم خصم الرصيد.");
        // بعد الدفع الناجح، نفرغ السلة محلياً
        dispatch(clearCart());
      } else {
        alert("حدث خطأ أثناء إرسال السلة.");
      }
    });
  };

  //  دالة تفريغ السلة (تنفذ أمر DELETE على السيرفر إن وجدت، وتفرغ المحلي)
  const handleClearCart = () => {
    // إذا كانت السلة محفوظة مسبقاً في السيرفر، نحذفها منه
    if (cart.serverCartId) {
      dispatch(deleteCartOnServer(cart.serverCartId));
    }
    // تفريغ الواجهة
    dispatch(clearCart());
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#050505] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 border border-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-600">
          <FiShoppingCart size={40} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest mb-4 uppercase">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-sm leading-relaxed">
          No items detected in your local node. Initialize a link with a product from our archives.
        </p>
        <Link to="/products" className="bg-cyan-400 text-black font-black px-8 py-4 tracking-widest hover:bg-white transition-colors text-xs flex items-center gap-3">
          RETURN TO ARCHIVES <FiArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-6 md:px-12 lg:px-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-bold mb-2 uppercase">Secure Connection</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Checkout Protocol</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 w-full space-y-4">
            {cart.cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="w-full lg:w-96 shrink-0 sticky top-24">
            <div className="bg-[#0a0a0a] border border-gray-800 p-8 shadow-2xl">
              <h2 className="text-xl font-black tracking-widest border-b border-gray-800 pb-4 mb-6 text-white">ORDER SUMMARY</h2>

              <div className="space-y-4 text-sm font-bold text-gray-500 mb-8">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-gray-300">{formatCurrency(cart.cartTotalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span className="text-cyan-400">FREE</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-gray-800 text-xl font-black">
                  <span className="text-white tracking-widest">TOTAL</span>
                  <span className="text-[#ADFF2F] drop-shadow-[0_0_10px_rgba(173,255,47,0.3)]">
                    {formatCurrency(cart.cartTotalAmount)}
                  </span>
                </div>
              </div>

              {/* زر الدفع */}
              <button 
                onClick={handleCheckout}
                disabled={syncStatus === 'loading'}
                className="w-full mb-3 bg-[#ADFF2F] text-black font-black py-4 tracking-widest hover:bg-white transition-colors text-xs flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {syncStatus === 'loading' ? 'PROCESSING...' : 'AUTHORIZE PAYMENT'}
                {syncStatus !== 'loading' && <FiArrowRight size={16} />}
              </button>

              {/*  زر تفريغ السلة الجديد (لتنفيذ أمر DELETE) */}
              <button 
                onClick={handleClearCart}
                className="w-full bg-transparent border border-red-900/50 text-red-500 hover:bg-red-500 hover:text-white font-black py-3 tracking-widest transition-colors text-xs flex items-center justify-center gap-2"
              >
                <FiTrash2 size={14} /> PURGE CART DATA
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] text-gray-600 tracking-widest">
                <FiShield size={12} /> END-TO-END ENCRYPTED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}