import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Send,
  Stethoscope,
  Calendar,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { toFa } from '@/lib/fa';

const ROM_DATA = [
  { day: 'روز ۱', rom: 80, target: 90 },
  { day: 'روز ۲', rom: 83, target: 92 },
  { day: 'روز ۳', rom: 87, target: 95 },
  { day: 'روز ۴', rom: 90, target: 98 },
  { day: 'روز ۵', rom: 95, target: 100 },
  { day: 'روز ۶', rom: 98, target: 103 },
  { day: 'روز ۷', rom: 105, target: 108 },
  { day: 'روز ۸', rom: 110, target: 112 },
  { day: 'روز ۹', rom: 115, target: 118 },
  { day: 'روز ۱۰', rom: 122, target: 122 },
  { day: 'روز ۱۱', rom: 126, target: 126 },
  { day: 'روز ۱۲', rom: 130, target: 130 },
  { day: 'روز ۱۳', rom: 133, target: 133 },
  { day: 'روز ۱۴', rom: 135, target: 135 },
];

const SESSION_DATA = [
  { day: 'د', sessions: 2 },
  { day: 'س', sessions: 3 },
  { day: 'چ', sessions: 2 },
  { day: 'پ', sessions: 3 },
  { day: 'ج', sessions: 2 },
  { day: 'ش', sessions: 3 },
  { day: 'ی', sessions: 3 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {toFa(p.value)}°
        </p>
      ))}
    </div>
  );
}

export default function PhysioTab() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Patient card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-gradient-to-l from-brand-50 to-white dark:from-brand-900/20 dark:to-slate-800 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white text-lg font-extrabold shadow-glow">
              م
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">بیمار: مریم علوی</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">وضعیت: بازتوانی پس از جراحی رباط صلیبی (ACL) - هفته سوم</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 border border-success-200 dark:bg-success-900/20 dark:border-success-800 px-3 py-1.5 text-xs font-bold text-success-700 dark:text-success-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> در روند بهبودی
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 border border-accent-200 dark:bg-accent-900/20 dark:border-accent-800 px-3 py-1.5 text-xs font-bold text-accent-700 dark:text-accent-400">
              <Calendar className="h-3.5 w-3.5" /> هفته ۳ از ۱۲
            </span>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* ROM chart */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                روند بهبود دامنه حرکت (ROM) - ۱۴ روز گذشته
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">از ۸۰° تا ۱۳۵° - بهبود ٪۶۹</p>
            </div>
            <span className="rounded-lg bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-bold text-brand-700 dark:text-brand-300">
              {toFa(135)}° فعلی
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={ROM_DATA} margin={{ top: 10, right: 5, left: 5, bottom: 10 }}>
                <defs>
                  <linearGradient id="romFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-700" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} stroke="#94a3b8" />
                <YAxis domain={[70, 150]} tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => toFa(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rom" stroke="none" fill="url(#romFill)" />
                <Line type="monotone" dataKey="rom" stroke="#0d9488" strokeWidth={3} dot={{ r: 4, fill: '#0d9488' }} activeDot={{ r: 6 }} name="ROM بیمار" />
                <Line type="monotone" dataKey="target" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" dot={false} name="هدف درمانی" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance + sessions */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              میزان پایبندی به تمرینات
            </h4>
            <div className="flex items-center gap-4">
              <div className="relative grid place-items-center">
                <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="10" className="dark:stroke-slate-700" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${92 * 3.14} ${100 * 3.14}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-2xl font-extrabold text-success-600 dark:text-success-400">{toFa(92)}٪</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">بالا</p>
                </div>
              </div>
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">تمرینات انجام شده</span><span className="font-bold text-slate-700 dark:text-slate-200">{toFa(38)} از ۴۲</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">میانگین کیفیت</span><span className="font-bold text-slate-700 dark:text-slate-200">{toFa(91)}٪</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">روزهای فعال</span><span className="font-bold text-slate-700 dark:text-slate-200">{toFa(13)} روز</span></div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-3">جلسات هفته اخیر</h4>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={SESSION_DATA}>
                  <Bar dataKey="sessions" fill="#06b6d4" radius={[4, 4, 0, 0]} name="جلسات" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} stroke="#94a3b8" />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} content={({ active, payload, label }: any) => active && payload?.length ? (
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs shadow">{label}: {toFa(payload[0].value)} جلسه</div>
                  ) : null} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* AI flags + message */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-warning-200 dark:border-warning-800 bg-warning-50/50 dark:bg-warning-900/20 p-5">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-warning-600 dark:text-warning-400" />
            هشدارهای هوش مصنوعی
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-white dark:bg-slate-800 p-3 border border-warning-100 dark:border-warning-900">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warning-100 dark:bg-warning-900/40 text-warning-600 dark:text-warning-400 text-xs font-extrabold">۲</span>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">۲ حرکت اشتباه در جلسه دیروز تشخیص داده شد</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">فشار زیاد به مفصل زانو در زاویه ۱۳۸° - توصیه: کاهش سرعت باز شدن زانو</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white dark:bg-slate-800 p-3 border border-accent-100 dark:border-accent-900">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-100 dark:bg-accent-900/40 text-accent-600 dark:text-accent-400 text-xs font-extrabold">۱</span>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">۱ جلسه با تاخیر انجام شد</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">جلسه صبح روز گذشته - شیفت به بعدازظهر</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            ارتباط با بیمار
          </h4>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام متنی یا یادداشت صوتی برای بیمار بنویسید..."
            rows={4}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-3 text-sm resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/40 outline-none text-slate-700 dark:text-slate-200"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={sendMessage}
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700 shadow-glow"
            >
              <Send className="h-4 w-4" />
              {sent ? 'ارسال شد ✓' : 'ارسال پیام'}
            </button>
            <button className="flex items-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-brand-300">
              <Stethoscope className="h-4 w-4" />
              اصلاح برنامه تمرینی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
