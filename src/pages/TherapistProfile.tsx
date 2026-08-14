import { Link, useParams } from 'react-router-dom';
import { Star, ShieldCheck, Award, Building2, Calendar, MessageSquare, ChevronRight, CheckCircle2 } from 'lucide-react';
import { toFa } from '@/lib/fa';

const THERAPISTS: Record<string, {
  name: string;
  specialty: string;
  medicalId: string;
  clinic: string;
  bio: string;
  rating: number;
  reviews: { name: string; text: string; stars: number }[];
  specialties: string[];
}> = {
  '1': {
    name: 'دکتر سارا علوی',
    specialty: 'متخصص ارتوپدی و آسیب‌های ورزشی',
    medicalId: '۱۲۳۴۵',
    clinic: 'کلینیک توانبخشی پارس، تهران',
    bio: 'بورد تخصصی ارتوپدی از دانشگاه علوم پزشکی تهران با بیش از ۱۲ سال تجربه در زمینه بازتوانی پس از جراحی‌های ACL، آسیب‌های ورزشی و توانبخشی اندام تحتانی. عضو انجمن فیزیوتراپیست‌های ایران.',
    rating: 4.8,
    reviews: [
      { name: 'مریم ا.', text: 'بعد از جراحی ACL با راهنمایی دکتر علوی روند بهبودی بسیار سریع‌تر از انتظار پیش رفت.', stars: 5 },
      { name: 'علی ر.', text: 'برنامه تمرینی بسیار دقیق و شخصی‌سازی شده بود. توصیه می‌کنم.', stars: 5 },
      { name: 'زهرا ک.', text: 'ارتباط آنلاین و پیگیری مستمر عالی بود.', stars: 4 },
    ],
    specialties: ['ارتوپدی', 'آسیب‌های ورزشی', 'بازتوانی ACL', 'اندام تحتانی'],
  },
  default: {
    name: 'دکتر امیر حسینی',
    specialty: 'متخصص فیزیوتراپی و سالمندان',
    medicalId: '۶۷۸۹۰',
    clinic: 'مرکز توانبخشی آرامش، اصفهان',
    bio: 'متخصص فیزیوتراپی با تمرکز بر بازتوانی سالمندان، اختلالات تعادلی و دردهای مزمن ستون فقرات.',
    rating: 4.6,
    reviews: [
      { name: 'نادر م.', text: 'برنامه درمانی برای کمردد مزمن من بسیار موثر بود.', stars: 5 },
    ],
    specialties: ['سالمندان', 'ستون فقرات', 'اختلالات تعادلی'],
  },
};

export default function TherapistProfile() {
  const { id } = useParams();
  const data = THERAPISTS[id || '1'] || THERAPISTS.default;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/patient/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4">
          <ChevronRight className="h-4 w-4" />
          بازگشت
        </Link>

        {/* Profile header */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-l from-brand-600 to-accent-500" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-brand-600 to-accent-500 text-white text-3xl font-extrabold shadow-glow ring-4 ring-white dark:ring-slate-800">
                {data.name.charAt(data.name.indexOf(' ') + 1)}
              </div>
              <div className="flex-1 pt-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{data.name}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{data.specialty}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/30 px-2.5 py-1 font-bold text-brand-700 dark:text-brand-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    کد نظام پزشکی: {toFa(data.medicalId)}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Building2 className="h-3.5 w-3.5" />
                    {data.clinic}
                  </span>
                  <span className="flex items-center gap-1 text-warning-500 font-bold">
                    <Star className="h-3.5 w-3.5 fill-warning-500" />
                    {toFa(data.rating)}
                  </span>
                </div>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-600 to-accent-500 px-6 py-3 text-sm font-bold text-white shadow-glow hover:shadow-glow-lg transition-shadow">
                <Calendar className="h-4 w-4" />
                درخواست ویزیت و ارزیابی اولیه
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bio + specialties */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                درباره درمانگر
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{data.bio}</p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3">تخصص‌ها</h2>
              <div className="flex flex-wrap gap-2">
                {data.specialties.map((s, i) => (
                  <span key={i} className="rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 px-3 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-warning-500 fill-warning-500" />
                نظرات بیماران
              </h2>
              <div className="space-y-4">
                {data.reviews.map((r, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{r.name}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className={`h-3.5 w-3.5 ${s < r.stars ? 'text-warning-500 fill-warning-500' : 'text-slate-300 dark:text-slate-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3">اطلاعات تماس</h3>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700 mb-2">
                <MessageSquare className="h-4 w-4" />
                پیام به درمانگر
              </button>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-brand-300">
                <Calendar className="h-4 w-4" />
                رزرو نوبت آنلاین
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3">آمار درمانگر</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">بیماران فعال</span><span className="font-bold text-slate-700 dark:text-slate-200">{toFa(48)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">میانگین امتیاز</span><span className="font-bold text-warning-500">{toFa(data.rating)} از ۵</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">سابقه فعالیت</span><span className="font-bold text-slate-700 dark:text-slate-200">{toFa(12)} سال</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">نرخ موفقیت درمان</span><span className="font-bold text-success-600 dark:text-success-400">{toFa(94)}٪</span></div>
              </div>
            </div>

            <div className="rounded-3xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  این درمانگر دارای تاییدیه نظام پزشکی و پروفایل احراز هویت شده در فیزیوآی می‌باشد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
