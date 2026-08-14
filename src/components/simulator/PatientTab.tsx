import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Send,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  UserCircle,
  Ruler,
} from 'lucide-react';
import { toFa } from '@/lib/fa';

type Exercise = {
  id: string;
  label: string;
  joint: 'knee' | 'shoulder' | 'pelvis';
  min: number;
  max: number;
  target: number;
  view: 'side' | 'front';
  viewLabel: string;
};

const EXERCISES: Exercise[] = [
  { id: 'knee', label: 'تمرین ۱: خم و راست کردن زانو (Knee Extension)', joint: 'knee', min: 90, max: 140, target: 135, view: 'side', viewLabel: 'لطفاً به صورت نیم‌رخ نسبت به دوربین در فاصله ۲ متری بایستید' },
  { id: 'shoulder', label: 'تمرین ۲: بالابردن بازو در شانه (Shoulder Abduction)', joint: 'shoulder', min: 30, max: 150, target: 140, view: 'front', viewLabel: 'لطفاً به صورت تمام‌رخ روبه‌روی دوربین قرار بگیرید' },
  { id: 'pelvis', label: 'تمرین ۳: پل زدن کمر (Pelvic Tilt)', joint: 'pelvis', min: 0, max: 45, target: 35, view: 'side', viewLabel: 'لطفاً به صورت نیم‌رخ نسبت به دوربین در فاصله ۲ متری بایستید' },
];

/* Angle gauge SVG */
function AngleGauge({ angle, min, max, target }: { angle: number; min: number; max: number; target: number }) {
  const startAngle = -90;
  const endAngle = 180;
  const pct = Math.max(0, Math.min(1, (angle - min) / (max - min)));
  const valueAngle = startAngle + pct * (endAngle - startAngle);
  const targetPct = (target - min) / (max - min);
  const targetAngle = startAngle + targetPct * (endAngle - startAngle);

  const polar = (a: number, r: number) => {
    const rad = (a * Math.PI) / 180;
    return { x: 100 + r * Math.cos(rad), y: 100 + r * Math.sin(rad) };
  };

  const arc = (a1: number, a2: number, r: number) => {
    const p1 = polar(a1, r);
    const p2 = polar(a2, r);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y}`;
  };

  const needle = polar(valueAngle, 70);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path d={arc(startAngle, endAngle, 80)} stroke="#e2e8f0" strokeWidth="10" fill="none" strokeLinecap="round" className="dark:stroke-slate-700" />
      <path d={arc(startAngle, valueAngle, 80)} stroke="url(#gaugeGrad)" strokeWidth="10" fill="none" strokeLinecap="round" />
      {(() => {
        const tp = polar(targetAngle, 90);
        return <circle cx={tp.x} cy={tp.y} r="4" fill="#f59e0b" />;
      })()}
      <line x1="100" y1="100" x2={needle.x} y2={needle.y} stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="100" r="8" fill="#0f766e" />
      <circle cx="100" cy="100" r="4" fill="#fff" />
      <text x="100" y="135" textAnchor="middle" fontSize="28" fontWeight="800" fill="#0f766e" fontFamily="Vazirmatn" className="dark:fill-brand-300">
        {toFa(Math.round(angle))}°
      </text>
      <text x="100" y="155" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="Vazirmatn" className="dark:fill-slate-400">
        زاویه فعلی
      </text>
      <defs>
        <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Full-body kinematic skeleton with 33-landmark structure + target joint highlight */
function PoseCanvas({ angle, joint }: { angle: number; joint: Exercise['joint'] }) {
  const cx = 150;
  const lm = {
    head: { x: cx, y: 18 },
    shoulderL: { x: cx - 30, y: 45 },
    shoulderR: { x: cx + 30, y: 45 },
    elbowL: { x: cx - 40, y: 72 },
    elbowR: { x: cx + 40, y: 72 },
    wristL: { x: cx - 46, y: 95 },
    wristR: { x: cx + 46, y: 95 },
    hipL: { x: cx - 20, y: 105 },
    hipR: { x: cx + 20, y: 105 },
    kneeL: { x: cx - 22, y: 145 },
    kneeR: { x: cx + 22, y: 145 },
    ankleL: { x: cx - 24, y: 185 },
    ankleR: { x: cx + 24, y: 185 },
    footL: { x: cx - 28, y: 192 },
    footR: { x: cx + 28, y: 192 },
  };

  const rad = (angle * Math.PI) / 180;
  const bones = [
    { a: 'head', b: 'shoulderL', target: false },
    { a: 'head', b: 'shoulderR', target: false },
    { a: 'shoulderL', b: 'shoulderR', target: false },
    { a: 'shoulderL', b: 'elbowL', target: false },
    { a: 'shoulderR', b: 'elbowR', target: joint === 'shoulder' },
    { a: 'elbowL', b: 'wristL', target: false },
    { a: 'elbowR', b: 'wristR', target: joint === 'shoulder' },
    { a: 'shoulderL', b: 'hipL', target: false },
    { a: 'shoulderR', b: 'hipR', target: false },
    { a: 'hipL', b: 'hipR', target: false },
    { a: 'hipL', b: 'kneeL', target: false },
    { a: 'hipR', b: 'kneeR', target: joint === 'knee' },
    { a: 'kneeL', b: 'ankleL', target: false },
    { a: 'ankleL', b: 'footL', target: false },
    { a: 'ankleR', b: 'footR', target: joint === 'knee' },
  ];

  // Compute dynamic positions based on joint
  const getPoint = (name: string) => {
    if (joint === 'knee' && name === 'ankleR') {
      return { x: lm.kneeR.x + Math.sin(rad) * 40, y: lm.kneeR.y + Math.cos(rad) * 40 };
    }
    if (joint === 'knee' && name === 'footR') {
      return { x: lm.kneeR.x + Math.sin(rad) * 40 - 4, y: lm.kneeR.y + Math.cos(rad) * 40 + 7 };
    }
    if (joint === 'shoulder' && name === 'elbowR') {
      return { x: lm.shoulderR.x + Math.sin(rad) * 30, y: lm.shoulderR.y + Math.cos(rad) * 30 };
    }
    if (joint === 'shoulder' && name === 'wristR') {
      return { x: lm.shoulderR.x + Math.sin(rad) * 60, y: lm.shoulderR.y + Math.cos(rad) * 60 };
    }
    if (joint === 'pelvis') {
      const tilt = Math.sin(rad) * 15;
      if (name === 'hipL') return { x: lm.hipL.x, y: lm.hipL.y + tilt };
      if (name === 'hipR') return { x: lm.hipR.x, y: lm.hipR.y - tilt };
    }
    return (lm as any)[name];
  };

  // Target joint name
  const targetJoint = joint === 'knee' ? 'kneeR' : joint === 'shoulder' ? 'shoulderR' : 'hipR';
  const targetAnkle = joint === 'knee' ? 'ankleR' : joint === 'shoulder' ? 'wristR' : 'hipL';

  return (
    <svg viewBox="0 0 300 210" className="absolute inset-0 h-full w-full">
      {/* non-target bones */}
      <g stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3">
        {bones.filter((b) => !b.target).map((b, i) => {
          const p1 = getPoint(b.a);
          const p2 = getPoint(b.b);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
        })}
      </g>
      {/* target bones */}
      <g stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" fill="none">
        {bones.filter((b) => b.target).map((b, i) => {
          const p1 = getPoint(b.a);
          const p2 = getPoint(b.b);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
        })}
      </g>
      {/* angle arc at target joint */}
      {(() => {
        const tp = getPoint(targetJoint);
        const arcR = 24;
        return (
          <>
            <path
              d={`M ${tp.x} ${tp.y - arcR} A ${arcR} ${arcR} 0 0 1 ${tp.x + Math.sin(rad) * arcR} ${tp.y + Math.cos(rad) * arcR}`}
              stroke="#22d3ee"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="4 3"
              opacity="0.9"
            />
            <text x={tp.x + 18} y={tp.y - 8} fill="#67e8f9" fontSize="11" fontWeight="800" fontFamily="monospace">
              θ={toFa(Math.round(angle))}°
            </text>
          </>
        );
      })()}
      {/* non-target joints */}
      {(Object.keys(lm) as (keyof typeof lm)[]).map((name) => {
        const isTarget = name === targetJoint || name === targetAnkle;
        if (isTarget) return null;
        const p = getPoint(name);
        return (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r="4" fill="#10b981" opacity="0.35" />
            <circle cx={p.x} cy={p.y} r="2.5" fill="#34d399" opacity="0.55" />
          </g>
        );
      })}
      {/* target joint - highlighted */}
      {(() => {
        const tp = getPoint(targetJoint);
        return (
          <g>
            <circle cx={tp.x} cy={tp.y} r="10" fill="#34d399" opacity="0.3">
              <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={tp.x} cy={tp.y} r="5" fill="#34d399" stroke="#fff" strokeWidth="1.5" />
          </g>
        );
      })()}
      {/* target end joint */}
      {(() => {
        const ep = getPoint(targetAnkle);
        return <circle cx={ep.x} cy={ep.y} r="5" fill="#34d399" stroke="#fff" strokeWidth="1.5" />;
      })()}
    </svg>
  );
}

export default function PatientTab() {
  const [exIdx, setExIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [angle, setAngle] = useState(118);
  const [reps, setReps] = useState(8);
  const [sets, setSets] = useState(2);
  const [quality, setQuality] = useState(94);
  const [feedback, setFeedback] = useState<{ type: 'good' | 'warn' | 'info'; text: string }>({
    type: 'good',
    text: 'عالی! زانو را ۳ درجه دیگر باز کنید و ۲ ثانیه نگه دارید.',
  });
  const [reportSent, setReportSent] = useState(false);
  const [inFrame, setInFrame] = useState(true);
  const dirRef = useRef(1);
  const ex = EXERCISES[exIdx];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setAngle((a) => {
        const next = a + dirRef.current * 2.5;
        if (next >= ex.max) {
          dirRef.current = -1;
          setFeedback({ type: 'warn', text: 'هشدار: سرعت حرکت زیاد است؛ ستون فقرات را صاف نگه دارید.' });
          setQuality((q) => Math.max(70, q - 1));
        } else if (next <= ex.min) {
          dirRef.current = 1;
          setReps((r) => {
            if (r >= 12) {
              setSets((s) => Math.min(3, s + 1));
              return 1;
            }
            return r + 1;
          });
          setFeedback({ type: 'good', text: 'عالی! زانو را ۳ درجه دیگر باز کنید و ۲ ثانیه نگه دارید.' });
          setQuality((q) => Math.min(99, q + 2));
        } else if (next > ex.target - 5 && next < ex.target + 5) {
          setFeedback({ type: 'good', text: 'عالی! در محدوده هدف هستید؛ فرم حرکت بسیار خوب است.' });
        }
        return next;
      });
      // Simulate in-frame check
      setInFrame(Math.random() > 0.05);
    }, 100);
    return () => clearInterval(id);
  }, [running, ex]);

  const switchEx = (idx: number) => {
    setExIdx(idx);
    setAngle(EXERCISES[idx].min + 20);
    setReps(0);
    setSets(0);
    setQuality(90);
    setRunning(false);
    dirRef.current = 1;
  };

  const sendReport = () => {
    setReportSent(true);
    setTimeout(() => setReportSent(false), 3000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Camera canvas */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-900 overflow-hidden shadow-xl">
        {/* Orientation HUD */}
        <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-xs font-bold text-brand-300">
              <span className={`h-2.5 w-2.5 rounded-full ${running ? 'bg-success-500 animate-pulse' : 'bg-slate-500'}`} />
              {running ? 'دوربین فعال · پایش زنده' : 'دوربین متوقف'}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Camera className="h-3.5 w-3.5" /> شبیه‌ساز دوربین
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-accent-500/15 border border-accent-500/30 px-3 py-2">
            <Ruler className="h-3.5 w-3.5 text-accent-300 shrink-0" />
            <p className="text-[11px] font-medium text-accent-200">{ex.viewLabel}</p>
          </div>
        </div>
        <div className="relative aspect-[5/4] bg-gradient-to-b from-slate-800 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.1),transparent_65%)]" />
          <div className="absolute inset-x-0 top-0 h-0.5 bg-brand-400/50 animate-scan" />
          {/* framing silhouette guide */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg viewBox="0 0 100 200" className="h-full">
              <ellipse cx="50" cy="20" rx="10" ry="13" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="32" y="33" width="36" height="55" rx="6" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="35" y="88" width="12" height="45" rx="4" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <rect x="53" y="88" width="12" height="45" rx="4" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          </div>
          <div className="absolute inset-0 p-4">
            <PoseCanvas angle={angle} joint={ex.joint} />
          </div>
          {/* in-frame warning */}
          {!inFrame && running && (
            <div className="absolute inset-0 grid place-items-center bg-slate-950/60 backdrop-blur-sm">
              <div className="text-center">
                <AlertTriangle className="h-10 w-10 text-warning-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-warning-300">شما خارج از کادر هستید</p>
                <p className="text-xs text-slate-400 mt-1">لطفاً در فاصله مناسب قرار بگیرید</p>
              </div>
            </div>
          )}
          {/* corner brackets */}
          <div className="absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-brand-400/60 rounded-tl-lg" />
          <div className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-brand-400/60 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-brand-400/60 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-brand-400/60 rounded-br-lg" />
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        {/* Exercise selector */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">انتخاب تمرین</label>
          <div className="space-y-2">
            {EXERCISES.map((e, i) => (
              <button
                key={e.id}
                onClick={() => switchEx(i)}
                className={`w-full rounded-xl border-2 px-4 py-3 text-right text-sm font-medium transition-all ${
                  exIdx === i
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center justify-between">
                  {e.label}
                  {exIdx === i && <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gauge + counters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">ردیاب زاویه</p>
            <div className="aspect-square">
              <AngleGauge angle={angle} min={ex.min} max={ex.max} target={ex.target} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">کیفیت حرکت</p>
              <p className={`text-2xl font-extrabold ${quality >= 90 ? 'text-success-600' : quality >= 75 ? 'text-warning-500' : 'text-alert-500'}`}>
                {toFa(quality)}٪
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{quality >= 90 ? 'عالی' : quality >= 75 ? 'متوسط' : 'نیاز به اصلاح'}</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${quality >= 90 ? 'bg-success-500' : quality >= 75 ? 'bg-warning-500' : 'bg-alert-500'}`}
                  style={{ width: `${quality}%` }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">تکرار و ست</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-extrabold text-accent-600 dark:text-accent-400">{toFa(reps)}</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-1">از ۱۲</p>
              </div>
              <div className="mt-1 flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <span key={s} className={`h-2 flex-1 rounded-full ${sets >= s ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">ست: {toFa(sets)} از ۳</p>
            </div>
          </div>
        </div>

        {/* Feedback banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={feedback.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-2xl p-4 flex items-start gap-3 ${
              feedback.type === 'good'
                ? 'bg-success-50 border border-success-200 dark:bg-success-900/20 dark:border-success-800'
                : feedback.type === 'warn'
                ? 'bg-warning-50 border border-warning-200 dark:bg-warning-900/20 dark:border-warning-800'
                : 'bg-accent-50 border border-accent-200 dark:bg-accent-900/20 dark:border-accent-800'
            }`}
          >
            {feedback.type === 'good' ? (
              <CheckCircle2 className="h-5 w-5 text-success-600 dark:text-success-400 shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-warning-600 dark:text-warning-400 shrink-0" />
            )}
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{feedback.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Action controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-shadow ${
              running ? 'bg-alert-500 hover:bg-alert-600' : 'bg-brand-600 hover:bg-brand-700 shadow-glow'
            }`}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {running ? 'توقف موقت' : 'شروع تمرین'}
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setReps(0);
              setSets(0);
              setAngle(ex.min + 20);
              setQuality(90);
              dirRef.current = 1;
            }}
            className="flex items-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
          >
            <RotateCcw className="h-4 w-4" />
            بازنشانی
          </button>
          <button
            onClick={sendReport}
            className="flex items-center gap-2 rounded-xl border-2 border-brand-600 px-5 py-3 text-sm font-bold text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-slate-800"
          >
            <Send className="h-4 w-4" />
            {reportSent ? 'گزارش ارسال شد ✓' : 'ارسال گزارش به فیزیوتراپ'}
          </button>
        </div>
      </div>
    </div>
  );
}
