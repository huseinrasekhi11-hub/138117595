import React, { useState, useEffect } from 'react';
import { PoseHUD } from './components/PoseHUD';
import { PatientDashboard } from './pages/PatientDashboard';
import { FAQ } from './components/FAQ';
import { Activity, Users, MapPin, Moon, Sun, Stethoscope, ChevronLeft } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'patient-dashboard'>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem('theme') !== 'light');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg"><Activity className="w-6 h-6"/></div>
            <div>
              <span className="text-lg font-black tracking-tight flex items-center gap-1.5">تله‌فیزیو <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">پل بالینی</span></span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">دستیار هوشمند توانبخشی و نظارت درمانگر</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
              {darkMode ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
            </button>
            <button onClick={() => alert('بخش پرتال درمانگران')} className={`hidden sm:inline-flex px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'}`}>ورود درمانگر</button>
            <button onClick={() => setCurrentPage(currentPage === 'home' ? 'patient-dashboard' : 'home')} className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition flex items-center gap-1.5">
              {currentPage === 'home' ? 'ورود بیمار' : 'صفحه اصلی'} <ChevronLeft className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </header>

      {currentPage === 'patient-dashboard' ? (
        <PatientDashboard/>
      ) : (
        <main className="space-y-20 pb-20">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Stethoscope className="w-4 h-4"/> پل ارتباطی هوشمند فیزیوتراپیست و بیمار
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                حفظ پیوستگی درمان در منزل، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">تحت نظارت مستقیم فیزیوتراپیست شما</span>
              </h1>
              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                دیگر بعد از جراحی تنها نیستید. برنامه تمرینی اختصاصی درمانگر را در منزل اجرا کنید و با دستیار پایش زوایای حرکتی، از رها کردن درمان جلوگیری نمایید.
              </p>
              <div className="flex justify-center pt-2">
                <button onClick={() => setCurrentPage('patient-dashboard')} className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-xl shadow-emerald-900/40 transition">
                  شروع تمرین و ورود بیمار
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className={`p-6 rounded-3xl border transition ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-4"><Users className="w-5 h-5"/></div>
                <h3 className="font-bold text-base mb-2">نظارت پیوسته درمانگر</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">ارسال بلادرنگ گزارش تمرینات و زاویه مفاصل به فیزیوتراپیست برای بازنگری.</p>
              </div>
              <div className={`p-6 rounded-3xl border transition ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mb-4"><Activity className="w-5 h-5"/></div>
                <h3 className="font-bold text-base mb-2">دستیار بینایی بیومکانیکال</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">پایش زنده زوایا و هشدارهای اصلاح وضعیت با دوربین موبایل، بدون سنسور.</p>
              </div>
              <div className={`p-6 rounded-3xl border transition ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-4"><MapPin className="w-5 h-5"/></div>
                <h3 className="font-bold text-base mb-2">عدالت درمانی و کاهش هزینه</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">دسترسی مناطق کم‌برخوردار به متخصصان بدون نیاز به سفرهای مکرر.</p>
              </div>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">نمونه پایش زنده زاویه مفاصل</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">تکنولوژی پایش ۳۳ نقطه‌ای بدون ذخیره تصویر</p>
            </div>
            <PoseHUD/>
          </section>
          <FAQ/>
        </main>
      )}
    </div>
  );
}
