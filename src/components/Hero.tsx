import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Activity, Camera, CheckCircle2, TrendingUp, ArrowLeft, ShieldCheck, Stethoscope, MessageCircle } from 'lucide-react';
import { toFa } from '@/lib/fa';
import { useCountUp } from '@/lib/useCountUp';

/* Full-body kinematic skeleton overlay with 33-landmark structure */
function SkeletonOverlay({ angle }: { angle: number }) {
  const cx = 150;
  // Full body landmarks (simplified from 33-point MediaPipe)
  const landmarks = {
    head: { x: cx, y: 30 },
    shoulderL: { x: cx - 32, y: 65 },
    shoulderR: { x: cx + 32, y: 65 },
    elbowL: { x: cx - 42, y: 95 },
    elbowR: { x: cx + 42, y: 95 },
    wristL: { x: cx - 48, y: 120 },
    wristR: { x: cx + 48, y: 120 },
    hipL: { x: cx - 22, y: 130 },
    hipR: { x: cx + 22, y: 130 },
    kneeL: { x: cx - 24, y: 170 },
    kneeR: { x: cx + 24, y: 170 },
    ankleL: { x: cx - 26, y: 210 },
    ankleR: { x: cx + 26, y: 210 },
    footL: { x: cx - 30, y: 218 },
    footR: { x: cx + 30, y: 218 },
  };

  // Target joint = right knee; animate shin based on angle
  const rad = (angle * Math.PI) / 180;
  const shinEndX = landmarks.kneeR.x + Math.sin(rad) * 42;
  const shinEndY = landmarks.kneeR.y + Math.cos(rad) * 42;

  // Bone connections
  const bones = [
    { a: 'head', b: 'shoulderL' },
    { a: 'head', b: 'shoulderR' },
    { a: 'shoulderL', b: 'shoulderR' },
    { a: 'shoulderL', b: 'elbowL' },
    { a: 'shoulderR', b: 'elbowR' },
    { a: 'elbowL', b: 'wristL' },
    { a: 'elbowR', b: 'wristR' },
    { a: 'shoulderL', b: 'hipL' },
    { a: 'shoulderR', b: 'hipR' },
    { a: 'hipL', b: 'hipR' },
    { a: 'hipL', b: 'kneeL' },
    { a: 'hipR', b: 'kneeR' },
    { a: 'kneeL', b: 'ankleL' },
    { a: 'ankleL', b: 'footL' },
    { a: 'ankleR', b: 'footR' },
  ];

  const getPoint = (name: string) => {
    if (name === 'kneeR') return { x: landmarks.kneeR.x, y: landmarks.kneeR.y };
    if (name === 'ankleR') return { x: shinEndX, y: shinEndY };
    return (landmarks as any)[name];
  };

  return (
    <svg viewBox="0 0 300 240" className="absolute inset-0 h-full w-full">
      {/* non-target bones */}
      <g stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35">
        {bones.map((b, i) => {
          const p1 = getPoint(b.a);
          const p2 = getPoint(b.b);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
        })}
      </g>
      {/* target joint bones (hipR -> kneeR -> ankleR) */}
      <g stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <line x1={landmarks.hipR.x} y1={landmarks.hipR.y} x2={landmarks.kneeR.x} y2={landmarks.kneeR.y} />
        <line x1={landmarks.kneeR.x} y1={landmarks.kneeR.y} x2={shinEndX} y2={shinEndY} />
      </g>
      {/* angle arc at target joint */}
      <path
        d={`M ${landmarks.kneeR.x} ${landmarks.kneeR.y - 28} A 28 28 0 0 1 ${landmarks.kneeR.x + Math.sin(rad) * 28} ${landmarks.kneeR.y + Math.cos(rad) * 28}`}
        stroke="#22d3ee"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="4 3"
        opacity="0.9"
      />
      <text
        x={landmarks.kneeR.x + 22}
        y={landmarks.kneeR.y - 10}
        fill="#67e8f9"
        fontSize="12"
        fontWeight="800"
        fontFamily="monospace"
      >
        θ={toFa(Math.round(angle))}°
      </text>
      {/* non-target joints */}
      {(Object.entries(landmarks) as [string, { x: number; y: number }][]).map(([name, p]) => {
        const isTarget = name === 'kneeR';
        if (isTarget) return null;
        return (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r="4" fill="#10b981" opacity="0.4" />
            <circle cx={p.x} cy={p.y} r="2.5" fill="#34d399" opacity="0.6" />
          </g>
        );
      })}
      {/* target joint - highlighted */}
      <g>
        <circle cx={landmarks.kneeR.x} cy={landmarks.kneeR.y} r="10" fill="#34d399" opacity="0.3">
          <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={landmarks.kneeR.x} cy={landmarks.kneeR.y} r="5" fill="#34d399" stroke="#fff" strokeWidth="1.5" />
      </g>
      {/* ankle target */}
      <g>
        <circle cx={shinEndX} cy={shinEndY} r="5" fill="#34d399" stroke="#fff" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function PhoneMockup() {
  const [angle, setAngle] = useState(118);
  const [reps, setReps] = useState(8);
  const [posture, setPosture] = useState<'good' | 'warn'>('good');

  useEffect(() => {
    let dir = 1;
    const id = setInterval(() => {
      setAngle((a) => {
        const next = a + dir * 3;
        if (next >= 140) dir = -1;
        if (next <= 95) {
          dir = 1;
          setReps((r) => (r >= 12 ? 1 : r + 1));
        }
        setPosture(next > 100 && next < 138 ? 'good' : 'warn');
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      <div className="absolute -inset-6 bg-gradient-to-tr from-brand-500/20 via-accent-500/20 to-transparent rounded-[3rem] blur-2xl" />
      <div className="relative rounded-[2.5rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 h-6 w-32 rounded-b-2xl bg-slate-900" />
        <div className="relative aspect-[9/19] bg-gradient-to-b from-slate-800 to-slate-950 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.08),transparent_60%)]" />
          <div className="absolute inset-x-0 top-0 h-0.5 bg-brand-400/60 animate-scan" />
          {/* Orientation HUD */}
          <div className="absolute top-7 inset-x-0 flex items-center justify-between px-3 z-10">
            <span className="flex items-center gap-1 text-[9px] font-bold text-brand-300">
              <span className="h-2 w-2 rounded-full bg-success-500 animate-pulse" />
              زنده · نیم‌رخ
            </span>
            <span className="rounded bg-accent-500/20 px-1.5 py-0.5 text-[8px] text-accent-300 font-bold">۲ متر فاصله</span>
          </div>
          {/* silhouette frame guide */}
          <div className="absolute inset-0 flex items-center justify-center pt-10 opacity-20">
            <svg viewBox="0 0 100 200" className="h-full">
              <ellipse cx="50" cy="25" rx="12" ry="15" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="30" y="40" width="40" height="60" rx="8" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="35" y="100" width="12" height="50" rx="4" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="53" y="100" width="12" height="50" rx="4" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          </div>
          {/* skeleton */}
          <div className="absolute inset-0 pt-10">
            <SkeletonOverlay angle={angle} />
          </div>
          {/* posture guide */}
          <div
            className={`absolute top-14 right-3 rounded-lg px-2 py-1 text-[9px] font-bold ${
              posture === 'good'
                ? 'bg-success-500/20 text-success-400'
                : 'bg-warning-500/20 text-warning-400'
            }`}
          >
            {posture === 'good' ? '✓ فرم صحیح' : '⚠ اصلاح وضعیت'}
          </div>
          {/* bottom panel */}
          <div className="absolute bottom-0 inset-x-0 glass-dark p-3 space-y-2">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-[10px] text-slate-400">تمرین ۱</p>
                <p className="text-xs font-bold">خم و راست کردن زانو</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400">زوایا</p>
                <p className="text-lg font-extrabold text-brand-300">{toFa(Math.round(angle))}°</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 rounded-lg bg-slate-800/80 px-2 py-1.5">
                <p className="text-[9px] text-slate-400">کیفیت</p>
                <p className="text-xs font-bold text-success-400">٪۹۴ عالی</p>
              </div>
              <div className="flex-1 rounded-lg bg-slate-800/80 px-2 py-1.5">
                <p className="text-[9px] text-slate-400">تکرار</p>
                <p className="text-xs font-bold text-accent-300">{toFa(reps)} از ۱۲</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const METRICS = [
  { value: 65, suffix: '٪', label: 'کاهش هزینه درمان' },
  { value: 98, suffix: '٪', label: 'دقت پایش زوایا' },
  { value: 24, suffix: '/۷', label: 'ارتباط با درمانگر' },
];

const TRUST = [
  { icon: ShieldCheck, label: 'تاییدیه نظام پزشکی' },
  { icon: MessageCircle, label: 'چت و ویزیت آنلاین با درمانگر' },
  { icon: Activity, label: 'پایش بیومکانیکال زنده' },
];

export default function Hero() {
  const m1 = useCountUp(65);
  const m2 = useCountUp(98);

  return (
    <section id="how" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 dark:pt-16">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/20" />
      <div className="absolute top-40 -left-24 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
              <Sparkles className="h-3.5 w-3.5" />
              پلتفرم هوشمند فیزیوتراپی در منزل با هوش مصنوعی
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.2] text-balance">
              توانبخشی تخصصی در منزل،
              <br className="hidden sm:block" />
              تحت <span className="gradient-text">نظارت مستقیم فیزیوتراپیست</span> شما
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              برنامه درمانی اختصاصی و ارتباط پیوسته با درمانگر، همراه با دستیار هوشمند پایش زوایا و تصحیح حرکات با دوربین.
            </p>

            {/* Trust highlights */}
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-3">
              {TRUST.map((t, i) => {
                const Icon = t.icon;
                return (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                    {t.label}
                  </span>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#triage"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-600 to-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-glow hover:shadow-glow-lg transition-shadow"
              >
                شروع ارزیابی آنلاین ۳ دقیقه‌ای
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </a>
              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-600 transition-colors"
              >
                <Play className="h-4 w-4" />
                مشاهده شبیه‌ساز زنده تمرین
              </a>
            </div>

            {/* metrics */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
              {METRICS.map((m, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white/60 p-3 text-center dark:border-slate-700 dark:bg-slate-800/50">
                  <p className="text-2xl font-extrabold gradient-text">
                    {toFa(Math.round(i === 0 ? m1 : i === 1 ? m2 : m.value))}
                    {m.suffix}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* trust row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-brand-500" /> پایش بلادرنگ زوایای مفصل</span>
          <span className="flex items-center gap-1.5"><Activity className="h-4 w-4 text-brand-500" /> گزارش کیفی خودکار</span>
          <span className="flex items-center gap-1.5"><Camera className="h-4 w-4 text-brand-500" /> بدون سنسور اضافی</span>
          <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-brand-500" /> پیگیری روند بهبودی</span>
        </div>
      </div>
    </section>
  );
}
