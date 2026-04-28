import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from '../services/productService';
// 🚀 استدعاء أداة الاتصال للروابط الجديدة (تأكد أن هذا هو المسار الصحيح في مشروعك)
import apiClient from '../api/axiosInstance'; 

// 1. الثانك الخاص بجلب كل المنتجات (كودك الأصلي)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try { return await fetchAllProducts(); }
    catch (error) { return rejectWithValue(error.message); }
  }
);

// 2. ثانك لجلب منتج واحد فقط (كودك الأصلي)
export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (id, { rejectWithValue }) => {
    try { return await fetchProductById(id); }
    catch (error) { return rejectWithValue(error.message); }
  }
);

// 🚀 3. ثانك جديد لجلب قائمة التصنيفات
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/products/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🚀 4. ثانك جديد لجلب منتجات تصنيف محدد
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/products/category/${categoryName}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null, // هنا سنخزن المنتج الحالي
    categories: [],        // 👈 قائمة التصنيفات (جديد)
    status: 'idle',
    categoriesStatus: 'idle', // 👈 حالة تحميل التصنيفات (جديد)
    error: null,
  },
  reducers: {
    // دالة لتنظيف المنتج المختار عند الخروج من الصفحة
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ---------- حالات جلب كل المنتجات (كودك الأصلي) ----------
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // ---------- حالات جلب منتج واحد (كودك الأصلي) ----------
      .addCase(getSingleProduct.pending, (state) => { state.status = 'loading'; })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🚀 ---------- حالات جلب قائمة التصنيفات (الجديدة) ----------
      .addCase(fetchCategories.pending, (state) => { state.categoriesStatus = 'loading'; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        state.error = action.payload;
      })

      // 🚀 ---------- حالات جلب منتجات تصنيف محدد (الجديدة) ----------
      .addCase(fetchProductsByCategory.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // نستبدل المنتجات المعروضة بمنتجات التصنيف فقط
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;