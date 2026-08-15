import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, MessageSquare } from 'lucide-react';

const mockData: Record<number, any> = {
  10: { status: 'completed', title: 'تمرین تقویت چهارسر', score: 94, exercises: ['فلکشن زانو', 'اکستنشن هیپ'] },
  11: { status: 'completed', title: 'بهبود دامنه حرکتی', score: 88, exercises: ['لغزش پاشنه'] },
  12: { status: 'teleconsult', title: 'ویزیت تصویری', therapistNote: 'بررسی روند ترمیم و زاویه ۱۲۰ درجه.' },
  14: { status: 'completed', title: 'بازآموزی راه رفتن', score: 92, exercises: ['تعادل تک‌پا'] },
  15: { status: 'pending', title: 'برنامه تجویز شده امروز', exercises: ['خم کردن زانو (۳ ست)', 'بالا کشیدن مستقیم پا'] }
};

export const RehabilitationCalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const activeDetail = mockData[selectedDay] || { status: 'rest', title: 'استراحت', therapistNote: 'پیاده‌روی سبک مجاز است.' };
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-slate-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><CalendarIcon className="w-5 h-5"/></div>
          <div><h3 className="font-bold text-lg text-white">تقویم توانبخشی</h3><p className="text-xs text-slate-400">پیگیری جلسات در منزل</p></div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-6">
        {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((d, i) => <div key={i} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>)}
        {days.map((d) => {
          const act = mockData[d];
          return (
            <button key={d} onClick={() => setSelectedDay(d)} className={`relative h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${selectedDay === d ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400' : 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-800'}`}>
              <span className="text-sm">{d}</span>
              <div className="mt-1 flex gap-1">
                {act?.status === 'completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                {act?.status === 'teleconsult' && <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>}
                {act?.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
          <div><span className="text-xs text-slate-400">روز {selectedDay} ماه:</span><h4 className="font-bold text-white mt-0.5">{activeDetail.title}</h4></div>
          {activeDetail.score && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-xl font-bold">امتیاز: {activeDetail.score}٪</div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeDetail.exercises && (
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-2">تمرینات:</span>
              <ul className="space-y-1.5 text-xs text-slate-300">{activeDetail.exercises.map((ex:string, idx:number) => <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/>{ex}</li>)}</ul>
            </div>
          )}
          {activeDetail.therapistNote && (
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5"><MessageSquare className="w-3.5 h-3.5 text-sky-400"/>یادداشت درمانگر:</span>
              <p className="text-xs text-slate-300">{activeDetail.therapistNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
