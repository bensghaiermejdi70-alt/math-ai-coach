import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

// ═══════════════════════════════════════════════════════════════
//  MathBacAI — LANDING PAGE V10 (AR)
//  Corrections :
//  1. Hero image : décalée vers la gauche (mr-16 sur conteneur RTL)
//  2. Features 2 & 4 : PHOTOS décalées vers la droite (ml-16 RTL)
//  3. Section matières centrée sans CTA
// ═══════════════════════════════════════════════════════════════

const FEATURES = [
  {
    img: '/images/feat-simulation.jpg',
    title: 'محاكاة الامتحان بالذكاء الاصطناعي',
    desc: 'امتحانات أصلية مولدة بالذكاء الاصطناعي، مصححة تمريناً بتمرين مع علاج شخصي للأخطاء.',
    accent: 'text-blue-700',
  },
  {
    img: '/images/feat-solveur.jpg',
    title: 'محلل التمارين الذكي (Le solveur)',
    desc: 'حل جميع أنواع التمارين والمعادلات بالتفصيل، مع شروحات واضحة في كل خطوة.',
    accent: 'text-violet-700',
  },
  {
    img: '/images/feat-chat.jpg',
    title: 'دردشة الذكاء الاصطناعي - الأستاذ',
    desc: 'اطرح جميع أسئلتك الدراسية بالفرنسية. الذكاء الاصطناعي يجيب كأستاذ، مع رسوم بيانية تفاعلية.',
    accent: 'text-emerald-700',
  },
  {
    img: '/images/feat-plan.jpg',
    title: 'خطة مراجعة مخصصة',
    desc: 'اكتشف نقاط قوتك وضعفك، ثم يولد تمارين مستهدفة وخطة مخصصة لك.',
    accent: 'text-amber-700',
  },
  {
    img: '/images/feat-bacblanc.jpg',
    title: 'لباكالوريا البيضاء يومياً bac blanc',
    desc: 'من 1 مايو إلى 30 يونيو، مسابقة كل يوم: توقيت حقيقي، تصحيح ذكاء اصطناعي وتصنيف وطني.',
    accent: 'text-rose-700',
  },
]

const STATS = [
  { num: '10K', label: 'تلميذ نشط' },
  { num: 'عددها لا ينتهي', label: 'تمارين مولدة بالذكاء الاصطناعي ومصححة' },
  { num: '8', label: 'مواد مشمولة' },
  { num: '4.9★', label: 'متوسط التقييم' },
]

// ═══════════════════════════════════════════════════════════════
//  SEO — hreflang FR ↔ AR (indique à Google que ces deux pages sont
//  la même page dans deux langues, pour un ciblage correct par pays)
// ═══════════════════════════════════════════════════════════════
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.mathbacai.com/ar',
    languages: {
      fr: 'https://www.mathbacai.com/',
      ar: 'https://www.mathbacai.com/ar',
      'x-default': 'https://www.mathbacai.com/',
    },
  },
}

export default function LandingPageAr() {
  return (
    <main className="bg-white text-slate-900 font-body overflow-x-hidden font-arabic" dir="rtl">
      {/* ═══════════════════════════ HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <Link href="/ar" className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25">
              <Image src="/images/logo-mathbac-ai-icon.png" alt="MathBacAI" fill className="object-cover hover:scale-105 transition duration-700" />
            </div>
            MathBacAI
          </Link>
          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-500">
            <span>الميزات</span>
            <span>باك blanc</span>
            <span>المحاكاة</span>
            <span>محلل التمارين الذكي (Le solveur)</span>
            <span>دردشة الأستاذ</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
              <Link href="/?lang=fr" className="px-3 py-1 rounded-full text-slate-500 text-xs font-bold hover:text-blue-600 transition-colors">
                Français
              </Link>
              <span className="px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-bold shadow-sm">العربية</span>
            </div>
            <Link
              href="/decouvrir"
              className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold px-7 py-3 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════ HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* يمين : Image (RTL) — DÉCALÉE VERS LA GAUCHE */}
            <div className="group relative order-2 md:order-1 flex justify-center md:justify-end md:mr-16">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,.45)] border border-white/10">
                <Image src="/images/hero-etudiante-v2.jpg" alt="تلميذ يُعدّ نفسه للباكالوريا مع MathBacAI" fill priority className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -left-1 md:left-4 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/20 flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">نسبة النجاح</p>
                  <p className="text-lg font-extrabold text-slate-900">94%</p>
                </div>
              </div>
              <div className="absolute -top-3 right-4 md:right-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl px-3 py-2 shadow-lg shadow-amber-500/30 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="text-slate-900 text-xs font-extrabold">Top Rated</span>
              </div>
            </div>

            {/* يسار : Texte + CTA (RTL) */}
            <div className="order-1 md:order-2 text-center md:text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 border border-blue-400/20 px-7 py-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-base font-bold uppercase tracking-wider">جديد · الذكاء الاصطناعي التوليدي</span>
              </div>

              <h1 className="font-display font-extrabold text-white text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
                حقق{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                  نجاحك في الباكالوريا
                </span>
              </h1>

              <p className="mt-6 text-yellow-300 text-base md:text-lg leading-9 max-w-xl mx-auto md:mx-0 font-semibold">
                أول منصة تعليمية تعتمد على الذكاء الاصطناعي، صُممت خصيصًا لأساتذة وتلاميذ البكالوريا في تونس و  
في فرنساTerminale,Premiere et Secondaire.
                <span className="mt-3 block text-white/80 text-sm md:text-base font-medium">
                  تغطي المنصة جميع شعب البكالوريا وفق البرنامج الرسمي في: الرياضيات، الفيزياء، الإنجليزية، علوم الحياة والأرض، الإعلامية، الفرنسية، التصرف والاقتصاد.
                </span>
              </p>

              <div className="mt-10 flex flex-wrap gap-3 justify-center md:justify-end">
                <Link
                  href="/decouvrir"
                  className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold px-8 py-3.5 text-[15px] shadow-xl shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300"
                >
                  ← ابدأ الآن
                </Link>
                <Link
                  href="/decouvrir"
                  className="rounded-full bg-white/15 backdrop-blur border-2 border-white/40 text-white font-bold px-7 py-3.5 text-[15px] hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300"
                >
                  اكتشف المزيد
                </Link>
              </div>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,48 C360,90 1080,0 1440,48 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* ═══════════════════════════ STATS BAR */}
      <section className="bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                  {stat.num}
                </p>
                <p className="text-slate-500 text-sm font-semibold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">الميزات</p>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900">
              كل ما تحتاجه لنجاح <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">باكالورياك</span>
            </h2>
          </div>

          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group mb-10 last:mb-0 rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`grid md:grid-cols-2 gap-0 items-stretch ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image — sections 2 et 4 : décalée vers la droite (RTL) */}
                <div className={`relative flex items-center justify-center p-6 md:p-10 bg-slate-50 ${i === 1 || i === 3 ? 'md:ml-16' : ''}`}>
                  <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-slate-300/50 border border-slate-200">
                    <Image src={f.img} alt={f.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                </div>
                {/* Content */}
                <div
                  className="p-8 md:py-14 md:pl-14 md:pr-14 flex flex-col justify-center text-right"
                  style={i === 1 || i === 3 ? { paddingRight: '10rem' } : undefined}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-blue-500/25">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-extrabold text-slate-900 text-2xl md:text-3xl mb-4">
                    {f.title}
                  </h3>
                  <p className={`${f.accent} text-[1.02rem] md:text-[1.08rem] leading-8 font-semibold tracking-[0.01em] text-slate-700`}>
                    {f.desc}
                  </p>
                  <Link
                    href="/decouvrir"
                    className="mt-6 inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all group"
                  >
                    جرّب الآن
                    <span className="group-hover:translate-x-1 transition-transform">←</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ═══════════════════════════ VIDÉO */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 mb-8">دقيقة واحدة لاكتشاف المنصة</h2>
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-slate-300/50 border border-slate-200" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <iframe
              src="https://www.youtube.com/embed/I5LpqJvHD80"
              title="MathBacAI"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════ COMMENT ÇA MARCHE */}
      <section id="commentcamarche" className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">كيف تعمل المنصة</p>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900">4 خطوات نحو النجاح</h2>
          </div>

          <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200" />

            {[
              { n: '1', icon: '🚀', title: 'أنشئ حسابك', desc: 'تسجيل مجاني بالكامل في ثوانٍ.' },
              { n: '2', icon: '🎁', title: 'محتوى مجاني', desc: 'البرنامج الرسمي لتونس وفرنسا، دروس وامتحانات متاحة مجانًا.' },
              { n: '3', icon: '💳', title: 'اختر مادتك', desc: 'اختر المادة التي تريد دراستها.' },
              { n: '4', icon: '📈', title: 'تقدّم مع الذكاء الاصطناعي', desc: 'تدرّب، صحّح أخطاءك، واتبع خطة مراجعة شخصية حتى البكالوريا.' },
            ].map((s) => (
              <div key={s.n} className="relative text-center rounded-3xl bg-white shadow-lg p-6 transition-all duration-300 hover:-translate-y-2">
                <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-500/25 mb-4">
                  {s.n}
                </div>
                <span className="text-3xl">{s.icon}</span>
                <h3 className="font-display font-extrabold text-slate-900 text-lg mt-3 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════ CTA FINAL */}
      <section id="bacblanc" className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)'
        }} />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="relative max-w-4xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-right">
          <div>
            <h2 className="font-display font-extrabold text-white text-4xl md:text-6xl mb-4">
              باكالورياك تبدأ <span className="text-yellow-300">الآن</span>
            </h2>

            <p className="text-blue-200 text-base md:text-lg mb-10 max-w-xl mx-auto md:mx-0">
              سجّل مجاناً.
            </p>

            <Link
              href="/decouvrir"
              className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur border-2 border-white/40 text-white font-bold px-16 py-6 text-lg hover:bg-white/20 hover:border-white/60 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              شاهد العرض التوضيحي
            </Link>
          </div>

          <div className="flex md:flex-col items-center gap-4">
            <a href="https://www.youtube.com/channel/UCKKpmwMPUOLmeIlupOJ8KPg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
            </a>
            <a href="https://www.facebook.com/bac2027mathbacai" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden">
              <Image src="/images/logo-mathbac-ai-icon.png" alt="MathBacAI" fill className="object-cover hover:scale-105 transition duration-700" />
            </div>
            <span className="font-bold text-slate-200">MathBacAI</span>
          </div>
          <span>© 2026 MathBacAI · mathbacai.com</span>
          <span className="flex items-center gap-2">
            <span>تونس 🇹🇳</span>
            <span>·</span>
            <span>فرنسا 🇫🇷</span>
          </span>
        </div>
      </footer>
    </main>
  )
}