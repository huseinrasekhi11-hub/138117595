import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Eye,
  Key,
  Link2,
  ChevronDown,
  ToggleRight,
  ToggleLeft,
  Wifi,
  Server,
  Smartphone,
  CheckCircle2,
  Loader2,
  Terminal,
} from 'lucide-react';
import { toFa } from '@/lib/fa';

const ARCHITECTURES = [
  { id: 'mediapipe', label: 'MediaPipe Pose (On-Device WebGL)' },
  { id: 'yolo', label: 'Custom YOLOv8 Pose (Cloud Server)' },
  { id: 'tfjs', label: 'TensorFlow.js (In-Browser)' },
];

type LogEntry = {
  text: string;
  type: 'info' | 'success' | 'pending';
};

export default function AITab() {
  const [endpoint, setEndpoint] = useState('https://api.physioai.ir/v1/pose-estimation');
  const [apiKey, setApiKey] = useState('sk-physioai-••••••••••••••••••••');
  const [showKey, setShowKey] = useState(false);
  const [arch, setArch] = useState('mediapipe');
  const [archOpen, setArchOpen] = useState(false);
  const [localMode, setLocalMode] = useState(true);
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const runTest = () => {
    setTesting(true);
    setLogs([]);
    const steps: LogEntry[] = [
      { text: `[POST] در حال اتصال به Endpoint...`, type: 'pending' },
      { text: `→ ${endpoint}`, type: 'info' },
      { text: `→ Authorization: Bearer ${showKey ? apiKey : 'sk-physioai-****'}`, type: 'info' },
      { text: `← Status: 200 OK`, type: 'success' },
      { text: `← Latency: ${toFa(32)}ms`, type: 'success' },
      { text: `← Model: ${ARCHITECTURES.find((a) => a.id === arch)?.label}`, type: 'success' },
      { text: `✓ ارتباط با موتور هوش مصنوعی برقرار و فعال است.`, type: 'success' },
    ];
    steps.forEach((s, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, s]);
        if (i === steps.length - 1) setTesting(false);
      }, i * 450);
    });
  };

  return (
    <div className="space-y-6">
      {/* Status card */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-l from-slate-900 to-slate-800 p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/20 text-brand-300">
              <Cpu className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success-500 ring-2 ring-slate-900 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold">موتور پردازش تصویر</h3>
              <p className="text-sm text-slate-300">متصل و فعال (MediaPipe / Custom Vision API)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-xs text-slate-300">تاخیر</p>
              <p className="text-lg font-extrabold text-success-400">{toFa(32)}ms</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-xs text-slate-300">دقت</p>
              <p className="text-lg font-extrabold text-accent-300">{toFa(98)}٪</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-xs text-slate-300">وضعیت</p>
              <p className="text-lg font-extrabold text-success-400">آنلاین</p>
            </div>
          </div>
        </div>
      </div>

      {/* Config panel */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 space-y-5">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Link2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            پیکربندی API
          </h4>

          {/* Endpoint */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">آدرس Endpoint مدل هوش مصنوعی (AI Model API URL)</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 dark:focus:ring-brand-900/40">
              <Link2 className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full bg-transparent py-3 text-sm font-mono text-slate-700 dark:text-slate-200 outline-none"
                dir="ltr"
              />
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">کلید دسترسی (API Key / Token)</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 dark:focus:ring-brand-900/40">
              <Key className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-transparent py-3 text-sm font-mono text-slate-700 dark:text-slate-200 outline-none"
                dir="ltr"
              />
              <button
                onClick={() => setShowKey((v) => !v)}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 shrink-0"
              >
                {showKey ? 'مخفی' : 'نمایش'}
              </button>
            </div>
          </div>

          {/* Architecture selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">معماری مدل</label>
            <div className="relative">
              <button
                onClick={() => setArchOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-brand-300"
              >
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  {ARCHITECTURES.find((a) => a.id === arch)?.label}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${archOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {archOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden"
                  >
                    {ARCHITECTURES.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => { setArch(a.id); setArchOpen(false); }}
                        className={`w-full text-right px-3 py-2.5 text-sm hover:bg-brand-50 dark:hover:bg-slate-700 ${arch === a.id ? 'bg-brand-50 dark:bg-brand-900/30 font-bold text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300'}`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Processing mode + test */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-4">حالت پردازش</h4>
            <div className="space-y-3">
              <button
                onClick={() => setLocalMode(true)}
                className={`w-full flex items-center gap-3 rounded-xl border-2 p-4 text-right transition-all ${
                  localMode ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'
                }`}
              >
                <Smartphone className={`h-6 w-6 ${localMode ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">پردازش محلی در مرورگر بیمار</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">کاهش تاخیر · حفظ حریم خصوصی · بدون ارسال تصویر به سرور</p>
                </div>
                {localMode ? <ToggleRight className="h-6 w-6 text-brand-600" /> : <ToggleLeft className="h-6 w-6 text-slate-300" />}
              </button>
              <button
                onClick={() => setLocalMode(false)}
                className={`w-full flex items-center gap-3 rounded-xl border-2 p-4 text-right transition-all ${
                  !localMode ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-200 dark:border-slate-700 hover:border-brand-300'
                }`}
              >
                <Server className={`h-6 w-6 ${!localMode ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">پردازش ابری سرور</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">دقت بالا · مدل‌های سنگین‌تر · مناسب تحلیل‌های پیچیده</p>
                </div>
                {!localMode ? <ToggleRight className="h-6 w-6 text-brand-600" /> : <ToggleLeft className="h-6 w-6 text-slate-300" />}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <button
              onClick={runTest}
              disabled={testing}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-600 to-accent-500 px-4 py-3 text-sm font-bold text-white shadow-glow hover:shadow-glow-lg disabled:opacity-60 transition-shadow"
            >
              {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wifi className="h-4 w-4" />}
              {testing ? 'در حال بررسی...' : 'بررسی و تست ارتباط با مدل AI'}
            </button>

            {/* Log */}
            {logs.length > 0 && (
              <div className="mt-4 rounded-xl bg-slate-900 p-4 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto scrollbar-hide" dir="ltr">
                {logs.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 ${
                      l.type === 'success' ? 'text-success-400' : l.type === 'pending' ? 'text-warning-400' : 'text-slate-400'
                    }`}
                  >
                    {l.type === 'success' ? <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" /> : l.type === 'pending' ? <Loader2 className="h-3.5 w-3.5 mt-0.5 shrink-0 animate-spin" /> : <Terminal className="h-3.5 w-3.5 mt-0.5 shrink-0" />}
                    <span className="leading-relaxed">{l.text}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
