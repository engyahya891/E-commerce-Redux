import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // إعداد مؤقت لتحديث القيمة بعد انتهاء التأخير
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // تنظيف المؤقت إذا تغيرت القيمة قبل انتهاء التأخير
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}