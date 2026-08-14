import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'ویدیوهای آموزش تمرینات را کجا می‌توانم پیدا کنم؟',
    a: 'تمامی تمرینات تجویز شده توسط فیزیوتراپیست شما، همراه با ویدیوهای آموزشی استاندارد و نکات اجرای صحیح، در بخش «کتابخانه تمرینات» در پنل کاربری شما قرار دارد.',
  },
  {
    q: 'رسیدگی درمانگر و ارتباط با او چگونه خواهد بود؟',
    a: 'فیزیوتراپیست اختصاصی شما پس از ارزیابی اولیه، روند تمرینات را به‌صورت مستمر از طریق چت، جلسات آنلاین تصویری و گزارش‌های تحلیلی پایش حرکت بررسی و برنامه را در صورت نیاز اصلاح می‌کند.',
  },
  {
    q: 'آیا فیزیوتراپیست می‌تواند برنامه تمرینی هر بیمار را شخصی‌سازی کند؟',
    a: 'بله، برنامه درمانی کاملاً متناسب با شدت عارضه، توان بدنی و پیشرفت حرکتی شما توسط درمانگر به صورت اختصاصی تنظیم و به‌روزرسانی می‌شود.',
  },
  {
    q: 'آیا سیستم می‌تواند اشتباهات بیمار هنگام انجام تمرین را تشخیص دهد؟',
    a: 'بله، دستیار هوشمند با تحلیل زوایای مفاصل و وضعیت استقرار بدن، در صورت اجرای نادرست یا خروج از دامنه مجاز حرکتی، بلافاصله هشدار صوتی و تصویری جهت اصلاح زاویه ارائه می‌دهد.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 px-3 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
            <HelpCircle className="h-3.5 w-3.5" />
            سوالات متداول
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            پاسخ به <span className="gradient-text">سوالات شما</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${
                  isOpen ? 'border-brand-300 dark:border-brand-700 bg-brand-50/30 dark:bg-brand-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                >
                  <span className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
