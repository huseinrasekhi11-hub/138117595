import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'ویدیوهای آموزش تمرینات را کجا پیدا کنم؟', a: 'تمامی تمرینات تجویز شده همراه با ویدیوهای استاندارد در تب کتابخانه تمرینات در دسترس است.' },
  { q: 'ارتباط با درمانگر چگونه است؟', a: 'فیزیوتراپیست شما روند تمرینات را از طریق چت، جلسات آنلاین و گزارش‌های هوش مصنوعی بررسی می‌کند.' },
  { q: 'آیا برنامه شخصی‌سازی می‌شود؟', a: 'بله، برنامه متناسب با نوع عارضه و توان بدنی شما تنظیم و به‌روزرسانی می‌شود.' },
  { q: 'آیا سیستم اشتباهات را تشخیص می‌دهد؟', a: 'بله، دستیار هوشمند با تحلیل زوایا، در صورت اجرای نادرست هشدار اصلاحی می‌دهد.' }
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"><HelpCircle className="w-3.5 h-3.5"/>پاسخ به سوالات</div>
          <h2 className="text-2xl font-black">سوالات متداول</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/60 overflow-hidden transition">
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="w-full p-5 text-right flex justify-between gap-4 font-bold text-sm text-slate-800 dark:text-slate-200">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openIdx === idx ? 'rotate-180 text-emerald-500' : 'text-slate-400'}`} />
              </button>
              {openIdx === idx && <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50 pt-3">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
