import { BookOpen, Camera, Activity, MessageSquare, Calendar } from 'lucide-react';

const STEPS = [
  { icon: Calendar, title: 'ارزیابی اولیه', text: 'پس از ثبت‌نام، فیزیوتراپیست اختصاصی شما ارزیابی اولیه‌ای انجام می‌دهد و برنامه درمانی را تنظیم می‌کند.' },
  { icon: Camera, title: 'شروع تمرین', text: 'جلوی دوربین گوشی تمرین کنید. دستیار هوشمند زوایای حرکتی شما را پایش می‌کند.' },
  { icon: Activity, title: 'پایش بلادرنگ', text: 'هوش مصنوعی کیفیت حرکت را تحلیل کرده و در صورت نیاز هشدار اصلاحی ارائه می‌دهد.' },
  { icon: MessageSquare, title: 'ارتباط با درمانگر', text: 'گزارش‌های تمرین برای فیزیوتراپیست ارسال می‌شود و می‌توانید از طریق چت سوال بپرسید.' },
];

export default function PatientGuide() {
  return (
    <div className="pt-20 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-brand-600 dark:text-brand-400" />
          راهنمای بیماران
        </h1>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          نحوه کارکرد سیستم فیزیوآی را در چهار گام ساده بشناسید.
        </p>

        <div className="space-y-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <div className="shrink-0">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-1">گام {i + 1}: {s.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
