import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Video, Clock, Moon, Activity } from 'lucide-react';
import { toFa } from '@/lib/fa';

type DayStatus = 'completed' | 'consult' | 'pending' | 'rest';

type DayData = {
  day: number;
  status: DayStatus;
  movements?: { name: string; duration: string; accuracy: number; feedback?: string }[];
};

const STATUS_CONFIG: Record<DayStatus, { dot: string; label: string; icon: typeof CheckCircle2 }> = {
  completed: { dot: 'bg-success-500', label: 'تمرین تکمیل‌شده', icon: CheckCircle2 },
  consult: { dot: 'bg-accent-500', label: 'ویزیت و مشاوره آنلاین', icon: Video },
  pending: { dot: 'bg-warning-500', label: 'تمرین انجام‌نشده امروز', icon: Clock },
  rest: { dot: 'bg-slate-400', label: 'روز استراحت و ریکاوری', icon: Moon },
};

const MONTH_NAMES = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];
const WEEK_DAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

// Sample data for current month (30 days)
const SAMPLE_DAYS: DayData[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  if (day % 7 === 0 || day % 7 === 6) return { day, status: 'rest' as DayStatus };
  if (day === 5 || day === 19) return {
    day, status: 'consult' as DayStatus,
    movements: [{ name: 'جلسه ویزیت آنلاین با دکتر علوی', duration: '۳۰ دقیقه', accuracy: 0 }],
  };
  if (day > 14 && day !== 27) return {
    day, status: 'completed' as DayStatus,
    movements: [
      { name: 'خم و راست کردن زانو', duration: '۱۵ دقیقه', accuracy: 94, feedback: 'کیفت حرکت عالی بود. ادامه دهید.' },
      { name: 'تقویت عضلات چهارسر', duration: '۱۰ دقیقه', accuracy: 88, feedback: 'کمی سرعت حرکت را کاهش دهید.' },
    ],
  };
  if (day === 27) return { day, status: 'pending' as DayStatus, movements: [{ name: 'تمرینات امروز هنوز انجام نشده', duration: '—', accuracy: 0 }] };
  return { day, status: 'rest' as DayStatus };
});

export default function RehabCalendar() {
  const [monthIdx, setMonthIdx] = useState(6); // مهر
  const [selectedDay, setSelectedDay] = useState<number | null>(27);
  const today = 27;

  const selectedData = selectedDay ? SAMPLE_DAYS.find((d) => d.day === selectedDay) : null;

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-3 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            تقویم توانبخشی
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMonthIdx((m) => (m + 11) % 12)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 min-w-[80px] text-center">{MONTH_NAMES[monthIdx]}</span>
            <button
              onClick={() => setMonthIdx((m) => (m + 1) % 12)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEK_DAYS.map((d, i) => (
            <div key={i} className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {SAMPLE_DAYS.map((d) => {
            const cfg = STATUS_CONFIG[d.status];
            const isToday = d.day === today;
            const isSelected = d.day === selectedDay;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-900/30 ring-2 ring-brand-500'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                } ${isToday ? 'ring-2 ring-accent-400' : ''}`}
              >
                <span className={`text-sm font-bold ${isToday ? 'text-accent-600 dark:text-accent-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {toFa(d.day)}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          {(Object.keys(STATUS_CONFIG) as DayStatus[]).map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <span key={s} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Daily detail card */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 sticky top-24"
          >
            {selectedData ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                    روز {toFa(selectedData.day)} {MONTH_NAMES[monthIdx]}
                  </h4>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    selectedData.status === 'completed' ? 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400' :
                    selectedData.status === 'consult' ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400' :
                    selectedData.status === 'pending' ? 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {(() => {
                      const Icon = STATUS_CONFIG[selectedData.status].icon;
                      return <Icon className="h-3.5 w-3.5" />;
                    })()}
                    {STATUS_CONFIG[selectedData.status].label}
                  </span>
                </div>

                {selectedData.movements && selectedData.movements.length > 0 ? (
                  <div className="space-y-3">
                    {selectedData.movements.map((m, i) => (
                      <div key={i} className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{m.name}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {m.duration}</span>
                          {m.accuracy > 0 && (
                            <span className={`font-bold ${m.accuracy >= 90 ? 'text-success-600 dark:text-success-400' : m.accuracy >= 75 ? 'text-warning-500 dark:text-warning-400' : 'text-alert-500 dark:text-alert-400'}`}>
                              دقت: {toFa(m.accuracy)}٪
                            </span>
                          )}
                        </div>
                        {m.feedback && (
                          <div className="mt-2 rounded-lg bg-brand-50 dark:bg-brand-900/20 p-2.5 text-xs text-slate-600 dark:text-slate-300 border-r-2 border-brand-400">
                            <span className="font-bold">یادداشت درمانگر: </span>{m.feedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">روز استراحت - تمرینی ثبت نشده.</p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">تاریخ را انتخاب کنید</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
