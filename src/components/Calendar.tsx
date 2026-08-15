import React, { useState } from 'react';
import { Calendar as CalendarIcon, CircleCheck as CheckCircle2, MessageSquare } from 'lucide-react';

interface DayActivity {
  day: number;
  status: 'completed' | 'teleconsult' | 'pending' | 'rest';
  title: string;
  duration?: string;
  score?: number;
  therapistNote?: string;
  exercises?: string[];
}

const mockMonthData: Record<number, DayActivity> = {
  10: { day: 10, status: 'completed', title: 'تمرین تقویت چهارسر و اکستنشن', duration: '۲۵ دقیقه', score: 94, therapistNote: 'دامنه حرکتی زانو تا ۱۱۵ درجه بسیار مطلوب بود. فردا فشار ملایم‌تری وارد کنید.', exercises: ['فلکشن زانو (۳ ست ۱۵ تایی)', 'اکستنشن هیپ (۲ ست ۱۰ تایی)'] },
  11: { day: 11, status: 'completed', title: 'تمرین بهبود دامنه حرکتی زانو', duration: '۳۰ دقیقه', score: 88, therapistNote: 'سرعت بازگشت مفصل مناسب بود. زاویه صاف نگه داشتن پا را رعایت کردید.', exercises: ['لغزش پاشنه روی دیوار', 'انقباض ایزومتریک کوادریسپس'] },
  12: { day: 12, status: 'teleconsult', title: 'ویزیت تصویری و ارزیابی آنلاین', duration: 'جلسه ۲۰ دقیقه‌ای', therapistNote: 'جلسه ویزیت تصویری جهت بررسی روند ترمیم بخیه‌ها و افزایش زاویه به ۱۲۰ درجه.' },
  13: { day: 13, status: 'rest', title: 'روز استراحت و ریکاوری بافت', therapistNote: 'استفاده از کمپرس سرد طبق دستورالعمل بعد از تمرینات روز گذشته توصیه می‌شود.' },
  14: { day: 14, status: 'completed', title: 'تمرین بازآموزی الگوی راه رفتن', duration: '۲۰ دقیقه', score: 92, therapistNote: 'توزیع وزن روی هر دو پا متعادل‌تر شده است.', exercises: ['تمرین تعادل تک‌پا', 'مینی اسکوات با تکیه‌گاه'] },
  15: { day: 15, status: 'pending', title: 'برنامه توانبخشی تجویز شده امروز', duration: '۲۵ دقیقه (در انتظار انجام)', exercises: ['خم کردن زانو در حالت نشسته (۳ ست)', 'بالا کشیدن مستقیم پا (SLR)'] },
};

export const RehabilitationCalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const activeDetail = mockMonthData[selectedDay] || {
    day: selectedDay,
    status: 'rest',
    title: 'برنامه استراحت تجویز شده',
    therapistNote: 'برای این روز تمرین سنگینی ثبت نشده است. پیاده‌روی سبک در منزل مجاز است.'
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-slate-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <CalendarIcon className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">تقویم و برنامه جلسات توانبخشی</h3>
            <p className="text-xs text-slate-400">پیگیری جلسات تمرینی در منزل و ارتباط با درمانگر</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> تکمیل‌شده</span>
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> ویزیت آنلاین</span>
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> تمرین امروز</span>
          <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span> استراحت</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-6">
        {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((d, i) => (
          <div key={i} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
        ))}
        {days.map((d) => {
          const activity = mockMonthData[d];
          const isSelected = selectedDay === d;
          return (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`relative h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400 shadow-lg' : 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-800'
              }`}
            >
              <span className="text-sm">{d}</span>
              <div className="mt-1 flex gap-1">
                {activity?.status === 'completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                {activity?.status === 'teleconsult' && <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>}
                {activity?.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>}
                {activity?.status === 'rest' && <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>}
                {!activity && <span className="w-1.5 h-1.5 rounded-full bg-transparent"></span>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
          <div>
            <span className="text-xs text-slate-400">جزئیات روز {selectedDay} ماه:</span>
            <h4 className="text-base font-bold text-white mt-0.5">{activeDetail.title}</h4>
          </div>
          {activeDetail.score && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-xl font-bold">امتیاز پایش: {activeDetail.score}٪</div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeDetail.exercises && (
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">تمرینات تجویزی این روز:</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeDetail.exercises.map((ex, idx) => (
                  <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/>{ex}</li>
                ))}
              </ul>
            </div>
          )}
          {activeDetail.therapistNote && (
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5"><MessageSquare className="w-3.5 h-3.5 text-sky-400"/>یادداشت بالینی درمانگر:</span>
              <p className="text-xs text-slate-300 leading-relaxed">{activeDetail.therapistNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
