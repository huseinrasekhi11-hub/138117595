import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Stethoscope, Cpu, Activity } from 'lucide-react';
import PatientTab from './simulator/PatientTab';
import PhysioTab from './simulator/PhysioTab';
import AITab from './simulator/AITab';

type TabId = 'patient' | 'physio' | 'ai';

const TABS: { id: TabId; label: string; icon: typeof User; sub: string }[] = [
  { id: 'patient', label: 'نمای بیمار', sub: 'شبیه‌ساز تمرین', icon: User },
  { id: 'physio', label: 'نمای فیزیوتراپ', sub: 'داشبورد نظارت', icon: Stethoscope },
  { id: 'ai', label: 'تنظیمات هوش مصنوعی', sub: 'AI Engine Settings', icon: Cpu },
];

export default function Simulator() {
  const [tab, setTab] = useState<TabId>('patient');

  return (
    <section id="simulator" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 px-3 py-1.5 text-xs font-bold text-brand-700 dark:text-brand-300">
            <Activity className="h-3.5 w-3.5" />
            دموی هوشمند و زنده
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            شبیه‌ساز تعاملی <span className="gradient-text">فیزیوآی</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            تجربه واقعی پلتفرم را از سه زاویه مختلف بررسی کنید: چشم‌انداز بیمار در حین تمرین، داشبورد فیزیوتراپ، و تنظیمات موتور هوش مصنوعی.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-right transition-all ${
                  active
                    ? 'border-brand-500 bg-white dark:bg-slate-800 shadow-lg shadow-brand-900/5 dark:shadow-black/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-brand-300'
                }`}
              >
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className={`text-sm font-extrabold ${active ? 'text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-200'}`}>{t.label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{t.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'patient' && <PatientTab />}
            {tab === 'physio' && <PhysioTab />}
            {tab === 'ai' && <AITab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
