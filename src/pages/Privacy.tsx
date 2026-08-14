import { ShieldCheck, Lock, Eye, Server } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="pt-20 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-brand-600 dark:text-brand-400" />
          حریم خصوصی و امنیت داده‌های پزشکی
        </h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          فیزیوآی متعهد به حفاظت از داده‌های پزشکی و حریم خصوصی کاربران است.
        </p>

        <div className="space-y-4">
          {[
            { icon: Lock, title: 'رمزگذاری داده‌ها', text: 'تمام داده‌های پزشکی به‌صورت رمزگذاری‌شده ذخیره و انتقال می‌یابند.' },
            { icon: Eye, title: 'پردازش محلی', text: 'در حالت پردازش محلی، تصاویر هرگز از دستگاه شما خارج نمی‌شوند.' },
            { icon: Server, title: 'سرورهای امن', text: 'داده‌ها روی سرورهای امن با استاندارد ISO 27001 نگهداری می‌شوند.' },
            { icon: ShieldCheck, title: 'کنترل دسترسی', text: 'فقط درمانگر اختصاصی شما به گزارش‌های تمرینی شما دسترسی دارد.' },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <div className="shrink-0 grid h-12 w-12 place-items-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-1">{c.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{c.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
