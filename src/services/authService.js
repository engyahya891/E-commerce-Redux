// استدعاء دالة الاتصال من مجلد api
import { loginAPI } from '../api/auth';

export const login = async (username, password) => {
  try {
    // 1. طلب البيانات من الـ API
    const response = await loginAPI({ username, password });

    // 2. منطق العمل (Business Logic): حفظ البيانات في المتصفح
    if (response.data && response.data.token) {
      localStorage.setItem('neon_token', response.data.token);
      localStorage.setItem('neon_user', JSON.stringify(response.data.user));
    }

    // 3. إرجاع البيانات الصافية للـ Redux
    return response.data;
    
  } catch (error) {
    // تنسيق رسالة الخطأ لتكون مقروءة
    const message = error.response?.data?.message || "فشل الاتصال بالشبكة. يرجى المحاولة مرة أخرى.";
    throw new Error(message);
  }
};

// دالة تسجيل الخروج (تحذف البيانات من المتصفح)
export const logout = () => {
  localStorage.removeItem('neon_token');
  localStorage.removeItem('neon_user');
};