import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  Send,
  RotateCcw,
  Brain,
  Clock,
} from 'lucide-react';
import { toFa } from '@/lib/fa';

type BodyPart = { id: string; label: string; icon: string };
const PARTS: BodyPart[] = [
  { id: 'knee', label: 'زانو', icon: '🦵' },
  { id: 'shoulder', label: 'شانه و گردن', icon: '🤸' },
  { id: 'back', label: 'کمر و ستون فقرات', icon: '🧍' },
  { id: 'ankle', label: 'مچ و پا', icon: '🦶' },
];

const DURATIONS = ['زیر ۲ هفته', '۲ هفته تا ۳ ماه', 'مزمن بالای ۳ ماه'];

const RECOMMENDATIONS: Record<string, string> = {
  knee: 'بر اساس علائم شما، توصیه می‌شود برنامه تمرینی کم‌تأثیر با تمرکز بر تقویت عضلات چهارسر رأس و همسترینگ آغاز شود. پایش زاویه زانو با هوش مصنوعی می‌تواند روند بهبودی را تسریع کند.',
  shoulder: 'آسیب شانه و گردن نیازمند تمرینات دامنه حرکتی تدریجی است. فیزیوآی می‌تواند زوایای حرکت شانه را در هر جلسه پایش کرده و از بدتر شدن وضعیت جلوگیری کند.',
  back: 'برای درد کمر، تمرینات پایداری ستون فقرات و کشش ملایم توصیه می‌شود. پایش فرم حرکتی با هوش مصنوعی از آسیب‌های ناشی از تمرین نادرست جلوگیری می‌کند.',
  ankle: 'مچ و پا نیازمند تمرینات تعادلی و تقویتی است. فیزیوآی می‌تواند دامنه حرکت و کیفیت تمرین را به‌صورت روزانه پایش کند.',
};

export default function Triage() {
  const [step, setStep] = useState(1);
  const [part, setPart] = useState<string>('');
  const [pain, setPain] = useState(5);
  const [duration, setDuration] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const reset = () => {
    setStep(1);
    setPart('');
    setPain(5);
    setDuration(0);
    setName('');
    setPhone('');
    setSubmitted(false);
  };

  const submit = () => {
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const painColor = pain <= 3 ? 'text-success-600' : pain <= 6 ? 'text-warning-500' : 'text-alert-500';
  const painLabel = pain <= 3 ? 'خفیف' : pain <= 6 ? 'متوسط' : 'شدید';

  return (
    <section id="triage" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-800 px-3 py-1.5 text-xs font-bold text-accent-700 dark:text-accent-300">
            <Brain className="h-3.5 w-3.5" />
            ارزیابی هوشمند آسیب
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            ارزیابی رایگان <span className="gradient-text">۳ دقیقه‌ای</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">در چند گام ساده، ناحیه آسیب‌دیده خود را مشخص کنید و برنامه درمانی پیشنهادی دریافت کنید.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold transition-all ${
                  step >= s ? 'bg-brand-600 text-white shadow-glow' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : toFa(s)}
              </div>
              {s < 3 && <div className={`h-1 w-12 sm:w-24 rounded-full transition-all ${step > s ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/20 p-6 sm:p-8 min-h-[340px]">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-1">ناحیه آسیب‌دیده را انتخاب کنید</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">کدام بخش از بدن شما درگیر است؟</p>
                <div className="grid grid-cols-2 gap-3">
                  {PARTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPart(p.id)}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-5 text-right transition-all ${
                        part === p.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-md'
                          : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <span className="text-3xl">{p.icon}</span>
                      <span className={`text-sm font-bold ${part === p.id ? 'text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-200'}`}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-1">شدت و مدت درد</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">میزان درد و مدت زمانی که با آن درگیر بوده‌اید را مشخص کنید.</p>

                {/* Pain slider */}
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-5 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">مقیاس درد</span>
                    <span className={`text-2xl font-extrabold ${painColor}`}>
                      {toFa(pain)} <span className="text-sm font-medium">/ ۱۰</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={pain}
                    onChange={(e) => setPain(+e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-400 dark:text-slate-500">
                    <span>بدون درد</span>
                    <span className={painColor}>{painLabel}</span>
                    <span>تحمل‌ناپذیر</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-2 block">مدت زمان درد</span>
                  <div className="grid grid-cols-3 gap-2">
                    {DURATIONS.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setDuration(i)}
                        className={`rounded-xl border-2 px-3 py-3 text-xs font-bold transition-all ${
                          duration === i ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {!submitted ? (
                  <>
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                      توصیه هوش مصنوعی
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">بر اساس پاسخ‌های شما:</p>

                    {/* Summary */}
                    <div className="rounded-2xl bg-gradient-to-l from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border border-brand-200 dark:border-brand-800 p-4 mb-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-bold text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                          ناحیه: {PARTS.find((p) => p.id === part)?.label || '—'}
                        </span>
                        <span className="rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-bold text-warning-600 dark:text-warning-400 border border-warning-200 dark:border-warning-800">
                          درد: {toFa(pain)}/۱۰ ({painLabel})
                        </span>
                        <span className="rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-bold text-accent-700 dark:text-accent-300 border border-accent-200 dark:border-accent-800">
                          مدت: {DURATIONS[duration]}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {RECOMMENDATIONS[part] || 'بر اساس ارزیابی شما، یک برنامه درمانی شخصی‌سازی‌شده آماده می‌شود.'}
                      </p>
                    </div>

                    {/* Form */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">نام و نام خانوادگی</label>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 dark:focus:ring-brand-900/40">
                          <User className="h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="مثلاً: علی رضایی"
                            className="w-full bg-transparent py-3 text-sm outline-none text-slate-700 dark:text-slate-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">شماره موبایل</label>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 dark:focus:ring-brand-900/40">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                            className="w-full bg-transparent py-3 text-sm outline-none text-slate-700 dark:text-slate-200"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400 mb-5">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">درخواست شما ثبت شد!</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      کارشناسان فیزیوآی در اولین فرصت با شما تماس می‌گیرند و برنامه درمانی شخصی‌سازی‌شده‌تان را ارائه می‌دهند.
                    </p>
                    <button
                      onClick={reset}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-brand-300"
                    >
                      <RotateCcw className="h-4 w-4" />
                      ارزیابی مجدد
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          {!submitted && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={prev}
                disabled={step === 1}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" />
                مرحله قبل
              </button>
              {step < 3 ? (
                <button
                  onClick={next}
                  disabled={(step === 1 && !part) || (step === 2 && !duration && duration !== 0)}
                  className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-700 shadow-glow disabled:opacity-50 disabled:shadow-none"
                >
                  مرحله بعد
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!name.trim() || !phone.trim()}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-600 to-accent-500 px-6 py-2.5 text-sm font-bold text-white shadow-glow hover:shadow-glow-lg disabled:opacity-50 disabled:shadow-none"
                >
                  <Send className="h-4 w-4" />
                  دریافت برنامه درمانی و مشاوره رایگان
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
