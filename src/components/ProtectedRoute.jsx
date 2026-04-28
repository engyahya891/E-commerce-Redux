import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // نقرأ حالة الدخول من المخزن
  const { isAuthenticated } = useSelector((state) => state.auth);

  // إذا لم يكن مسجلاً للدخول، يتم تحويله إجبارياً إلى صفحة Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // إذا كان مسجلاً للدخول، يتم عرض الصفحة التي طلبها
  return children;
}