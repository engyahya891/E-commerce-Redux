import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/axiosInstance';

// 1. إرسال/إنشاء السلة على السيرفر (POST)
export const syncCartWithServer = createAsyncThunk('cart/syncWithServer', async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartItems = state.cart.cartItems;
      const formattedProducts = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.cartQuantity,
      }));
      const requestBody = { userId: 1, products: formattedProducts };
      const response = await apiClient.post('/carts', requestBody);
      return response.data; // سيرجع بيانات السلة مع الـ ID الخاص بها (مثلاً 110)
    } catch (error) {
      return rejectWithValue(error.message);
    }
});

//  2. جلب سلات المستخدم من السيرفر (GET)
export const fetchUserCarts = createAsyncThunk('cart/fetchUserCarts', async (userId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/carts/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
});

//  3. حذف/تفريغ السلة من السيرفر (DELETE)
export const deleteCartOnServer = createAsyncThunk('cart/deleteCartOnServer', async (cartId, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/carts/${cartId}`);
      return cartId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
});

const savedCart = localStorage.getItem("cartItems");
const initialState = {
  cartItems: savedCart ? JSON.parse(savedCart) : [], 
  cartTotalQuantity: 0, 
  cartTotalAmount: 0,
  syncStatus: 'idle', 
  serverCartId: null, //  سنحفظ هنا الـ ID الخاص بالسيرفر لكي نستطيع حذفه لاحقاً
  userCartsHistory: [], // لحفظ سجل الطلبات السابقة
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      const quantityToAdd = action.payload.quantity || 1;
      if (itemIndex >= 0) { state.cartItems[itemIndex].cartQuantity += quantityToAdd; } 
      else { state.cartItems.push({ ...action.payload, cartQuantity: quantityToAdd }); }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (state.cartItems[itemIndex].cartQuantity > 1) { state.cartItems[itemIndex].cartQuantity -= 1; } 
      else { state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id); }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      state.serverCartId = null;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          cartTotal.total += cartItem.price * cartItem.cartQuantity;
          cartTotal.quantity += cartItem.cartQuantity;
          return cartTotal;
        }, { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2)); 
    },
  },
  extraReducers: (builder) => {
    builder
      // التعامل مع المزامنة (POST)
      .addCase(syncCartWithServer.pending, (state) => { state.syncStatus = 'loading'; })
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        state.syncStatus = 'succeeded';
        state.serverCartId = action.payload.id; // حفظ رقم السلة من السيرفر (مثلاً 110)
      })
      .addCase(syncCartWithServer.rejected, (state) => { state.syncStatus = 'failed'; })
      // التعامل مع جلب السلات (GET)
      .addCase(fetchUserCarts.fulfilled, (state, action) => {
        state.userCartsHistory = action.payload;
      })
      // التعامل مع حذف السلة (DELETE)
      .addCase(deleteCartOnServer.fulfilled, (state) => {
        state.serverCartId = null; // تصفير الـ ID بعد الحذف
      });
  },
});

export const { addToCart, removeFromCart, decreaseCart, getTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;