import React, { useState } from 'react';
import { ChevronDown, CircleHelp as HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "ویدیوهای آموزش تمرینات را کجا می‌توانم پیدا کنم؟",
    a: "تمامی تمرینات تجویز شده توسط فیزیوتراپیست شما، همراه با ویدیوهای آموزشی استاندارد و نکات اجرای صحیح، در بخش «کتابخانه تمرینات» در پنل کاربری بیمار در دسترس است."
  },
  {
    q: "رسیدگی درمانگر و ارتباط با او چگونه خواهد بود؟",
    a: "فیزیوتراپیست اختصاصی شما پس از ارزیابی اولیه، روند تمرینات را به‌صورت مستمر از طریق چت، جلسات آنلاین تصویری و گزارش‌های تحلیلی پایش حرکت بررسی و برنامه را در صورت نیاز اصلاح می‌کند."
  },
  {
    q: "آیا فیزیوتراپیست می‌تواند برنامه تمرینی هر بیمار را شخصی‌سازی کند؟",
    a: "بله، برنامه درمانی کاملاً متناسب با نوع عارضه (مانند تعویض مفصل)، توان بدنی و دامنه حرکتی شما به صورت انحصاری تنظیم و در طول دوره توسط درمانگر به‌روزرسانی می‌شود."
  },
  {
    q: "آیا سیستم می‌تواند اشتباهات بیمار هنگام انجام تمرین را تشخیص دهد؟",
    a: "بله، دستیار هوشمند با تحلیل زوایای مفاصل و وضعیت استقرار بدن، در صورت اجرای نادرست یا خروج از دامنه مجاز حرکتی، بلافاصله هشدار صوتی و تصویری جهت اصلاح زاویه ارائه می‌دهد."
  }
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <HelpCircle className="w-3.5 h-3.5"/>پاسخ به سوالات پرتکرار
          </div>
          <h2 className="text-2xl font-black">سوالات متداول شما</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/60 overflow-hidden transition">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openIdx === idx ? 'rotate-180 text-emerald-500' : 'text-slate-400'}`} />
              </button>
              {openIdx === idx && <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-3">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
