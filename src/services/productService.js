// استدعاء دالة الاتصال من مجلد api
import { getProductsAPI } from '../api/products';


export const fetchAllProducts = async () => {
  try {
    // 1. جلب البيانات الخام
    const rawProducts = await getProductsAPI();

    // 2. منطق العمل: تنسيق البيانات لتناسب تصميم (The Archives)
    // مثلاً: سنضيف السعر بصيغة الكريدت (Cr) إذا لم يكن موجوداً
    const formattedProducts = rawProducts.map(product => ({
      ...product,
      displayPrice: `${product.price} Cr`, 
      // يمكننا أيضاً تحديد صورة افتراضية إذا كانت الصورة القادمة من السيرفر مكسورة
      image: product.image || "https://via.placeholder.com/400x400/111/00ffff?text=NO+IMAGE"
    }));

    return formattedProducts;

  } catch (error) {
    console.error("Error in productService:", error);
    throw new Error("تعذر تحميل الأرشيف. يرجى التحقق من اتصالك.");
  }
};



// تأكد من أن دالة fetchAllProducts موجودة في نفس الملف وتعمل بشكل صحيح
export const fetchProductById = async (id) => {
  try {
    // 1. بدلاً من طلب منتج واحد، نجلب جميع المنتجات
    const allProducts = await fetchAllProducts();
    
    // 2. نستخدم الجافاسكريبت للبحث عن المنتج الذي يطابق الـ ID القادم من الرابط
    const product = allProducts.find(p => String(p.id) === String(id));

    // 3. إذا لم يتم العثور على المنتج
    if (!product) {
      throw new Error("هذا المنتج غير موجود في قاعدة البيانات.");
    }

    // 4. تنسيق البيانات وإعادتها لصفحة التفاصيل
    return {
      ...product,
      displayPrice: `${product.price} $`,
      image: product.image || "https://via.placeholder.com/600x600/111/00ffff?text=NO+IMAGE"
    };
  } catch (error) {
    console.error("Error in fetchProductById service:", error);
    // إظهار رسالة الخطأ الصحيحة للمستخدم
    throw new Error(error.message === "هذا المنتج غير موجود في قاعدة البيانات." ? error.message : "تعذر جلب تفاصيل هذا المنتج من السيرفر.");
  }
};