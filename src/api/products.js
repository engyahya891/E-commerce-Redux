import apiClient from './axiosInstance';

// دالة جلب كل المنتجات
export const getProductsAPI = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};


// دالة جلب بيانات منتج واحد بواسطة الـ ID
export const getProductByIdAPI = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};