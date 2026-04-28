import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// استدعاء دالة الـ API التي كتبتها أنت (تأكد من صحة المسار)
import { loginAPI } from '../api/auth'; // استبدل المسار بمسار ملفك الفعلي

// 1. إنشاء دالة غير متزامنة (Async Thunk) للاتصال بالسيرفر
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // 🚨 قمنا بتعطيل كود الـ API الحقيقي مؤقتاً لأن رابط الأستاذ يعطي 404
      // const data = await loginAPI(userData);
      
      // ✅ سنقوم بصنع تأخير زمني وهمي لمحاكاة وقت الاتصال بالإنترنت (ثانية واحدة)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ محاكاة رد السيرفر: سنقبل أي بيانات يدخلها المستخدم ونعطيه توكن وهمي لكي يمر
      if (userData.username && userData.password) {
        const dummyData = {
          Token: "eyJhbGciOiJIUzI1NiIs.fake_token_for_graduation_project",
          user: { username: userData.username }
        };
        
        localStorage.setItem('token', dummyData.Token);
        return dummyData;
      }

    } catch (error) {
      return rejectWithValue('فشل الاتصال بالسيرفر. تأكد من بياناتك.');
    }
  }
);
const initialState = {
  // نتحقق مما إذا كان هناك Token محفوظ مسبقاً
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // دالة تسجيل الخروج
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token'); // مسح التوكن
    },
  },
  // extraReducers تُستخدم للاستماع لحالات الـ Async Thunk (جاري التحميل، نجح، فشل)
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload; // حفظ بيانات المستخدم القادمة من السيرفر
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;