import { Stethoscope, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function TherapistsJoin() {
  return (
    <div className="pt-20 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">همکاری با فیزیوتراپیست‌ها و کلینیک‌ها</h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          با پیوستن به شبکه فیزیوآی، بیماران خود را به‌صورت آنلاین پایش کنید، برنامه درمانی شخصی‌سازی‌شده تجویز کنید و گزارش‌های تحلیلی دقیق دریافت کنید.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Stethoscope, title: 'برای فیزیوتراپیست‌ها', items: ['داشبورد مدیریت بیماران', 'گزارش‌های تحلیلی پایش حرکت', 'ارتباط چت و تصویری با بیمار', 'تنظیم برنامه تمرینی اختصاصی'] },
            { icon: Building2, title: 'برای کلینیک‌ها', items: ['مدیریت چند درمانگر', 'گزارش‌های مدیریتی', 'افزایش ظرفیت بدون نیاز به فضا', 'سیستم نوبت‌دهی آنلاین'] },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400 mb-3" />
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3">{c.title}</h3>
                <ul className="space-y-2">
                  {c.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-success-500 shrink-0 mt-0.5" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-gradient-to-l from-brand-600 to-accent-500 p-6 text-white">
          <h2 className="text-lg font-extrabold mb-2">درخواست همکاری</h2>
          <p className="text-sm text-white/80 mb-4">برای پیوستن به شبکه فیزیوتراپیست‌های فیزیوآی، فرم درخواست را تکمیل کنید.</p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 hover:bg-white/90">
            ثبت درخواست
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
