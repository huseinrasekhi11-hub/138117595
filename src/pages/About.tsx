import React from 'react';
import { Activity, ShieldCheck, MapPin, TrendingUp, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">پلی میان کلینیک و خانه</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            رسالت ما تبدیل توانبخشی از یک مسیر پرهزینه و خسته‌کننده، به یک فرآیند قابل‌پیگیری، در دسترس و انگیزه‌بخش برای تمامی بیماران است.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-amber-600 dark:text-amber-500">چالش و مسئله اصلی</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              بیماران پس از جراحی‌هایی مانند تعویض مفصل زانو، برای ادامه توانبخشی با هزینه بالای جلسات، درد، رفت‌وآمد و ناامیدی مواجه‌اند. از طرفی کلینیک‌ها امکان پایش روزانه بیماران را ندارند. این مشکل در شهرستان‌ها و مناطق محروم جدی‌تر است، جایی که بیمار به دلیل دوری مسافت، درمان را نیمه‌کاره رها می‌کند.
            </p>
          </div>
          <div className="bg-emerald-600 p-8 rounded-3xl shadow-xl text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-6 h-6 opacity-80"/> راهکار هوشمند ما</h3>
            <p className="text-sm text-emerald-50 leading-relaxed">
              ما سیستم را جایگزین فیزیوتراپیست نکرده‌ایم؛ بلکه دستیار دیجیتال او را ساخته‌ایم. بیمار در منزل برنامه تمرینی را اجرا می‌کند و پلتفرم از طریق بینایی ماشین دوربین موبایل، روند دامنه حرکتی و خطاها را تحلیل کرده و گزارش را مستقیماً برای پزشک ارسال می‌کند تا هیچ بیماری در فواصل جلسات رها نشود.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 text-center">ارزش‌های بنیادین سامانه</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300"><TrendingUp className="w-5 h-5"/></div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">مشاهده ملموس پیشرفت</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">افزایش انگیزه بیمار با دیدن نمودار بهبودی زوایا.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300"><MapPin className="w-5 h-5"/></div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">دسترسی از مناطق محروم</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">پایش بیمار توسط بهترین درمانگران بدون نیاز به سفر.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300"><Users className="w-5 h-5"/></div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">افزایش ظرفیت کلینیک‌ها</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">مدیریت بیماران بیشتر و ایجاد درآمد مکمل برای کلینیک.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
