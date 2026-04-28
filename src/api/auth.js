import apiClient from './axiosInstance';

// دالة إرسال بيانات الدخول للسيرفر
export const loginAPI = async (userData) => {
  // userData عبارة عن كائن يحتوي على { username, password }
  const response = await apiClient.post('/auth/login', userData);
  
  // نرجع البيانات القادمة من السيرفر (والتي يفترض أن تحتوي على الـ Token)
  return response.data; 
};