import { Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import { toFa } from '@/lib/fa';

export default function Support() {
  return (
    <div className="pt-20 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">تماس با پشتیبانی</h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          تیم پشتیبانی فیزیوآی آماده پاسخگویی به سوالات شماست.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Phone, title: 'تلفن پشتیبانی', value: '۰۲۱-۱۲۳۴۵۶۷۸', ltr: true },
            { icon: Mail, title: 'ایمیل', value: 'support@physioai.ir', ltr: true },
            { icon: MessageSquare, title: 'چت آنلاین', value: 'پاسخ بلادرنگ', ltr: false },
            { icon: Clock, title: 'ساعات کاری', value: 'شنبه تا پنجشنبه، ۹ تا ۱۸', ltr: false },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400 mb-3" />
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-1">{c.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300" dir={c.ltr ? 'ltr' : 'rtl'}>{c.value}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 mb-4">ارسال پیام</h2>
          <div className="space-y-3">
            <input type="text" placeholder="نام شما" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:border-brand-400 text-slate-700 dark:text-slate-200" />
            <input type="email" placeholder="ایمیل" dir="ltr" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:border-brand-400 text-slate-700 dark:text-slate-200" />
            <textarea rows={4} placeholder="پیام شما..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:border-brand-400 resize-none text-slate-700 dark:text-slate-200" />
            <button className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700">ارسال پیام</button>
          </div>
        </div>
      </div>
    </div>
  );
}
