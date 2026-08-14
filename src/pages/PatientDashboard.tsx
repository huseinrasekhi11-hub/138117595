import { Link } from 'react-router-dom';
import { Play, Dumbbell, MessageSquare, Stethoscope, ChevronLeft, Calendar, Activity, Video, ListChecks } from 'lucide-react';
import { toFa } from '@/lib/fa';
import RehabCalendar from '@/components/RehabCalendar';

const TODAY_EXERCISES = [
  { name: 'خم و راست کردن زانو', sets: 3, reps: 12, target: 'عضله چهارسر رأس', done: 2 },
  { name: 'تقویت همسترینگ', sets: 3, reps: 10, target: 'همسترینگ', done: 0 },
  { name: 'کشش ملایم زانو', sets: 2, reps: 15, target: 'مفصل زانو', done: 0 },
];

const THERAPIST = {
  name: 'دکتر سارا علوی',
  specialty: 'متخصص ارتوپدی و آسیب‌های ورزشی',
  medicalId: '۱۲۳۴۵',
  avatar: 'س',
};

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">پنل بیمار</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">خوش آمدید! روند توانبخشی خود را ادامه دهید.</p>
        </div>

        {/* Top row: Quick Start + Therapist Badge */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Start Card */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-700 bg-gradient-to-l from-brand-600 to-accent-500 p-6 text-white shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                  <Play className="h-3.5 w-3.5" />
                  شروع سریع
                </span>
                <h2 className="mt-3 text-xl font-extrabold">روتین تمرینی امروز</h2>
                <p className="mt-1 text-sm text-white/80">۳ تمرین باقی‌مانده · گروه عضلانی: اندام تحتانی</p>
              </div>
              <div className="hidden sm:block">
                <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Dumbbell className="h-10 w-10" />
                  <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-white text-brand-700 text-xs font-extrabold">
                    {toFa(3)}
                  </span>
                </div>
              </div>
            </div>

            {/* Exercise progress */}
            <div className="space-y-2 mb-5">
              {TODAY_EXERCISES.map((ex, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-white/10 backdrop-blur px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-extrabold ${ex.done === ex.sets ? 'bg-success-500' : 'bg-white/20'}`}>
                      {ex.done === ex.sets ? '✓' : toFa(i + 1)}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{ex.name}</p>
                      <p className="text-xs text-white/70">{toFa(ex.sets)} ست × {toFa(ex.reps)} تکرار · {ex.target}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white/80">{toFa(ex.done)}/{toFa(ex.sets)}</span>
                </div>
              ))}
            </div>

            <Link
              to="/patient/exercises"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 hover:bg-white/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              شروع تمرین امروز
            </Link>
          </div>

          {/* Therapist Badge */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              درمانگر اختصاصی شما
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white text-lg font-extrabold shadow-glow">
                {THERAPIST.avatar}
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{THERAPIST.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{THERAPIST.specialty}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">کد نظام پزشکی: {toFa(THERAPIST.medicalId)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to="/therapist/1"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 px-3 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-brand-300 transition-colors"
              >
                <Stethoscope className="h-3.5 w-3.5" />
                پروفایل
              </Link>
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-brand-700 transition-colors">
                <MessageSquare className="h-3.5 w-3.5" />
                پیام به درمانگر
              </button>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Activity, label: 'دقت میانگین هفته', value: '۹۱٪', color: 'text-success-600 dark:text-success-400' },
            { icon: ListChecks, label: 'تمرینات تکمیل‌شده', value: '۱۸/۲۱', color: 'text-brand-600 dark:text-brand-400' },
            { icon: Calendar, label: 'روزهای فعال', value: '۶ روز', color: 'text-accent-600 dark:text-accent-400' },
            { icon: Video, label: 'جلسات آنلاین', value: '۲ جلسه', color: 'text-warning-500 dark:text-warning-400' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
                <Icon className={`h-5 w-5 ${s.color} mb-2`} />
                <p className="text-xl font-extrabold text-slate-800 dark:text-slate-100">{s.value}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Calendar section */}
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            تقویم توانبخشی
          </h2>
        </div>
        <RehabCalendar />

        {/* Exercise library link */}
        <div className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
              <Video className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">کتابخانه تمرینات</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">ویدیوهای آموزشی و راهنمای اجرای صحیح تمرینات</p>
            </div>
          </div>
          <Link
            to="/patient/exercises"
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
          >
            مشاهده کتابخانه
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
