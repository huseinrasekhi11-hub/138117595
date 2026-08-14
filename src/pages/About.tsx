import { Activity, Target, Users, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">درباره پلتفرم فیزیوآی</h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          فیزیوآی یک پلتفرم تله‌توانبخشی هوشمند است که با ترکیب نظارت مستقیم فیزیوتراپیست‌های مجرب و دستیار هوش مصنوعی، امکان انجام تمرینات درمانی در منزل با بالاترین کیفیت را فراهم می‌کند.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Target, title: 'ماموریت ما', text: 'دسترسی همگان به توانبخشی تخصصی بدون محدودیت مکانی و زمانی.' },
            { icon: Users, title: 'تیم تخصصی', text: 'متشکل از فیزیوتراپیست‌های دارای تاییدیه نظام پزشکی و مهندسان هوش مصنوعی.' },
            { icon: Activity, title: 'فناوری', text: 'استفاده از مدل‌های پیشرفته پایش حرکت برای پایش بلادرنگ زوایای مفصل.' },
            { icon: ShieldCheck, title: 'اعتماد و امنیت', text: 'حفظ حریم خصوصی داده‌های پزشکی بیماران با بالاترین استانداردهای امنیتی.' },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400 mb-3" />
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{c.text}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 p-5">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 mb-2">ارزش‌های ما</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ما معتقدیم هر بیمار شایسته دریافت بهترین درمان است، فارغ از محل زندگی یا امکانات مالی. فیزیوآی این باور را به واقعیت تبدیل می‌کند.
          </p>
        </div>
      </div>
    </div>
  );
}
