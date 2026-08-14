import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Repeat, AlertTriangle, CheckCircle2, ChevronRight, Search, Dumbbell } from 'lucide-react';
import { toFa } from '@/lib/fa';

type Exercise = {
  id: string;
  name: string;
  category: string;
  sets: number;
  reps: number;
  duration: string;
  difficulty: 'آسان' | 'متوسط' | 'پیشرفته';
  steps: string[];
  commonErrors: string[];
  prescribed: boolean;
};

const EXERCISES: Exercise[] = [
  {
    id: 'knee-ext',
    name: 'خم و راست کردن زانو',
    category: 'زانو · اندام تحتانی',
    sets: 3,
    reps: 12,
    duration: '۱۵ دقیقه',
    difficulty: 'متوسط',
    steps: [
      'روی صندلی بنشینید و کمر را صاف نگه دارید.',
      'پا را به آرامی از زانو باز کنید تا کاملاً صاف شود.',
      '۳ ثانیه در این حالت نگه دارید.',
      'به آرامی پا را به حالت اولیه برگردانید.',
    ],
    commonErrors: [
      'تند باز کردن زانو که باعث فشار به مفصل می‌شود.',
      'خم شدن تنه به جلو هنگام باز کردن پا.',
      'عدم نگه داشتن کامل در زاویه نهایی.',
    ],
    prescribed: true,
  },
  {
    id: 'hamstring',
    name: 'تقویت عضله همسترینگ',
    category: 'زانو · اندام تحتانی',
    sets: 3,
    reps: 10,
    duration: '۱۰ دقیقه',
    difficulty: 'متوسط',
    steps: [
      'به شکم روی زمین دراز بکشید.',
      'پا را از زانو خم کنید و به سمت باسن بالا بیاورید.',
      '۲ ثانیه نگه دارید و به آرامی پایین بیاورید.',
    ],
    commonErrors: [
      'بالا آوردن لگن هنگام خم کردن پا.',
      'تند انجام دادن حرکت.',
    ],
    prescribed: true,
  },
  {
    id: 'knee-stretch',
    name: 'کشش ملایم زانو',
    category: 'زانو · اندام تحتانی',
    sets: 2,
    reps: 15,
    duration: '۸ دقیقه',
    difficulty: 'آسان',
    steps: [
      'بایستید و از دیوار برای تعادل استفاده کنید.',
      'مچ پا را به سمت باسن بگیرید و زانو را خم کنید.',
      '۲۰ ثانیه نگه دارید و رها کنید.',
    ],
    commonErrors: [
      'خم شدن بیش از حد کمر.',
      'کشش بیش از حد که باعث درد می‌شود.',
    ],
    prescribed: true,
  },
  {
    id: 'quad-set',
    name: 'انقباض ایزومتریک عضله چهارسر',
    category: 'زانو · اندام تحتانی',
    sets: 3,
    reps: 15,
    duration: '۱۰ دقیقه',
    difficulty: 'آسان',
    steps: [
      'روی زمین به پشت دراز بکشید.',
      'زیر زانو یک حوله لوله شده قرار دهید.',
      'عضله چهارسر را منقبض کنید و زانو را به زمین فشار دهید.',
      '۵ ثانیه نگه دارید و رها کنید.',
    ],
    commonErrors: [
      'نگرفتن نفس هنگام انقباض.',
      'کوتاه بودن زمان انقباض.',
    ],
    prescribed: false,
  },
  {
    id: 'straight-leg-raise',
    name: 'بالا بردن پا صاف',
    category: 'زانو · اندام تحتانی',
    sets: 3,
    reps: 12,
    duration: '۱۲ دقیقه',
    difficulty: 'متوسط',
    steps: [
      'به پشت دراز بکشید و یک پا را خم کنید.',
      'پای صاف را به آرامی تا زاویه ۴۵ درجه بالا بیاورید.',
      '۳ ثانیه نگه دارید و پایین بیاورید.',
    ],
    commonErrors: [
      'خم شدن زانوی پای صاف.',
      'چرخش پا به بیرون.',
    ],
    prescribed: false,
  },
  {
    id: 'wall-sit',
    name: 'نشستن به دیوار',
    category: 'زانو · اندام تحتانی',
    sets: 3,
    reps: 1,
    duration: '۶ دقیقه',
    difficulty: 'پیشرفته',
    steps: [
      'پشت به دیوار بایستید با فاصله یک گام.',
      'به آرامی پایین بروید تا زانوها ۹۰ درجه خم شوند.',
      '۳۰ ثانیه نگه دارید و بلند شوید.',
    ],
    commonErrors: [
      'خم شدن بیش از ۹۰ درجه زانو.',
      'دور شدن زانوها از هم.',
    ],
    prescribed: false,
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  'آسان': 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400',
  'متوسط': 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400',
  'پیشرفته': 'bg-alert-100 dark:bg-alert-900/30 text-alert-700 dark:text-alert-400',
};

export default function ExerciseLibrary() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'prescribed'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = EXERCISES.filter((e) => {
    if (filter === 'prescribed' && !e.prescribed) return false;
    if (search && !e.name.includes(search)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/patient/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-3">
            <ChevronRight className="h-4 w-4" />
            بازگشت به پنل
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Dumbbell className="h-7 w-7 text-brand-600 dark:text-brand-400" />
            کتابخانه تمرینات
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ویدیوهای آموزشی و راهنمای اجرای صحیح تمرینات تجویزشده</p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 focus-within:border-brand-400">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی تمرین..."
              className="w-full bg-transparent py-3 text-sm outline-none text-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${filter === 'all' ? 'bg-brand-600 text-white' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
            >
              همه تمرینات
            </button>
            <button
              onClick={() => setFilter('prescribed')}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${filter === 'prescribed' ? 'bg-brand-600 text-white' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
            >
              تجویزشده
            </button>
          </div>
        </div>

        {/* Exercise grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ex) => {
            const isExpanded = expanded === ex.id;
            return (
              <div
                key={ex.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col"
              >
                {/* Video placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 grid place-items-center group cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-500/20 group-hover:bg-brand-500/30 transition-colors">
                    <Play className="h-6 w-6 text-brand-300 fill-brand-300" />
                  </div>
                  <span className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-0.5 text-xs text-white">{ex.duration}</span>
                  {ex.prescribed && (
                    <span className="absolute top-3 right-3 rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold text-white">تجویزشده</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{ex.name}</h3>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${DIFFICULTY_COLORS[ex.difficulty]}`}>
                      {ex.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{ex.category}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Repeat className="h-3.5 w-3.5" /> {toFa(ex.sets)} ست × {toFa(ex.reps)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {ex.duration}</span>
                  </div>

                  {/* Expand */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : ex.id)}
                    className="mt-auto text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
                  >
                    {isExpanded ? 'بستن جزئیات' : 'نمایش راهنمای اجرا'}
                    <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isExpanded ? '-rotate-90' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-4 space-y-3 animate-fade-in">
                      {/* Steps */}
                      <div>
                        <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success-500" />
                          مراحل اجرا
                        </p>
                        <ol className="space-y-1.5">
                          {ex.steps.map((s, i) => (
                            <li key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-[10px] font-bold">{toFa(i + 1)}</span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      </div>
                      {/* Common errors */}
                      <div>
                        <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-warning-500" />
                          خطاهای رایج حرکتی
                        </p>
                        <ul className="space-y-1.5">
                          {ex.commonErrors.map((e, i) => (
                            <li key={i} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <span className="text-warning-500 shrink-0">•</span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-slate-400">تمرینی یافت نشد.</p>
          </div>
        )}
      </div>
    </div>
  );
}
