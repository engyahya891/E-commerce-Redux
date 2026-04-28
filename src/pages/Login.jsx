import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiLock, FiUser } from 'react-icons/fi'; // استخدمنا FiUser بدلاً من FiMail
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/authSlice'; // تأكد من صحة مسار الاستدعاء

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 2. قراءة حالة التحميل والأخطاء من المخزن
  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 3. إرسال الطلب عبر Redux وانتظار النتيجة
    const resultAction = await dispatch(loginUser({ username, password }));
    
    // 4. التحقق مما إذا كان الطلب قد نجح (fulfilled)
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/products');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* تأثيرات التوهج في الخلفية */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* زر العودة للمتجر */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors text-xs font-bold tracking-widest z-10"
      >
        <FiArrowLeft /> RETURN TO GRID
      </Link>

      <div className="w-full max-w-md z-10">
        
        {/* الترويسة الشعار */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black tracking-widest text-white mb-2">
            NEON <span className="text-transparent [-webkit-text-stroke:1px_#00e5ff]">NOIR</span>
          </h1>
          <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-bold uppercase">Elite Digital Showroom</p>
        </div>

        {/* صندوق تسجيل الدخول */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

          <h2 className="text-2xl font-black text-white mb-8 tracking-wider">SYSTEM LOGIN</h2>

          {/* عرض رسالة الخطأ القادمة من السيرفر إن وجدت */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold tracking-widest text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* حقل اسم المستخدم (Username) */}
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 tracking-widest uppercase font-bold">Agent ID / Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-gray-500 tracking-widest uppercase font-bold">Access Code</label>
                <a href="#" className="text-[10px] text-cyan-400 hover:underline tracking-wider">RECOVER CODE?</a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors text-sm tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-cyan-400 text-black font-black py-4 tracking-[0.2em] hover:bg-white transition-colors text-xs flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'AUTHENTICATING...' : 'AUTHORIZE ACCESS'} 
              {status !== 'loading' && <FiArrowRight />}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-900 pt-6">
            <p className="text-[10px] text-gray-500 tracking-widest">
              NEW TO THE NETWORK?{' '}
              <a href="#" className="text-white hover:text-cyan-400 transition-colors font-bold border-b border-gray-800 hover:border-cyan-400 pb-0.5">
                INITIALIZE ACCOUNT
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}