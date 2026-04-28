import { useEffect, useState } from 'react';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // تحديث العداد كل ثانية (1000 ملي ثانية)
    const interval = setInterval(() => {
      const now = new Date().getTime(); // الوقت الحقيقي الآن
      const distance = targetDate - now; // الفارق بين الآن ووقت الانتهاء

      // إذا انتهى الوقت، أوقف العداد
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      // حساب الساعات، الدقائق، والثواني من الفارق الزمني
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // تحديث الحالة مع إضافة صفر على اليسار إذا كان الرقم أقل من 10 (مثال: 09 بدلاً من 9)
      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    }, 1000);

    // تنظيف (Cleanup) عند إغلاق الصفحة
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center space-x-2 text-xl md:text-2xl font-black text-[#00F5FF] font-mono tracking-widest">
      <div className="bg-[#121212] border border-[#00F5FF]/20 px-3 py-2 rounded shadow-inner shadow-[#00F5FF]/5">
        {timeLeft.hours}
      </div>
      <span className="text-gray-600 animate-pulse">:</span>
      <div className="bg-[#121212] border border-[#00F5FF]/20 px-3 py-2 rounded shadow-inner shadow-[#00F5FF]/5">
        {timeLeft.minutes}
      </div>
      <span className="text-gray-600 animate-pulse">:</span>
      <div className="bg-[#121212] border border-[#00F5FF]/20 px-3 py-2 rounded shadow-inner shadow-[#00F5FF]/5">
        {timeLeft.seconds}
      </div>
    </div>
  );
}