import React from 'react';
import { ShieldCheck, Star, MapPin, Video, MessageCircle, Award, CheckCircle2 } from 'lucide-react';

export const TherapistProfile: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] -z-10"></div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0 relative">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80" alt="دکتر رستمی" className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-4 ring-emerald-50 dark:ring-slate-800 shadow-lg" />
              <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> تاییدیه نظام پزشکی
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">دکتر علیرضا رستمی</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">متخصص فیزیوتراپی و توانبخشی ورزشی | نظام پزشکی: ف-۴۸۲۹۱</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-500/20">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold pt-0.5">۴.۹</span>
                  <span className="text-xs opacity-70">(۱۲۸ نظر)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold">آسیب‌های ارتوپدی</span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold">توانبخشی پس از جراحی</span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold">تعویض مفصل زانو</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-lg shadow-emerald-900/20">
                  <Video className="w-4 h-4" /> درخواست ویزیت آنلاین
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl text-sm font-bold transition">
                  <MessageCircle className="w-4 h-4" /> مشاوره متنی
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-emerald-500" /> سوابق بالینی و بیوگرافی
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            دکتر علیرضا رستمی با بیش از ۱۲ سال سابقه بالینی در حوزه توانبخشی پس از جراحی‌های ارتوپدی، تمرکز ویژه‌ای بر بازیابی دامنه حرکتی بیماران تعویض مفصل زانو و لگن دارند. ایشان با بهره‌گیری از سیستم‌های پایش بیومکانیکال هوشمند، روند بهبودی بیماران را در منزل و فواصل بین جلسات حضوری با دقت مانیتور کرده و برنامه‌های اختصاصی ارائه می‌دهند.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> فارغ‌التحصیل دانشگاه علوم پزشکی تهران
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <MapPin className="w-4 h-4 text-emerald-500" /> کلینیک: تهران، خیابان ولیعصر، تقاطع توانیر
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
