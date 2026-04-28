import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; //  استدعاء شريحة المصادقة
import cartReducer from './cartSlice'; // استدعاء شريحة السلة
import productsReducer from './productsSlice';
// لاحقاً سنضيف authReducer و cartReducer هنا

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer, 
  },
});

export default store;