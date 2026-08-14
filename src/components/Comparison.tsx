import { CheckCircle2, XCircle, Minus, TrendingDown, Home, Camera, Clock } from 'lucide-react';
import { toFa } from '@/lib/fa';

type Cell = { text: string; type: 'best' | 'bad' | 'neutral' };

const ROWS: { icon: typeof TrendingDown; label: string; cells: Cell[] }[] = [
  {
    icon: TrendingDown,
    label: 'هزینه هر جلسه (تومان)',
    cells: [
      { text: '٪۶۰ ارزان‌تر', type: 'best' },
      { text: 'بالا', type: 'bad' },
      { text: 'خیلی سنگین', type: 'bad' },
    ],
  },
  {
    icon: Home,
    label: 'نیاز به جابه‌جایی و ترافیک',
    cells: [
      { text: 'صفر (در منزل)', type: 'best' },
      { text: 'سخت و رفت‌وآمدی', type: 'bad' },
      { text: 'صفر', type: 'neutral' },
    ],
  },
  {
    icon: Camera,
    label: 'دقت سنجش زوایا',
    cells: [
      { text: 'دقیق با هوش مصنوعی', type: 'best' },
      { text: 'چشمی/تخمینی', type: 'bad' },
      { text: 'چشمی/تخمینی', type: 'bad' },
    ],
  },
  {
    icon: Clock,
    label: 'پایش روزانه و پشتیبانی',
    cells: [
      { text: '۲۴/۷ پیوسته', type: 'best' },
      { text: 'محدود به زمان جلسه', type: 'bad' },
      { text: 'محدود به زمان جلسه', type: 'bad' },
    ],
  },
];

const COLS = ['شاخص‌ها', 'فیزیوآی (هوش مصنوعی + آنلاین)', 'کلینیک حضوری', 'هوم‌ویزیت (حضور در منزل)'];

export default function Comparison() {
  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 px-3 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
            <TrendingDown className="h-3.5 w-3.5" />
            مزایا و هزینه‌ها
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            مقایسه شفاف <span className="gradient-text">گزینه‌های درمانی</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            ببینید چرا فیزیوآی می‌تواند جایگزین مقرون‌به‌صرفه و دقیق‌تری برای فیزیوتراپی سنتی باشد.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-l from-slate-900 to-slate-800 text-white">
                {COLS.map((c, i) => (
                  <th
                    key={i}
                    className={`px-6 py-5 text-sm font-extrabold text-right ${i === 1 ? 'bg-brand-600' : ''}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => {
                const Icon = row.icon;
                return (
                  <tr key={ri} className={ri % 2 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-white dark:bg-slate-800'}>
                    <td className="px-6 py-5">
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                        <Icon className="h-4 w-4 text-slate-400" />
                        {row.label}
                      </span>
                    </td>
                    {row.cells.map((cell, ci) => (
                      <td key={ci} className={`px-6 py-5 ${ci === 0 ? 'bg-brand-50/50 dark:bg-brand-900/20' : ''}`}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-bold ${
                            cell.type === 'best'
                              ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                              : cell.type === 'bad'
                              ? 'bg-alert-50 dark:bg-alert-900/30 text-alert-600 dark:text-alert-400'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {cell.type === 'best' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : cell.type === 'bad' ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                          {cell.text}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {ROWS.map((row, ri) => {
            const Icon = row.icon;
            return (
              <div key={ri} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
                <p className="flex items-center gap-2 text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3">
                  <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  {row.label}
                </p>
                <div className="space-y-2">
                  {row.cells.map((cell, ci) => (
                    <div key={ci} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{COLS[ci + 1]}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold ${
                          cell.type === 'best'
                            ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                            : cell.type === 'bad'
                            ? 'bg-alert-50 dark:bg-alert-900/30 text-alert-600 dark:text-alert-400'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {cell.type === 'best' ? <CheckCircle2 className="h-3 w-3" /> : cell.type === 'bad' ? <XCircle className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        {cell.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
