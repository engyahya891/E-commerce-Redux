import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiRefreshCw, FiShield, FiStar, FiTruck, FiZap } from 'react-icons/fi';
import CountdownTimer from '../components/CountdownTimer';
import ProductCard from '../components/ProductCard';

// ─── Data (تم تحديث جميع الصور بروابط ثابتة وعالية الدقة) ───────────────────

const CURATED_PRODUCTS = [
  { id: 1, title: 'CHRONO SHIFT',   category: 'ACCESSORIES', price: 299, badge: 'NEW',         image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'VOID AUDIO V2',  category: 'AUDIO',       price: 450, badge: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'FRAGMENT VEST',  category: 'APPAREL',     price: 180, badge: null,          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'SIGMA PACK',     category: 'BAGS',        price: 220, badge: 'LIMITED',     image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop' },
];

const FLASH_SALE_PRODUCTS = [
  { id: 5, title: 'PULSE RUNNER X', category: 'FOOTWEAR', price: 390, salePrice: 249, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'VOID GLOVES',    category: 'APPAREL',  price: 120, salePrice: 79,  image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=400&auto=format&fit=crop' },
  { id: 7, title: 'NEON VISOR',     category: 'EYEWEAR',  price: 160, salePrice: 99,  image: 'https://images.unsplash.com/photo-1508296695146-257a814050b4?q=80&w=400&auto=format&fit=crop' },
];

const CATEGORIES = [
  { id: 1, name: 'FOOTWEAR', count: 38, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'APPAREL', count: 64, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'AUDIO', count: 12, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'ACCESSORIES', count: 27, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop' },
];


const REVIEWS = [
  { id: 1, name: 'ALEX K.',    rating: 5, text: 'The VOID AUDIO V2 changed how I experience music. The digital twin in-game is insane.', product: 'VOID AUDIO V2', verified: true },
  { id: 2, name: 'MIRA S.',    rating: 5, text: 'Every piece I own from NOIRX feels like it was engineered, not just designed. Zero regrets.', product: 'FRAGMENT VEST', verified: true },
  { id: 3, name: 'DARA T.',    rating: 4, text: 'Shipping was fast, packaging is premium, and the AR try-on feature actually works well.', product: 'CHRONO SHIFT', verified: true },
  { id: 4, name: 'JUNO W.',    rating: 5, text: 'Finally a brand that understands both physical and digital aesthetics. NOIRX is the future.', product: 'SIGMA PACK', verified: true },
];

const TRUST_BADGES = [
  { icon: FiTruck,     label: 'FREE WORLDWIDE SHIPPING', sub: 'On orders over $150' },
  { icon: FiRefreshCw, label: '30-DAY RETURNS',          sub: 'No questions asked' },
  { icon: FiShield,    label: 'SECURE CHECKOUT',         sub: '256-bit SSL encryption' },
  { icon: FiZap,       label: 'DIGITAL TWIN INCLUDED',   sub: 'With every purchase' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={12}
          className={i < count ? 'text-cyan-400 fill-cyan-400' : 'text-gray-700'}
        />
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [activeReview, setActiveReview] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // وضعنا وقت الانتهاء داخل useState لكي لا يتغير مع كل Render للصفحة
  const [flashSaleEnd] = useState(new Date().getTime() + (8 * 60 * 60 * 1000));

  // Auto-advance review slider
  useEffect(() => {
    const id = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const visibleCount = 3; // products visible at once in carousel
  const maxIndex = CURATED_PRODUCTS.length - visibleCount;
  const prevSlide = () => setCarouselIndex(p => Math.max(0, p - 1));
  const nextSlide = () => setCarouselIndex(p => Math.min(maxIndex, p + 1));
  
  return (
    <div className="bg-[#050505] text-white">

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center px-6 md:px-16 py-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-900/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 w-full">
          {/* Copy */}
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-cyan-400" />
              <p className="text-cyan-400 text-[11px] tracking-[0.4em] font-bold">ITEM OF THE MONTH — SS/26</p>
            </div>

            <h1 className="text-[clamp(4rem,10vw,7rem)] font-black leading-[0.92] tracking-tighter">
              NOIR <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_#00e5ff]">PHANTOM</span>
            </h1>

            <p className="text-gray-400 max-w-md leading-relaxed text-sm md:text-base">
              Experience the future of athletic performance. Carbon-fiber weave meets neon-reactive soles
              for the ultimate digital–physical hybrid.
            </p>

            {/* CTA row */}
            <div className="flex items-center gap-6 flex-wrap">
              <button className="bg-cyan-400 text-black font-black px-8 py-4 tracking-widest hover:bg-white transition-colors duration-300 flex items-center gap-3 text-sm">
                GET THE LOOK <FiArrowRight />
              </button>
              <button className="text-gray-400 text-[11px] tracking-[0.2em] hover:text-white transition border-b border-gray-700 hover:border-white pb-0.5">
                WATCH FILM ↗
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 pt-6 border-t border-white/5">
              {[
                { val: '$299', label: 'STARTING FROM' },
                { val: '1:1',  label: 'DIGITAL TWIN' },
                { val: '47',   label: 'LEFT IN STOCK' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-[1.6rem] font-black text-white leading-none">{s.val}</div>
                  <div className="text-[10px] tracking-[0.2em] text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Abstract Design (Pure CSS)*/}
          <div className="relative flex justify-center items-center w-full aspect-square max-w-[500px] mx-auto">
            {/* التوهج الخلفي الأساسي */}
            <div className="absolute inset-4 bg-cyan-400/20 blur-[100px] rounded-full animate-pulse pointer-events-none" />

            {/* الحلقات الدوارة (تأثير السايبيربانك) */}
            <div className="absolute inset-8 border border-gray-800/50 rounded-full border-t-cyan-400/80 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-16 border border-gray-800/50 rounded-full border-b-cyan-400/80 animate-[spin_7s_linear_infinite_reverse]" />
            <div className="absolute inset-28 border border-cyan-400/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />

            {/* النواة المركزية المضيئة */}
            <div className="relative z-10 w-40 h-40 bg-gradient-to-br from-cyan-300 to-blue-800 rounded-full blur-[1px] shadow-[0_0_80px_rgba(34,211,238,0.5)] flex items-center justify-center">
              <div className="w-32 h-32 bg-[#050505] rounded-full border border-cyan-400/30 flex items-center justify-center shadow-inner">
                {/* نقطة المركز */}
                <div className="w-8 h-8 bg-cyan-400 rounded-full animate-ping opacity-20" />
                <div className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]" />
              </div>
            </div>

            {/* نصوص تقنية للزينة */}
            <div className="absolute bottom-10 right-4 text-[9px] text-cyan-400 font-mono tracking-widest text-right">
              <p>SYS.CORE.V1</p>
              <p className="text-gray-600">STATUS: <span className="text-white animate-pulse">ONLINE</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.04] bg-[#080810]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="shrink-0 w-10 h-10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-white">{label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* ── 3. CATEGORIES GRID (Premium E-commerce Design) ───────────── */}
     <section className="py-24 px-6 md:px-16 bg-[#050505] border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          
          {/* عنوان القسم */}
          <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-cyan-400 font-bold mb-3 uppercase">Explore Collection</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Shop by Category</h2>
            </div>
            <button className="hidden md:block text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-1">
              VIEW ALL CATEGORIES ↗
            </button>
          </div>

          {/* شبكة الصور */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="group relative overflow-hidden cursor-pointer aspect-[3/4] bg-[#0a0a0a]"
              >
                {/* الصورة مع تأثير الزووم البطيء والتحويل للأبيض والأسود ليناسب التصميم الداكن */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                
                {/* طبقة التدرج اللوني (Gradient) لضمان وضوح النص */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* إطار يظهر عند الـ Hover */}
                <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />

                {/* النصوص (الاسم والعدد) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] tracking-[0.2em] text-cyan-400 font-bold mb-2">
                    {cat.count} ITEMS
                  </p>
                  <p className="text-2xl font-black tracking-widest text-white uppercase">
                    {cat.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* زر الموبايل */}
          <button className="w-full mt-8 md:hidden border border-gray-800 py-4 text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors uppercase">
            View All Categories
          </button>
        </div>
      </section>

      {/* ── 4. CURATED COLLECTION (carousel) ───────────────────────────────── */}
      <section className="py-20 px-6 md:px-16 bg-[#080810]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-cyan-400 font-bold mb-2">THE CURATED COLLECTION</p>
              <h2 className="text-3xl font-black tracking-tight">Most Coveted Drops</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                disabled={carouselIndex === 0}
                className="w-10 h-10 border border-gray-800 hover:border-cyan-400 flex items-center justify-center transition disabled:opacity-30"
              >
                <FiArrowLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                disabled={carouselIndex >= maxIndex}
                className="w-10 h-10 border border-gray-800 hover:border-cyan-400 flex items-center justify-center transition disabled:opacity-30"
              >
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(calc(-${carouselIndex * (100 / visibleCount)}% - ${carouselIndex * 24 / visibleCount}px))` }}
            >
              {CURATED_PRODUCTS.map(product => (
                <div key={product.id} className="min-w-[calc(33.333%-1rem)] flex-shrink-0">
                  <ProductCard product={product} />
                  {product.badge && (
                    <div className="mt-2">
                      <span className="text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* ── 5. FLASH SALE (Neon Noir Theme) ────────────────────────────────── */}
     <section className="py-20 px-6 md:px-16 bg-[#0A0A0A] border-y border-[#00F5FF]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* النقطة النابضة باللون الأخضر النيوني */}
                <div className="w-2 h-2 rounded-full bg-[#ADFF2F] animate-pulse shadow-[0_0_10px_#ADFF2F]" />
                <p className="text-[10px] tracking-[0.35em] text-[#ADFF2F] font-bold">LIMITED TIME OFFER</p>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">
                Flash Sale <span className="text-[#00F5FF]">— Up to 40% Off</span>
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] tracking-[0.2em] text-gray-500">ENDS IN</p>
              {/* إزالة .current من هنا ليقرأ الرقم الصحيح */}
              <CountdownTimer targetDate={flashSaleEnd} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FLASH_SALE_PRODUCTS.map(p => (
              <div
                key={p.id}
                className="bg-[#121212] border border-[#00F5FF]/10 hover:border-[#00F5FF]/40 transition-colors duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" 
                  />
                  {/* شارة الخصم باللون السماوي */}
                  <div className="absolute top-4 right-4 bg-[#00F5FF] text-black text-[10px] font-black px-3 py-1.5 tracking-[0.15em] shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                    {Math.round((1 - p.salePrice / p.price) * 100)}% OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-[10px] tracking-[0.2em] text-gray-500 mb-2">{p.category}</p>
                  <p className="font-black tracking-wider text-white text-lg mb-4">{p.title}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-3">
                      {/* السعر بعد الخصم بالسماوي */}
                      <span className="text-[#00F5FF] font-black text-xl">${p.salePrice}</span>
                      {/* السعر القديم */}
                      <span className="text-gray-600 text-sm line-through">${p.price}</span>
                    </div>
                    
                    {/* زر الشراء يتفاعل باللون الأخضر النيوني */}
                    <button className="text-[10px] font-bold tracking-[0.2em] border border-[#ADFF2F]/50 text-[#ADFF2F] px-4 py-2 hover:bg-[#ADFF2F] hover:text-black transition-all duration-300">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 bg-[#060608]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/[0.05]">
          {[
            { icon: '◈', title: 'VIRTUAL TRY-ON',  desc: 'Experience our products in augmented reality before you commit to the digital-physical world.', cta: 'EXPLORE FEATURE' },
            { icon: '⬡', title: 'DIGITAL TWIN',    desc: 'Every physical purchase comes with a unique 1:1 digital twin for use in the metaverse.',        cta: 'LEARN MORE' },
            { icon: '⬢', title: 'HYPER-CUSTOM',    desc: 'Modify and enhance your gear through our proprietary hardware/software interface.',               cta: 'START CONFIG' },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`p-10 space-y-5 group hover:bg-[#0a0a14] transition-colors duration-300 ${i < 2 ? 'md:border-r border-white/[0.05]' : ''}`}
            >
              <div className="text-cyan-400 text-2xl">{f.icon}</div>
              <h3 className="text-sm font-bold tracking-[0.25em]">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              <button className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] hover:underline underline-offset-4 flex items-center gap-2">
                {f.cta} <FiArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. BRAND STORY ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 bg-[#030306] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-violet-900/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10 relative">
          <div className="relative aspect-square max-w-[480px]">
            <div className="absolute inset-0 border border-cyan-400/10" />
            <div className="absolute inset-4 border border-cyan-400/5" />
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=480&auto=format&fit=crop"
              alt="Brand Story"
              className="w-full h-full object-cover"
            />
            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400/40" />
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400/40" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-cyan-400" />
              <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-bold">OUR STORY</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
              Born in the <br /><span className="text-cyan-400">Digital Void.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              NOIRX was founded on the premise that the line between physical and digital identity has already dissolved.
              We design for people who inhabit both realities equally — who demand their gear performs at the bleeding edge of both worlds.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Every piece is engineered with aerospace-grade materials and paired with a blockchain-authenticated digital twin.
              No compromises. No limits.
            </p>
            <button className="border border-cyan-400/40 text-cyan-400 font-bold text-[11px] tracking-[0.25em] px-7 py-3.5 hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center gap-3 w-fit">
              READ OUR MANIFESTO <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 8. REVIEWS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16 bg-[#060608] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-cyan-400 font-bold mb-2">SOCIAL PROOF</p>
              <h2 className="text-3xl font-black tracking-tight">From the Community</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StarRating count={5} />
                <span className="text-white font-black text-sm">4.9</span>
                <span className="text-gray-500 text-xs">/ 5.0</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-gray-500 text-xs tracking-wider">2,400+ REVIEWS</span>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {REVIEWS.map((r, i) => (
              <div
                key={r.id}
                onClick={() => setActiveReview(i)}
                className={`p-6 border cursor-pointer transition-all duration-300 ${
                  activeReview === i
                    ? 'border-cyan-400/40 bg-cyan-400/5'
                    : 'border-white/[0.05] bg-[#080810] hover:border-white/10'
                }`}
              >
                <StarRating count={r.rating} />
                <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-5 line-clamp-3">"{r.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-[11px] font-bold tracking-wider">{r.name}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{r.product}</p>
                  </div>
                  {r.verified && (
                    <div className="flex items-center gap-1 text-cyan-400">
                      <FiShield size={10} />
                      <span className="text-[9px] tracking-wider">VERIFIED</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dots navigation */}
          <div className="flex gap-2 justify-center">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReview(i)}
                className={`transition-all duration-300 ${activeReview === i ? 'w-6 h-1 bg-cyan-400' : 'w-2 h-1 bg-gray-700 hover:bg-gray-500'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. NEWSLETTER ─────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-16 bg-gradient-to-b from-[#080810] to-black relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center space-y-7 relative z-10">
          <p className="text-[10px] tracking-[0.5em] text-cyan-400 font-bold">UNCOMPROMISING SINCE THE BEGINNING</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            JOIN THE <span className="text-cyan-400 italic">INNER CIRCLE</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed text-sm">
            Get early access to drops, exclusive digital assets, and member-only events in the neon noir universe.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-cyan-400/20 mt-6">
            <input
              type="email"
              placeholder="ENTER YOUR PROTOCOL ADDRESS"
              className="flex-1 bg-transparent px-5 py-4 focus:outline-none text-[11px] tracking-widest text-white placeholder:text-gray-600 min-w-0"
            />
            <button className="bg-cyan-400 text-black font-black px-7 py-4 tracking-widest text-[11px] hover:bg-white transition-colors duration-300 shrink-0">
              INITIATE
            </button>
          </div>
          <p className="text-gray-700 text-[10px] tracking-wider">NO SPAM. NO ADS. PURE SIGNAL.</p>
        </div>
      </section>

    </div>
  );
}